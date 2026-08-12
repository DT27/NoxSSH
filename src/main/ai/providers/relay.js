const fetch = global.fetch || require('node-fetch');

/**
 * Relay provider (OpenAI-compatible 中转站 / HTTP relay).
 *
 * This lets the assistant work in restricted networks without any local
 * Claude Code / Codex / OpenCode install.
 *
 * Endpoint contract (OpenAI Chat Completions compatible):
 *   POST ${base}/chat/completions
 *   Authorization: Bearer ${apiKey}
 *   Body:
 *     {
 *       model: string,
 *       messages: [{role, content}],
 *       tools?: [...],                 // our remote tools (server-side)
 *       tool_choice?: "auto" | {...},
 *       stream: true,
 *       temperature?: number,
 *       max_tokens?: number
 *     }
 *
 * Streaming: SSE lines starting with "data: " containing JSON deltas.
 * We only care about:
 *   - delta.content (text)
 *   - delta.tool_calls (function calling)
 *   - usage / finish_reason on final chunk
 *
 * Tool calling:
 *   - We send the exact same tool catalog the other providers use.
 *   - When the relay returns tool_calls, we execute them locally (via the
 *     app's tool handlers + approval flow) and feed the results back in
 *     the next turn.
 *
 * Authentication:
 *   - The relay is responsible for talking to the real model provider.
 *   - We only store an API key for the relay itself (encrypted in our vault).
 */

const SERVER_NAME = 'remote';

let catalog = null;
function getCatalog() {
    if (!catalog) catalog = require('../tools');
    return catalog;
}

function toOpenAITools() {
    const c = getCatalog();
    // Convert our internal tool definitions to OpenAI function calling format.
    // We only need name + description + parameters (JSON Schema).
    return (c.TOOLS || []).map(t => ({
        type: 'function',
        function: {
            name: t.name,
            description: t.description || t.title || t.name,
            parameters: t.shape ? zodToJsonSchema(t.shape) : { type: 'object', properties: {} },
        },
    }));
}

// Very small zod -> JSON Schema converter for the shapes we actually use.
// Supports: z.string(), z.number(), z.boolean(), z.array(), .optional(), .describe()
function zodToJsonSchema(zodShape) {
    const props = {};
    const required = [];
    for (const [name, schema] of Object.entries(zodShape)) {
        const info = parseZod(schema);
        props[name] = info.schema;
        if (info.required) required.push(name);
    }
    return {
        type: 'object',
        properties: props,
        ...(required.length ? { required } : {}),
    };
}

function parseZod(s) {
    // s is a zod schema instance
    const desc = s?._def?.description || '';
    const t = s?._def?.typeName;

    if (t === 'ZodOptional') {
        const inner = parseZod(s._def.innerType);
        return { schema: { ...inner.schema, description: desc || inner.schema.description }, required: false };
    }
    if (t === 'ZodString') {
        return { schema: { type: 'string', description: desc }, required: true };
    }
    if (t === 'ZodNumber') {
        return { schema: { type: 'number', description: desc }, required: true };
    }
    if (t === 'ZodBoolean') {
        return { schema: { type: 'boolean', description: desc }, required: true };
    }
    if (t === 'ZodArray') {
        const item = parseZod(s._def.type);
        return { schema: { type: 'array', items: item.schema, description: desc }, required: true };
    }
    if (t === 'ZodObject') {
        // nested object (rare in our tools)
        return { schema: zodToJsonSchema(s.shape || {}), required: true };
    }
    // fallback
    return { schema: { type: 'string', description: desc }, required: true };
}

function getBase(settings) {
    return String(settings.relayBaseUrl || '').trim().replace(/\/+$/, '');
}

function modelEndpoints(base) {
    const urls = [];
    if (!base) return urls;
    urls.push(`${base}/models`);
    if (!/\/v1$/i.test(base)) urls.push(`${base}/v1/models`);
    return urls;
}

function extractModelIds(payload) {
    if (!payload) return [];
    const buckets = [];
    if (Array.isArray(payload)) buckets.push(payload);
    if (Array.isArray(payload.data)) buckets.push(payload.data);
    if (Array.isArray(payload.models)) buckets.push(payload.models);
    if (Array.isArray(payload.data?.data)) buckets.push(payload.data.data);
    if (Array.isArray(payload.data?.models)) buckets.push(payload.data.models);

    const ids = [];
    for (const list of buckets) {
        for (const item of list) {
            const id = typeof item === 'string'
                ? item
                : (item?.id || item?.name || item?.model || '');
            if (id && !ids.includes(id)) ids.push(String(id));
        }
    }
    return ids;
}

function describeRelayModels(ids) {
    return ids.map((id) => ({
        value: id,
        resolved: id,
        label: id,
        short: id,
        description: '',
        effort: [],
    }));
}

async function listModels({ settings }) {
    const base = getBase(settings);
    if (!base) return null;

    const key = settings.apiKey || '';
    const headers = {
        Accept: 'application/json',
        ...(key ? { Authorization: `Bearer ${key}` } : {}),
    };

    for (const url of modelEndpoints(base)) {
        try {
            const res = await fetch(url, { headers });
            if (!res.ok) continue;
            const data = await res.json();
            const ids = extractModelIds(data);
            if (ids.length) return describeRelayModels(ids);
        } catch {
            // try the next endpoint
        }
    }
    return null;
}

function buildMessages(systemPrompt, history, newText) {
    const msgs = [];
    if (systemPrompt) msgs.push({ role: 'system', content: systemPrompt });
    for (const e of history || []) {
        if (e.type === 'user-message') msgs.push({ role: 'user', content: e.text });
        if (e.type === 'assistant-text') msgs.push({ role: 'assistant', content: e.text });
        if (e.type === 'tool-result') {
            // Feed tool results in the official shape so good relays understand them.
            msgs.push({
                role: 'tool',
                tool_call_id: e.id,
                content: String(e.text || ''),
            });
        }
    }
    if (newText) msgs.push({ role: 'user', content: newText });
    return msgs;
}

async function start({
    settings,
    getSettings = () => settings,
    systemPrompt,
    toolContext,        // not used directly; we execute tools via the orchestrator
    requestApproval,    // not used directly; approval is driven by the orchestrator
    onEvent,
}) {
    const base = getBase(settings);
    if (!base) throw new Error('Relay base URL is not configured');

    const key = settings.apiKey || '';
    const model = settings.relayModel || settings.model || 'gpt-4o';

    const tools = toOpenAITools();

    // We keep a simple turn-based loop here because the relay is stateless per call.
    // The orchestrator (ai/index.js) will call send() multiple times and we will
    // feed tool results back as user messages.

    let abort = false;

    async function doTurn(messages, effort) {
        const body = {
            model,
            messages,
            stream: true,
            tools: tools.length ? tools : undefined,
            tool_choice: tools.length ? 'auto' : undefined,
            temperature: effort === 'low' ? 0.2 : effort === 'high' || effort === 'xhigh' || effort === 'max' ? 0.7 : 0.5,
        };

        const res = await fetch(`${base}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(key ? { Authorization: `Bearer ${key}` } : {}),
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const t = await res.text().catch(() => '');
            throw new Error(`Relay error ${res.status}: ${t || res.statusText}`);
        }

        let assistantText = '';
        const toolCalls = []; // { id, name, arguments: string }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed.startsWith('data:')) continue;
                const data = trimmed.slice(5).trim();
                if (data === '[DONE]') continue;

                let chunk;
                try { chunk = JSON.parse(data); } catch { continue; }

                const delta = chunk.choices?.[0]?.delta || {};
                if (delta.content) {
                    assistantText += delta.content;
                    onEvent({ type: 'text-delta', text: delta.content });
                }

                if (Array.isArray(delta.tool_calls)) {
                    for (const tc of delta.tool_calls) {
                        const idx = tc.index ?? 0;
                        if (!toolCalls[idx]) toolCalls[idx] = { id: '', name: '', arguments: '' };
                        if (tc.id) toolCalls[idx].id = tc.id;
                        if (tc.function?.name) toolCalls[idx].name = tc.function.name;
                        if (tc.function?.arguments) toolCalls[idx].arguments += tc.function.arguments;
                    }
                }

                const finish = chunk.choices?.[0]?.finish_reason;
                if (finish === 'tool_calls' || finish === 'stop' || finish === 'length') {
                    // we will handle below
                }
            }
            if (abort) break;
        }

        // Flush any remaining buffer (rare)
        if (buffer.trim().startsWith('data:')) {
            const data = buffer.trim().slice(5).trim();
            if (data && data !== '[DONE]') {
                try {
                    const chunk = JSON.parse(data);
                    const delta = chunk.choices?.[0]?.delta || {};
                    if (delta.content) {
                        assistantText += delta.content;
                        onEvent({ type: 'text-delta', text: delta.content });
                    }
                } catch {}
            }
        }

        if (assistantText.trim()) {
            onEvent({ type: 'assistant-text', text: assistantText });
        }

        // Emit tool calls so the orchestrator can execute them with approval
        for (const tc of toolCalls) {
            if (!tc.name) continue;
            let args = {};
            try { args = tc.arguments ? JSON.parse(tc.arguments) : {}; } catch {}
            onEvent({
                type: 'tool-call',
                id: tc.id || `relay_${Date.now()}`,
                name: tc.name,
                rawName: tc.name,
                local: false,
                input: args,
            });
        }

        // If the relay returned usage, surface a lightweight result so cost can be tracked if desired
        if (chunk && chunk.usage) {
            onEvent({
                type: 'result',
                subtype: 'success',
                text: '',
                costUsd: 0,
                usage: chunk.usage,
                turns: 1,
            });
        }

        return { assistantText, toolCalls };
    }

    // Public session object expected by ai/index.js
    return {
        async send(text) {
            // The orchestrator already emitted the user message.
            // We build the message list from what the orchestrator has been emitting.
            // However, the orchestrator does not give us the full history here.
            // Instead we ask it (via closure) to give us the current transcript? No.
            //
            // Design: the orchestrator calls send() with the user's text.
            // For relay we need the full history to do proper tool calling.
            // We therefore keep a tiny local transcript inside this provider
            // and the orchestrator will also feed tool results back via send()
            // with a special prefix (see handleProviderEvent + ensureProvider).
            //
            // Simpler approach that matches what the other providers do:
            // the orchestrator already maintains the event log. We can ask it
            // for the events via the onEvent stream we already receive.
            //
            // But we are inside the provider. The cleanest way is to let the
            // orchestrator drive the loop:
            //   - on first send(text), we do a turn with the messages we can build
            //     from the events the orchestrator has been emitting to us.
            //
            // Problem: the provider does not receive the full history on send().
            //
            // Solution used by Codex/OpenCode providers: they keep their own
            // conversation state. For relay we do the same.

            // We maintain a local message list in the closure of start().
            // The orchestrator will call send() for user text and for tool results
            // (by calling the provider's send with a synthetic message).
            //
            // To keep it simple and robust, we just do a single turn here and
            // let the orchestrator feed tool results back as the next send().

            // Build a minimal history from what we have seen so far in this provider instance.
            // The orchestrator already sent us the user message via emit before calling send().
            // We don't have direct access to the full log, so we keep our own small buffer.

            // For the very first implementation we accept that the relay sees
            // the last user message + any tool results we feed back. That is
            // exactly what the orchestrator does for Codex today.

            // We will keep a rolling message list in this closure.
            // On every send() we append the user turn and run one completion.

            // (Implementation continues below in the actual send function body
            // that we attach to the returned object.)
        },

        async setModel() { /* no-op for relay; model is chosen in settings or per message */ },
        async setEffort() { /* relay decides or we can pass temperature */ },

        async interrupt() {
            abort = true;
        },

        async close() {
            abort = true;
        },
    };

    // The actual implementation of send must be attached after we have the
    // rolling message buffer. We do it by returning an object that closes over
    // a small state machine.

    // Re-implement the return cleanly:

    // (We need to restructure a bit because we want a buffer. Let's rewrite the
    // return value after defining the buffer.)

    // To keep the diff small, we implement the buffer inside the returned object
    // using a separate function. See the code right after this comment.
}

// We need the rolling message buffer to survive multiple send() calls.
// The cleanest way is to build the session object after declaring the buffer.

async function startRelaySession({
    settings,
    systemPrompt,
    onEvent,
}) {
    const base = getBase(settings);
    if (!base) throw new Error('Relay base URL is not configured');
    const key = settings.apiKey || '';
    const model = settings.relayModel || settings.model || 'gpt-4o';
    const tools = toOpenAITools();

    const messages = [];
    if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });

    let aborted = false;

    async function runOnce(extraMessages) {
        const body = {
            model,
            messages: [...messages, ...extraMessages],
            stream: true,
            tools: tools.length ? tools : undefined,
            tool_choice: tools.length ? 'auto' : undefined,
        };

        const res = await fetch(`${base}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(key ? { Authorization: `Bearer ${key}` } : {}),
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const t = await res.text().catch(() => '');
            throw new Error(`Relay error ${res.status}: ${t || res.statusText}`);
        }

        let text = '';
        const pendingTools = []; // {id, name, arguments}

        const reader = res.body.getReader();
        const dec = new TextDecoder();
        let buf = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (aborted) break;
            buf += dec.decode(value, { stream: true });
            const lines = buf.split('\n');
            buf = lines.pop() || '';
            for (const line of lines) {
                const s = line.trim();
                if (!s.startsWith('data:')) continue;
                const d = s.slice(5).trim();
                if (!d || d === '[DONE]') continue;
                let c;
                try { c = JSON.parse(d); } catch { continue; }
                const delta = c.choices?.[0]?.delta || {};
                if (delta.content) {
                    text += delta.content;
                    onEvent({ type: 'text-delta', text: delta.content });
                }
                if (Array.isArray(delta.tool_calls)) {
                    for (const tc of delta.tool_calls) {
                        const i = tc.index ?? 0;
                        if (!pendingTools[i]) pendingTools[i] = { id: '', name: '', arguments: '' };
                        if (tc.id) pendingTools[i].id = tc.id;
                        if (tc.function?.name) pendingTools[i].name = tc.function.name;
                        if (tc.function?.arguments) pendingTools[i].arguments += tc.function.arguments;
                    }
                }
            }
        }

        if (text.trim()) onEvent({ type: 'assistant-text', text });

        for (const t of pendingTools) {
            if (!t.name) continue;
            let args = {};
            try { args = t.arguments ? JSON.parse(t.arguments) : {}; } catch {}
            onEvent({
                type: 'tool-call',
                id: t.id || `r_${Date.now()}`,
                name: t.name,
                rawName: t.name,
                local: false,
                input: args,
            });
        }

        // Append to rolling history for the next turn
        if (text.trim()) messages.push({ role: 'assistant', content: text });
        // Note: tool results will be appended by the caller via sendToolResult()

        const namedTools = pendingTools.filter(item => item.name);
        if (namedTools.length === 0) {
            onEvent({ type: 'result', subtype: 'success', text: '', costUsd: 0, turns: 1 });
        }

        return { text, toolCalls: pendingTools };
    }

    async function sendToolResult(toolCallId, resultText, isError) {
        // Feed the tool result back as a normal message.
        // Many relays accept either the official tool message or a user message.
        // We use the official shape when possible.
        messages.push({
            role: 'tool',
            tool_call_id: toolCallId,
            content: String(resultText || ''),
        });
    }

    return {
        async send(text) {
            messages.push({ role: 'user', content: text });
            try {
                await runOnce([]);
            } catch (error) {
                onEvent({ type: 'error', message: error.message });
            }
        },
        async sendToolResult(id, text, isError) {
            await sendToolResult(id, text, isError);
            try {
                await runOnce([]);
            } catch (error) {
                onEvent({ type: 'error', message: error.message });
            }
        },
        async setModel() {},
        async setEffort() {},
        async interrupt() { aborted = true; },
        async close() { aborted = true; },
    };
}

async function start(opts) {
    // opts.settings may contain relayBaseUrl + apiKey
    return startRelaySession(opts);
}

module.exports = {
    start,
    listModels,
    SERVER_NAME,
};

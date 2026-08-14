const engine = require('./openai-compatible');

/**
 * API Gateway provider (OpenAI-compatible HTTP endpoint).
 *
 * The assistant talks to a user-configured gateway instead of a local Claude /
 * Codex / OpenCode CLI. The tool loop is the same one local models and the
 * Grok API fallback use: run whatever tools come back, send the results,
 * repeat until the model stops asking.
 */

const LABEL = 'API Gateway';
const SERVER_NAME = 'remote';

function rawBase(settings) {
    return String(settings?.relayBaseUrl || '').trim().replace(/\/+$/, '');
}

/** Completions live under /v1; a URL that already ends with it is left alone. */
function chatBase(settings) {
    const base = rawBase(settings);
    if (!base) return '';
    return /\/v1$/i.test(base) ? base : `${base}/v1`;
}

function endpoint(current) {
    return {
        baseUrl: chatBase(current),
        apiKey: current.apiKey || '',
        label: LABEL,
    };
}

function resolveModel(current) {
    return current.relayModel || current.model || 'gpt-4o';
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

async function listModels({ settings } = {}) {
    const base = rawBase(settings);
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

async function start(options) {
    const current = options.settings || {};
    if (!rawBase(current)) throw new Error('API Gateway base URL is not configured');

    return engine.start({
        ...options,
        label: LABEL,
        prefix: 'relay',
        endpoint,
        model: resolveModel,
    });
}

module.exports = {
    start,
    listModels,
    SERVER_NAME,
    endpoint,
    resolveModel,
    LABEL,
};

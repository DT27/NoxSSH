<p align="center">
  <img src="cloudterm.png" alt="CloudTerm" width="128">
</p>

<h1 align="center">NoxSSH</h1>

<p align="center">
  <strong>SSH, SFTP, Telnet and Windows RDP, all in one terminal</strong>
</p>

<p align="center">
  A modern terminal workspace built with Electron, React and xterm.js.<br/>
  AI agent · Split panes · Tabs · File transfers · Port forwarding · Remote desktops · Snippets
</p>

<p align="center">
  <a href="https://github.com/DT27/NoxSSH/releases/latest"><img alt="Download" src="https://img.shields.io/badge/Download-Latest-success?style=for-the-badge&logo=github"></a>
  &nbsp;
  <a href="#"><img alt="Platform" src="https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue?style=for-the-badge&logo=electron"></a>
  &nbsp;
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/License-fair--code-green?style=for-the-badge"></a>
</p>

<p align="center">
  <strong>English</strong> ·
  <a href="./README.zh-CN.md">简体中文</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a>
</p>

---

NoxSSH is a fork of [CloudTerm](https://github.com/BradPerbs/cloudterm). It keeps
the same terminal, SFTP, RDP/VNC and assistant. The main change is how data is
synced.

## What changed

- **Your own WebDAV, not a CloudBlast account.** Hosts, folders, keys, snippets, proxies, known hosts, assistant settings and terminal settings are encrypted on this device, then uploaded to a WebDAV you choose. Any standard WebDAV works.
- **Versioned backups** stored on that WebDAV, on a schedule or by hand. Restore or delete one version without touching the live sync copy.
- **API Gateway.** The assistant can use an OpenAI-compatible API Gateway and does not need a local Claude, Codex or OpenCode CLI.
- **Import NextSSH backups**, next to PuTTY, KiTTY, MobaXterm and OpenSSH.
- **No telemetry.** The app does not contact `console.cloudblast.io` on launch. Updates are checked against [this repository](https://github.com/DT27/NoxSSH/releases) on GitHub.
  <img src="NoxSSH_WebDAV.png" alt="NoxSSH WebDAV sync" width="100%">
  <img src="NoxSSH_WebDAV_backup.png" alt="NoxSSH WebDAV backups" width="100%">
  <img src="NoxSSH_AI_APIRelay.png" alt="NoxSSH AI API Gateway" width="100%">

<img src="Main%20Image.png" alt="NoxSSH" width="100%">

---

## Contents

- [Download](#download)
- [What it is](#what-it-is)
- [Features](#features)
- [Screenshots](#screenshots)
- [Getting started](#getting-started)
- [Community](#community)
- [Contributors](#contributors)
- [Tech stack](#tech-stack)
- [License](#license)

---

<a name="what-it-is"></a>

## What it is

- **A terminal** for SSH, telnet and serial consoles, with tabs, split panes and

  GPU-accelerated rendering.

- **An SFTP client** on the connection you already have open, with recursive

  transfers and drag and drop.

- **An RDP and VNC viewer**, so a Windows box and a Linux box live side by side

  in the same app.

- **A place to keep servers**: folders, tags, a key vault and snippets, all

  encrypted and all searchable.

- **An AI agent** in a panel beside the terminal, which reads the session you

  are looking at and works on the server through it, asking before it changes
  anything.

<a name="features"></a>

## Features

### AI agent

Pick the agent you already have. NoxSSH drives the CLI on your machine under
your own account, so there is nothing to paste and nothing extra to subscribe
to. Or point it at a model running on your own computer, and nothing leaves the
machine at all. An API Gateway URL works too, if you would rather not install a CLI.

<table align="center">
  <tr>
    <td align="center" width="150"><img src="docs/logos/claude-code.svg" alt="Claude Code" title="Claude Code" height="32"></td>
    <td align="center" width="150"><img src="docs/logos/codex.svg" alt="Codex" title="Codex" height="32"></td>
    <td align="center" width="150"><img src="docs/logos/opencode.svg" alt="OpenCode" title="OpenCode" height="32"></td>
    <td align="center" width="150"><img src="docs/logos/grok.svg" alt="Grok Build" title="Grok Build" height="32"></td>
    <td align="center" width="150"><img src="docs/logos/local-model.svg" alt="Local model" title="Local model" height="32"></td>
  </tr>
  <tr>
    <td align="center"><b>Claude Code</b></td>
    <td align="center"><b>Codex</b></td>
    <td align="center"><b>OpenCode</b></td>
    <td align="center"><b>Grok Build</b></td>
    <td align="center"><b>Local model</b></td>
  </tr>
  <tr>
    <td align="center"><sub>Anthropic models</sub></td>
    <td align="center"><sub>OpenAI models</sub></td>
    <td align="center"><sub>Any provider you have set up</sub></td>
    <td align="center"><sub>xAI models</sub></td>
    <td align="center"><sub>Whatever you have loaded</sub></td>
  </tr>
  <tr>
    <td align="center"><sub>Sign in with <code>claude</code>, then <code>/login</code></sub></td>
    <td align="center"><sub>Sign in with the Codex app or CLI</sub></td>
    <td align="center"><sub>Sign in with <code>opencode auth login</code></sub></td>
    <td align="center"><sub>Sign in with <code>grok</code>, or paste an xAI key</sub></td>
    <td align="center"><sub>No account, no key, no internet</sub></td>
  </tr>
</table>

Whichever you choose, the agent:

- **Reads the session you are watching**, so the error on your screen is the

  one it answers, without you pasting anything

- **Works in the terminal you can see**: commands are typed into the pane and

  the output stays in your scrollback, or run on a hidden channel if you prefer

- **Asks before it changes anything**, with an allow list for the commands that

  only look, and a stricter or looser mode when you want one

- **Pointed where you like**: the session in front, one you pin, or every host

  you have saved

- **Tools instead of guesses**: connect a saved host, read and write files,

  answer a prompt that is already waiting, read the scrollback

- **Leaves your own machine alone** unless you say otherwise, and stops on its

  own rather than looping

- **Model and reasoning effort per conversation**, with what it is costing, or

  how much of your plan it has used, shown as it works

> Claude Code has to be the native install, the one that puts `claude` in
>
> be started the way the agent runs it.

> On Windows, install OpenCode natively with Chocolatey, Scoop, npm, or its
>
> NoxSSH desktop app.

### Terminal

- **Split panes** in any arrangement, with zoom and fullscreen
- **Tabs** you can name, colour and group, restored on the next launch
- **36 themes**, or pick the colours yourself
- **Find in scrollback** with regex, and clickable links
- **Broadcast input** to every session at once
- **Session recording** and one-click screenshots

### Connections

- **SSH, telnet and serial** in the same window
- **Jump hosts** for anything behind a bastion
- **SOCKS5, SOCKS4 and HTTP proxies**, saved once and used by any connection: terminals, SFTP, port forwards and remote desktops
- **Passwords, keys, SSH agent, certificates** and Windows Hello keys held in the TPM
- **2FA prompts** handled properly
- **Automatic reconnect** after a drop or a laptop waking up
- **Run on connect** commands, replayed every time

### Files and networking

- **Full SFTP manager**: recursive transfers, resume, conflict handling, drag and drop
- **Edit remote files** in your own editor, uploaded on every save
- **Port forwarding**: local, remote and dynamic SOCKS5, with live traffic counters
- **Remote desktops**: RDP and VNC in a pane, tunnelled through SSH

### Organisation

- **Folders and colour-coded tags** across the whole host list
- **Snippets** with prompted values, and packages that run a series of them
- **Instant search** over names, addresses and tags
- **Import** your existing `~/.ssh/config` in one step

### Operating systems

The OS is detected on connect, and the host card and the tab take its logo, so
you can tell a Debian box from a Fedora box at a glance instead of reading
hostnames.

<p align="center">
  <img src="src/renderer/assets/icons/128_debian.png" alt="Debian" title="Debian" width="42">
  <img src="src/renderer/assets/icons/128_ubuntu.png" alt="Ubuntu" title="Ubuntu" width="42">
  <img src="src/renderer/assets/icons/128_kubuntu.png" alt="Kubuntu" title="Kubuntu" width="42">
  <img src="src/renderer/assets/icons/128_lubuntu.png" alt="Lubuntu" title="Lubuntu" width="42">
  <img src="src/renderer/assets/icons/128_xubuntu.png" alt="Xubuntu" title="Xubuntu" width="42">
  <img src="src/renderer/assets/icons/128_mint.png" alt="Linux Mint" title="Linux Mint" width="42">
  <img src="src/renderer/assets/icons/128_pop.png" alt="Pop!_OS" title="Pop!_OS" width="42">
  <img src="src/renderer/assets/icons/128_elementary.png" alt="elementary OS" title="elementary OS" width="42">
  <img src="src/renderer/assets/icons/128_zorin.png" alt="Zorin OS" title="Zorin OS" width="42">
  <img src="src/renderer/assets/icons/128_mx.png" alt="MX Linux" title="MX Linux" width="42">
  <img src="src/renderer/assets/icons/128_deepin.png" alt="deepin" title="deepin" width="42">
  <img src="src/renderer/assets/icons/128_raspios.png" alt="Raspberry Pi OS" title="Raspberry Pi OS" width="42">
  <img src="src/renderer/assets/icons/128_kali.png" alt="Kali Linux" title="Kali Linux" width="42">
  <img src="src/renderer/assets/icons/128_parrot.png" alt="Parrot OS" title="Parrot OS" width="42">
  <img src="src/renderer/assets/icons/128_tails.png" alt="Tails" title="Tails" width="42">
  <br/>
  <img src="src/renderer/assets/icons/128_fedora_newlogo.png" alt="Fedora" title="Fedora" width="42">
  <img src="src/renderer/assets/icons/128_redhat.png" alt="Red Hat Enterprise Linux" title="Red Hat Enterprise Linux" width="42">
  <img src="src/renderer/assets/icons/128_centos_blue.png" alt="CentOS" title="CentOS" width="42">
  <img src="src/renderer/assets/icons/128_alma_darkblue.png" alt="AlmaLinux" title="AlmaLinux" width="42">
  <img src="src/renderer/assets/icons/128_suse.png" alt="openSUSE and SLES" title="openSUSE and SLES" width="42">
  <img src="src/renderer/assets/icons/128_arch.png" alt="Arch Linux" title="Arch Linux" width="42">
  <img src="src/renderer/assets/icons/128_manjaro.png" alt="Manjaro" title="Manjaro" width="42">
  <img src="src/renderer/assets/icons/128_endeavour.png" alt="EndeavourOS" title="EndeavourOS" width="42">
  <img src="src/renderer/assets/icons/128_garuda_blue.png" alt="Garuda Linux" title="Garuda Linux" width="42">
  <img src="src/renderer/assets/icons/128_arco.png" alt="ArcoLinux" title="ArcoLinux" width="42">
  <img src="src/renderer/assets/icons/128_artix.png" alt="Artix Linux" title="Artix Linux" width="42">
  <br/>
  <img src="src/renderer/assets/icons/128_alpine.png" alt="Alpine Linux" title="Alpine Linux" width="42">
  <img src="src/renderer/assets/icons/128_nixos.png" alt="NixOS" title="NixOS" width="42">
  <img src="src/renderer/assets/icons/128_gentoo.png" alt="Gentoo" title="Gentoo" width="42">
  <img src="src/renderer/assets/icons/128_void.png" alt="Void Linux" title="Void Linux" width="42">
  <img src="src/renderer/assets/icons/128_solus.png" alt="Solus" title="Solus" width="42">
  <img src="src/renderer/assets/icons/128_slackware.png" alt="Slackware" title="Slackware" width="42">
  <img src="src/renderer/assets/icons/128_linux.png" alt="Linux" title="Any other Linux" width="42">
  <img src="src/renderer/assets/icons/128_windows.png" alt="Windows" title="Windows" width="42">
  <img src="docs/logos/macos.svg" alt="macOS" title="macOS" width="42">
</p>

### Security

- **Encrypted vault** for every credential, behind an optional opening password
- **Host key verification** on every connection and every hop
- **WebDAV sync**, encrypted on your machine with a sync passphrase before it is uploaded; historical backups can be restored or deleted one by one
- **Encrypted backups** that move your whole setup to another machine
- **Activity log** of every connection made and every change

---

<a name="screenshots"></a>

## Screenshots

### Hosts and keychain

Every server in folders, with tags, search and the protocol on the card. Set up
WebDAV sync and the same hosts come back on another machine.

<img src="hostscloudterm.png" alt="Hosts and keychain" width="100%">

### Split panes and SFTP

Files on the left, two shells on the right, one connection behind all three.
Split as far as the window allows and drag the dividers where you want them.

<img src="Split%20Pane.png" alt="Split panes and SFTP" width="100%">

### Windows RDP

A full Windows desktop in a tab, next to your Linux sessions. Clipboard works
both ways and the desktop resizes to fit the pane.

<img src="RDP.png" alt="Windows RDP" width="100%">

### Make it yours

Terminal themes, app colours, fonts and even the logo in the title bar.

<img src="Customizeable.png" alt="Appearance settings" width="100%">

---

<a name="getting-started"></a>

## Getting started

<a name="download"></a>

### Download

Download the latest release for your platform:

| OS      | Download                                                                                                                                                                                                           |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| macOS   | [Apple silicon (M1 and later)](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-arm64.dmg) · [Intel](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-x64.dmg)                         |
| Windows | [Installer, x64 (recommended)](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-Setup-x64.exe) · [Portable, x64](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-x64.exe)             |
| Linux   | [AppImage, x64](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-x86_64.AppImage)                                                                                                                    |

Or browse [all GitHub releases](https://github.com/DT27/NoxSSH/releases).

### Build from source

```bash
git clone https://github.com/DT27/NoxSSH.git
cd NoxSSH/noxssh
npm install
npm run dev
```

To use the AI agent with OpenCode, install the `opencode` CLI and configure at
least one model provider with `opencode auth login`. NoxSSH uses OpenCode's
existing providers and credentials; it does not copy or store them.

To use a local model, start the server you already run and put its address in
Settings, Assistant. LM Studio listens on `http://localhost:1234/v1`, Ollama on
`http://localhost:11434/v1`, llama.cpp on `http://localhost:8080/v1`; anything
that speaks the OpenAI API works. Pick a model with tool support, since the
assistant works by calling tools rather than by writing text.

Build a portable executable into `dist/`:

```bash
npm run build
```

### Shortcuts

|                      |                    |                |                    |
| -------------------- | ------------------ | -------------- | ------------------ |
| `Ctrl+Shift+F`       | Find in scrollback | `Alt+Shift+=`  | Split right        |
| `Ctrl+Shift+K`       | Snippet palette    | `Alt+Shift+-`  | Split down         |
| `Ctrl+Shift+B`       | Broadcast input    | `Alt+Shift+Z`  | Zoom pane          |
| `Ctrl+Shift+C` / `V` | Copy and paste     | `Ctrl+Shift+W` | Close pane         |
| `Ctrl+Shift+A`       | AI agent           | `Alt+Arrows`   | Move between panes |

<a name="community"></a>

## Community

Questions, bugs, feature requests, or just want to see what is coming next?

<p>
  <a href="https://discord.gg/7M84Xp8QBr"><img alt="Join the Discord" src="https://img.shields.io/badge/Join%20the%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"></a>
</p>

Issues and pull requests are welcome here on GitHub.

<a name="contributors"></a>

## Contributors

Thanks to everyone who has put work into CloudTerm, and to those who have
continued it here.

<a href="https://github.com/BradPerbs/cloudterm/graphs/contributors">
  <img alt="Contributors" src="https://contrib.rocks/image?repo=BradPerbs/cloudterm" />
</a>

<a name="tech-stack"></a>

## Tech stack

Electron · React · xterm.js · ssh2 · IronRDP (WebAssembly) · noVNC · Tailwind ·
Vite · Claude Agent SDK · Codex SDK · OpenCode SDK

`src/main/` is the Electron main process, one module per feature.
`src/renderer/` is the React UI: `components/` by feature, `hooks/` for state,
`lib/` for pure functions.

<a name="license"></a>

## License

**NoxSSH** is a fork of [CloudTerm](https://github.com/BradPerbs/cloudterm).

This project is distributed under the original [CloudTerm License](LICENSE) (a fair-code license).

- The source is open to read.
- The software is free to use, modify, and share (including publishing forks), for personal or commercial work.
- Selling the software, including any part of it in a paid product/service, running it as a paid hosted service, or other commercial distribution **requires a separate commercial license** from CloudBlast.

You must keep the original license and copyright notice with any copy or substantial portion you distribute.

You may accurately state that this work is derived from CloudTerm.  
You may not call this project "CloudTerm" or present it as coming from CloudBlast.

Full text: [LICENSE](LICENSE) | https://faircode.io

Original project: https://github.com/BradPerbs/cloudterm by CloudBlast.

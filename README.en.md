<p align="center">
  <img src="appicon.png" alt="NoxSSH" width="128">
</p>

<h1 align="center">NoxSSH</h1>

<p align="center">
  <strong>A modern, secure, multi-protocol remote connection tool with WebDAV sync</strong>
</p>

<p align="center">
  SSH · SFTP · Telnet · Serial · RDP · VNC<br/>
  Split panes · File transfers · Port forwarding · Private WebDAV sync
</p>

<p align="center">
  <a href="https://github.com/DT27/NoxSSH/releases/latest"><img alt="Latest release" src="https://img.shields.io/github/v/release/DT27/NoxSSH?style=for-the-badge&label=Release&color=2ea44f"></a>
  &nbsp;
  <img alt="Platforms" src="https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue?style=for-the-badge&logo=electron">
  &nbsp;
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/License-fair--code-green?style=for-the-badge"></a>
</p>

<p align="center">
  <a href="./README.md">简体中文</a> ·
  <strong>English</strong> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a>
</p>

---

<img src="NoxSSH_Main.png" alt="NoxSSH main interface" width="100%">

NoxSSH is built for developers and operators who regularly manage servers,
network devices and remote desktops. It brings terminals, file management,
port forwarding and remote desktops into one desktop app, with WebDAV-based
configuration sync across devices.

## Highlights

- **Connect to every environment from one app:** manage SSH, SFTP, Telnet, serial, RDP and VNC sessions together.
- **Efficient terminal workspace:** tabs, flexible split panes, broadcast input, session recovery, search and recording.
- **WebDAV sync:** hosts, keys, snippets, proxies, known hosts and terminal settings are encrypted locally before upload.
- **Independent history:** create scheduled or manual versioned backups, then restore or delete one without changing the live snapshot.
- **Easy migration:** import data from OpenSSH, PuTTY, KiTTY, MobaXterm and NextSSH.
- **Minimal networking by default:** no telemetry, and automatic update checks are disabled until enabled; manual checks remain available.

NoxSSH is based on [CloudTerm](https://github.com/BradPerbs/cloudterm) and replaces its account-based cloud sync with WebDAV.

---

## Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Getting started](#getting-started)
- [Contributing](#community)
- [Tech stack](#tech-stack)
- [License](#license)

---

<a name="features"></a>

## Features

### Terminal

- **Flexible split panes** with horizontal/vertical splits, pane zoom and fullscreen
- **Tabs and groups** with custom names and colours, restored on the next launch
- **Light/dark terminal themes** with custom fonts and colours
- **Scrollback search and clickable links**, including regular expressions
- **Broadcast input** to multiple sessions at once
- **Session recording and screenshots** for troubleshooting and documentation

### Connections

- **SSH, Telnet and serial connections** in the same window
- **Jump hosts** for connecting through bastion hosts
- **SOCKS5, SOCKS4 and HTTP proxies**, reused by terminals, SFTP, port forwarding and remote desktops
- **Passwords, keys, SSH Agent, certificates** and TPM-backed Windows Hello keys
- **Interactive authentication and 2FA**
- **Automatic reconnect** after network interruptions or system resume
- **Run-on-connect commands** executed automatically after each successful connection

### Files and networking

- **Full SFTP manager**: recursive transfers, resume, conflict handling, drag and drop
- **Edit remote files** in your own editor, uploaded on every save
- **Port forwarding**: local, remote and dynamic SOCKS5, with live traffic counters
- **Remote desktops**: RDP and VNC in a pane, tunnelled through SSH

### Data and migration

- **Encrypted WebDAV sync:** data is encrypted locally with the sync passphrase before upload. **The sync passphrase is stored only on the device; if it is lost, remote data cannot be decrypted. The WebDAV password is used only for authentication.**
- **Historical backups** can be created, restored and deleted individually without overwriting the current sync snapshot
- **Local encrypted backups** export the full configuration for import on another device
- **Multiple import sources:** OpenSSH, PuTTY, KiTTY, MobaXterm and NextSSH

<a name="operating-systems"></a>

### Operating system detection

The operating system is detected after connecting and its icon and version are shown on the host card.

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
  <br/>
  <img src="src/renderer/assets/icons/128_deepin.png" alt="deepin" title="deepin" width="42">
  <img src="src/renderer/assets/icons/128_raspios.png" alt="Raspberry Pi OS" title="Raspberry Pi OS" width="42">
  <img src="src/renderer/assets/icons/128_kali.png" alt="Kali Linux" title="Kali Linux" width="42">
  <img src="src/renderer/assets/icons/128_parrot.png" alt="Parrot OS" title="Parrot OS" width="42">
  <img src="src/renderer/assets/icons/128_tails.png" alt="Tails" title="Tails" width="42">
  <img src="src/renderer/assets/icons/128_fedora_newlogo.png" alt="Fedora" title="Fedora" width="42">
  <img src="src/renderer/assets/icons/128_redhat.png" alt="Red Hat Enterprise Linux" title="Red Hat Enterprise Linux" width="42">
  <img src="src/renderer/assets/icons/128_centos_blue.png" alt="CentOS" title="CentOS" width="42">
  <img src="src/renderer/assets/icons/128_alma_darkblue.png" alt="AlmaLinux" title="AlmaLinux" width="42">
  <img src="src/renderer/assets/icons/128_suse.png" alt="openSUSE and SLES" title="openSUSE and SLES" width="42">
  <br/>
  <img src="src/renderer/assets/icons/128_arch.png" alt="Arch Linux" title="Arch Linux" width="42">
  <img src="src/renderer/assets/icons/128_manjaro.png" alt="Manjaro" title="Manjaro" width="42">
  <img src="src/renderer/assets/icons/128_endeavour.png" alt="EndeavourOS" title="EndeavourOS" width="42">
  <img src="src/renderer/assets/icons/128_garuda_blue.png" alt="Garuda Linux" title="Garuda Linux" width="42">
  <img src="src/renderer/assets/icons/128_arco.png" alt="ArcoLinux" title="ArcoLinux" width="42">
  <img src="src/renderer/assets/icons/128_artix.png" alt="Artix Linux" title="Artix Linux" width="42">
  <img src="src/renderer/assets/icons/128_alpine.png" alt="Alpine Linux" title="Alpine Linux" width="42">
  <img src="src/renderer/assets/icons/128_nixos.png" alt="NixOS" title="NixOS" width="42">
  <img src="src/renderer/assets/icons/128_gentoo.png" alt="Gentoo" title="Gentoo" width="42">
  <img src="src/renderer/assets/icons/128_void.png" alt="Void Linux" title="Void Linux" width="42">
  <br/>
  <img src="src/renderer/assets/icons/128_solus.png" alt="Solus" title="Solus" width="42">
  <img src="src/renderer/assets/icons/128_slackware.png" alt="Slackware" title="Slackware" width="42">
  <img src="src/renderer/assets/icons/128_unraid.png" alt="Unraid" title="Unraid" width="42">
  <img src="src/renderer/assets/icons/128_linux.png" alt="Linux" title="Any other Linux" width="42">
  <img src="src/renderer/assets/icons/128_windows.png" alt="Windows" title="Windows" width="42">
  <picture><source media="(prefers-color-scheme: dark)" srcset="docs/logos/macos-dark.svg"><img src="docs/logos/macos.svg" alt="macOS" title="macOS" width="42"></picture>
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

### WebDAV sync and history

<img src="NoxSSH_WebDAV.png" alt="NoxSSH WebDAV sync" width="100%">

<img src="NoxSSH_WebDAV_backup.png" alt="NoxSSH WebDAV history" width="100%">

### Split panes and SFTP

<img src="NoxSSH_SplitPane.png" alt="Split panes and SFTP" width="100%">

### Windows RDP

<img src="NoxSSH_RDP.png" alt="Windows RDP" width="100%">

### Appearance and terminal colours

<img src="NoxSSH_Customizeable.png" alt="Appearance settings" width="100%">

---

<a name="getting-started"></a>

## Getting started

<a name="download"></a>

### Download

Download the appropriate package from the [latest release](https://github.com/DT27/NoxSSH/releases/latest):

| OS | Architecture | File name |
| -- | ------------ | --------- |
| Windows | x64 | `NoxSSH-Setup-v<version>-x64.exe` (installer, recommended) or `NoxSSH-v<version>-x64.exe` (portable) |
| macOS | Apple silicon / Intel | `NoxSSH-v<version>-arm64.dmg` or `NoxSSH-v<version>-x64.dmg` |
| Linux | x64 | `NoxSSH-v<version>-x64.AppImage` |

Or browse [all GitHub releases](https://github.com/DT27/NoxSSH/releases).

### Build from source

Requires Node.js 20 or later and npm.

```bash
git clone https://github.com/DT27/NoxSSH.git
cd NoxSSH
npm install
npm run dev
```

Build a release package for the current platform into `dist/`:

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
| `Alt+Arrows`         | Move between panes |                |                    |

<a name="community"></a>

## Contributing

- Report bugs and feature requests in [Issues](https://github.com/DT27/NoxSSH/issues).
- Submit fixes and new features through [Pull Requests](https://github.com/DT27/NoxSSH/pulls).
- Run `npm test` and `npm run build:renderer` before submitting changes.

<a name="contributors"></a>

## Contributors

NoxSSH contributors:

<a href="https://github.com/DT27/NoxSSH/graphs/contributors">
  <img alt="NoxSSH contributors" src="https://contrib.rocks/image?repo=DT27/NoxSSH" />
</a>

Thanks also to the original CloudTerm contributors.

<a name="tech-stack"></a>

## Tech stack

Electron · React · xterm.js · ssh2 · IronRDP (WebAssembly) · noVNC · Tailwind ·
Vite

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

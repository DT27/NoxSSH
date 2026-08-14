<p align="center">
  <img src="cloudterm.png" alt="CloudTerm" width="128">
</p>

<h1 align="center">NoxSSH</h1>

<p align="center">
  <strong>SSH、SFTP、Telnet 与 Windows RDP，全部集于一个终端</strong>
</p>

<p align="center">
  基于 Electron、React 和 xterm.js 打造的现代终端工作区。<br/>
  AI 助手 · 分屏 · 标签页 · 文件传输 · 端口转发 · 远程桌面 · 命令片段
</p>

<p align="center">
  <a href="https://github.com/DT27/NoxSSH/releases/latest"><img alt="Download" src="https://img.shields.io/badge/Download-Latest-success?style=for-the-badge&logo=github"></a>
  &nbsp;
  <a href="#"><img alt="Platform" src="https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue?style=for-the-badge&logo=electron"></a>
  &nbsp;
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/License-fair--code-green?style=for-the-badge"></a>
</p>

<p align="center">
  <a href="./README.md">English</a> ·
  <strong>简体中文</strong> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a>
</p>

---

NoxSSH 是 [CloudTerm](https://github.com/BradPerbs/cloudterm) 的 fork。终端、SFTP、
RDP/VNC 和助手都还在，主要更改了数据同步方式。

## 详细变化

- **用你自己的 WebDAV，而不是 CloudBlast 账户。** 主机、文件夹、密钥、代码片段、代理、已知主机、助手设置和终端设置数据先在本机加密，再上传到你指定的 WebDAV。任何标准 WebDAV 都可以。
- **带版本的历史备份**，保存到 WebDAV 上，可按计划定期或手动备份。恢复或删除某一个版本，不影响当前同步数据。
- **API中转站**，AI 助手可以使用 API中转站，不依赖本机安装 Claude、Codex 或 OpenCode CLI。
- **导入 NextSSH 备份**，与 PuTTY、KiTTY、MobaXterm、OpenSSH 并列。
- **无遥测连网** 启动时不会访问 `console.cloudblast.io`。更新检查指向 GitHub 上的 [本仓库](https://github.com/DT27/NoxSSH/releases)。
  <img src="NoxSSH_WebDAV.png" alt="NoxSSH" width="100%">
  <img src="NoxSSH_WebDAV_backup.png" alt="NoxSSH" width="100%">
  <img src="NoxSSH_AI_APIRelay.png" alt="NoxSSH" width="100%">

<img src="Main%20Image.png" alt="NoxSSH" width="100%">

---

## 目录

- [下载](#download)
- [它是什么](#what-it-is)
- [功能](#features)
- [界面截图](#screenshots)
- [快速开始](#getting-started)
- [社区](#community)
- [贡献者](#contributors)
- [技术栈](#tech-stack)
- [许可证](#license)

---

<a name="what-it-is"></a>

## 它是什么

- **一个终端**：SSH、telnet 和串口控制台，带标签页、分屏和 GPU 加速渲染。
- **一个 SFTP 客户端**：复用已经打开的连接，支持递归传输和拖放。
- **一个 RDP 和 VNC 客户端**：Windows 主机和 Linux 主机并排放在同一个程序里。
- **一个存放服务器的地方**：文件夹、标签、密钥库和命令片段，全部加密、全部可搜索。

<a name="features"></a>

## 功能

### AI 助手

<p align="center">
  <img src="docs/logos/claude-code.svg" alt="Claude Code" title="Claude Code" height="34">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="docs/logos/codex.svg" alt="Codex" title="Codex" height="34">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="docs/logos/opencode.svg" alt="OpenCode" title="OpenCode" height="34">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="docs/logos/grok.svg" alt="Grok Build" title="Grok Build" height="34">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="docs/logos/local-model.svg" alt="本地模型" title="本地模型" height="34">
  <br/>
  <sub><b>Claude Code</b> &nbsp;·&nbsp; <b>Codex</b> &nbsp;·&nbsp; <b>OpenCode</b>
  &nbsp;·&nbsp; <b>Grok Build</b> &nbsp;·&nbsp; <b>本地模型</b></sub>
</p>

- **使用本机已有的 Claude Code、Codex、OpenCode 或 Grok Build**，沿用你自己的账号和配置
- **也可以用本地模型**：LM Studio、Ollama、llama.cpp、vLLM 等，无需账号和密钥，任何内容都不会离开这台电脑
- **读取当前会话并操作远程服务器**，执行更改前会先征求你的同意
- **每个对话可单独选择模型和推理强度**，并在运行时显示用量

### 终端

- **任意分屏**，可放大单个面板，也可全屏
- **标签页**可命名、上色、分组，下次启动自动恢复
- **36 款主题**，也可以自己配色
- **回滚区搜索**支持正则，链接可直接点击
- **广播输入**，一次输入发往所有会话
- **会话录制**和一键截图

### 连接

- **SSH、telnet 和串口**同处一个窗口
- **跳板机**，穿过堡垒机连到内网
- **密码、密钥、SSH agent、证书**，以及保存在 TPM 里的 Windows Hello 密钥
- **两步验证**提示能正确处理
- **自动重连**，掉线或笔记本唤醒后都会重新连上
- **连接时执行**的命令，每次连上都会重放

### 文件与网络

- **完整的 SFTP 管理器**：递归传输、断点续传、冲突处理、拖放
- **用本地编辑器改远程文件**，每次保存自动上传
- **端口转发**：本地、远程和动态 SOCKS5，带实时流量统计
- **远程桌面**：RDP 和 VNC 直接开在面板里，经 SSH 隧道传输

### 整理

- **文件夹和彩色标签**，贯穿整个主机列表
- **命令片段**支持参数提示，还能打包成一串按顺序执行
- **即时搜索**名称、地址和标签
- **一步导入**现有的 `~/.ssh/config`

### 操作系统

连接时会自动识别系统，主机卡片和标签页会显示对应的标志，一眼就能分辨
Debian 和 Fedora 的机器，不用去读主机名。

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

### 安全

- **加密保险库**存放所有凭据，可选设置启动密码
- **主机密钥校验**，每次连接、每一跳都验证
- **WebDAV 同步**，上传前先在本机用同步口令加密；历史备份可单独恢复或删除
- **加密备份**，把整套配置搬到另一台机器
- **活动日志**记录每一次连接和每一次改动

---

<a name="screenshots"></a>

## 界面截图

### 主机与密钥库

所有服务器按文件夹整理，带标签、搜索，卡片上直接标明协议。配置 WebDAV 同步后，
换一台电脑也能拉回同一套主机。

<img src="hostscloudterm.png" alt="主机与密钥库" width="100%">

### 分屏与 SFTP

左边是文件，右边是两个 shell，背后只有一条连接。窗口能放下多少就能分多少，
分隔条随手拖动。

<img src="Split%20Pane.png" alt="分屏与 SFTP" width="100%">

### Windows 远程桌面

完整的 Windows 桌面就开在标签页里，和 Linux 会话并排。剪贴板双向同步，
桌面分辨率会跟着面板变化。

<img src="RDP.png" alt="Windows 远程桌面" width="100%">

### 打造成你喜欢的样子

终端主题、界面配色、字体，连标题栏上的图标都能换。

<img src="Customizeable.png" alt="外观设置" width="100%">

---

<a name="getting-started"></a>

## 快速开始

<a name="download"></a>

### 下载

下载适用于你平台的最新版本：

| 操作系统 | 下载                                                                                                                                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| macOS    | [Apple 芯片（M1 及更新机型）](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-arm64.dmg) · [Intel](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-x64.dmg)   |
| Windows  | [安装版，x64（推荐）](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-Setup-x64.exe) · [便携版，x64](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-x64.exe) |
| Linux    | [AppImage，x64](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-x86_64.AppImage)                                                                                             |

也可以浏览 [GitHub 上的全部版本](https://github.com/DT27/NoxSSH/releases)。

### 从源码构建

```bash
git clone https://github.com/DT27/NoxSSH.git
cd NoxSSH/noxssh
npm install
npm run dev
```

要通过 OpenCode 使用 AI 助手，请安装 `opencode` CLI，并运行
`opencode auth login` 配置至少一个模型提供商。NoxSSH 只使用 OpenCode
现有的提供商和凭据，不会复制或保存它们。

构建便携版可执行文件，输出到 `dist/`：

```bash
npm run build
```

### 快捷键

|                      |            |                |          |
| -------------------- | ---------- | -------------- | -------- |
| `Ctrl+Shift+F`       | 回滚区搜索 | `Alt+Shift+=`  | 向右分屏 |
| `Ctrl+Shift+K`       | 片段面板   | `Alt+Shift+-`  | 向下分屏 |
| `Ctrl+Shift+B`       | 广播输入   | `Alt+Shift+Z`  | 放大面板 |
| `Ctrl+Shift+C` / `V` | 复制与粘贴 | `Ctrl+Shift+W` | 关闭面板 |

<a name="community"></a>

## 社区

有疑问、发现 bug、想提需求，或者只是想看看接下来会做什么？

<p>
  <a href="https://discord.gg/7M84Xp8QBr"><img alt="Join the Discord" src="https://img.shields.io/badge/Join%20the%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"></a>
</p>

也欢迎在 GitHub 上提交 issue 和 pull request。

<a name="contributors"></a>

## 贡献者

感谢每一位为 CloudTerm 付出努力的人，以及在此继续维护的人。

<a href="https://github.com/BradPerbs/cloudterm/graphs/contributors">
  <img alt="贡献者" src="https://contrib.rocks/image?repo=BradPerbs/cloudterm" />
</a>

<a name="tech-stack"></a>

## 技术栈

Electron · React · xterm.js · ssh2 · IronRDP（WebAssembly）· noVNC · Tailwind ·
Vite · Claude Agent SDK · Codex SDK · OpenCode SDK

`src/main/` 是 Electron 主进程，每个功能一个模块。
`src/renderer/` 是 React 界面：`components/` 按功能划分，`hooks/` 管状态，
`lib/` 放纯函数。

<a name="license"></a>

## 许可证

**NoxSSH** 是 [CloudTerm](https://github.com/BradPerbs/cloudterm) 的 fork。

本项目遵循原 [CloudTerm 许可证](LICENSE)（fair-code 模式）分发。

- 源码公开可读。
- 软件可免费使用、修改和分享（包括发布 fork），个人或公司内部使用均可。
- 出售本软件、将任何部分代码用于收费的产品或服务、作为付费托管服务运行，或进行其他商业分发，**需要向 CloudBlast 单独取得商业许可**。

分发任何副本或实质性部分时，必须保留原许可证和版权声明。

你可以准确地说明本作品衍生自 CloudTerm。  
你不得将本项目称为“CloudTerm”，也不得声称它来自 CloudBlast。

完整条款： [LICENSE](LICENSE) | https://faircode.io

原项目：https://github.com/BradPerbs/cloudterm （由 CloudBlast 开发）

<p align="center">
  <img src="appicon.png" alt="NoxSSH" width="128">
</p>

<h1 align="center">NoxSSH</h1>

<p align="center">
  <strong>现代、安全、支持私有 WebDAV 同步的多协议远程连接工具</strong>
</p>

<p align="center">
  SSH · SFTP · Telnet · 串口 · RDP · VNC<br/>
  分屏终端 · 文件传输 · 端口转发 · 私有 WebDAV 同步
</p>

<p align="center">
  <a href="https://github.com/DT27/NoxSSH/releases/latest"><img alt="下载最新版" src="https://img.shields.io/github/v/release/DT27/NoxSSH?style=for-the-badge&label=Release&color=2ea44f"></a>
  &nbsp;
  <img alt="支持平台" src="https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue?style=for-the-badge&logo=electron">
  &nbsp;
  <a href="LICENSE"><img alt="许可证" src="https://img.shields.io/badge/License-fair--code-green?style=for-the-badge"></a>
</p>

<p align="center">
  <strong>简体中文</strong> ·
  <a href="./README.en.md">English</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a>
</p>

---

<img src="NoxSSH_Main.png" alt="NoxSSH 主界面" width="100%">

NoxSSH 面向需要频繁管理服务器、网络设备和远程桌面的开发者与运维人员。
它将终端、文件管理、端口转发和远程桌面集中在一个桌面应用中，并支持通过 WebDAV 在设备间同步配置。

## 项目亮点

- **一个应用连接多种环境**：统一管理 SSH、SFTP、Telnet、串口、RDP 和 VNC。
- **高效终端工作区**：支持标签页、任意分屏、广播输入、会话恢复、搜索和录制。
- **WebDAV 同步**：主机、密钥、代码片段、代理、已知主机和终端设置在本机加密后上传到 WebDAV。
- **独立历史备份**：可定时或手动创建版本化备份，单独恢复或删除，不影响当前同步快照。
- **数据迁移**：支持导入 OpenSSH、PuTTY、KiTTY、MobaXterm 和 NextSSH 数据。
- **隐私优先**：不包含遥测，自动更新检查默认关闭；手动检查更新始终可用。

NoxSSH 基于 [CloudTerm](https://github.com/BradPerbs/cloudterm) 开发，并将原有账户云同步替换为 WebDAV 同步。

---

## 目录

- [功能](#features)
- [界面截图](#screenshots)
- [快速开始](#getting-started)
- [参与项目](#community)
- [技术栈](#tech-stack)
- [许可证](#license)

---

<a name="features"></a>

## 功能

### 终端

- **任意分屏**，可放大单个面板，也可全屏
- **标签页**，可命名、上色、分组，下次启动自动恢复
- **主题自定义**，提供日夜模式及多款配色
- **回滚区搜索**，支持正则，链接可直接点击
- **广播输入**，一次输入发往所有会话
- **会话录制**和一键截图

### 连接

- **SSH、Telnet 和串口**同处一个窗口
- **跳板机**，穿过堡垒机连到内网
- **SOCKS5、SOCKS4 和 HTTP 代理**可复用于终端、SFTP、端口转发和远程桌面
- **密码、密钥、SSH Agent、证书**，以及保存在 TPM 里的 Windows Hello 密钥
- **两步验证**提示能正确处理
- **自动重连**，掉线或笔记本唤醒后都会重新连上
- **连接后执行**的命令，每次连接特定主机后都会自动执行

### 文件与网络

- **完整的 SFTP 管理器**：递归传输、断点续传、冲突处理、拖放
- **本地编辑器**：使用本地编辑器修改远程文件，每次保存后自动上传
- **端口转发**：本地、远程和动态 SOCKS5，带实时流量统计
- **远程桌面**：RDP 和 VNC 直接开在面板里，经 SSH 隧道传输

### 数据与迁移

- **WebDAV 加密同步**，数据使用同步口令在本机加密后再上传，**同步口令仅保存在设备端，丢失后无法解密远端数据；WebDAV 密码仅用于连接认证**。
- **历史备份**支持创建、恢复和单独删除，不覆盖当前同步快照
- **本地加密备份**可导出整套配置，并在另一台设备导入
- **多来源导入**支持 OpenSSH、PuTTY、KiTTY、MobaXterm 和 NextSSH

<a name="operating-systems"></a>

### 操作系统识别

连接时会自动识别系统，主机卡片和标签页会显示对应系统图标。

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

### 安全

- **加密存储**存放所有凭据，可选设置启动密码
- **主机密钥校验**，每次连接、每一跳都验证
- **WebDAV 同步**，上传前先在本机用同步口令加密；历史备份可单独恢复或删除
- **加密备份**，把整套配置搬到另一台机器
- **活动日志**记录每一次连接和每一次改动

---

<a name="screenshots"></a>

## 界面截图

### WebDAV 同步与备份

<img src="NoxSSH_WebDAV.png" alt="WebDAV 同步设置" width="100%">

<img src="NoxSSH_WebDAV_backup.png" alt="WebDAV 历史备份" width="100%">

### 分屏与 SFTP

<img src="NoxSSH_SplitPane.png" alt="分屏与 SFTP" width="100%">

### Windows 远程桌面

<img src="NoxSSH_RDP.png" alt="Windows 远程桌面" width="100%">

### 主题配色

<img src="NoxSSH_Customizeable.png" alt="外观设置" width="100%">



---

<a name="getting-started"></a>

## 快速开始

<a name="download"></a>

### 下载

前往 [最新版本页面](https://github.com/DT27/NoxSSH/releases/latest) 下载对应平台的安装包：

| 操作系统 | 架构 | 文件名 |
| -------- | ---- | ------ |
| Windows | x64 | `NoxSSH-Setup-v<版本>-x64.exe`（安装版，推荐）或 `NoxSSH-v<版本>-x64.exe`（便携版） |
| macOS | Apple 芯片 / Intel | `NoxSSH-v<版本>-arm64.dmg` 或 `NoxSSH-v<版本>-x64.dmg` |
| Linux | x64 | `NoxSSH-v<版本>-x64.AppImage` |

也可以浏览 [GitHub 上的全部版本](https://github.com/DT27/NoxSSH/releases)。

### 从源码构建

需要 Node.js 20 或更高版本及 npm。

```bash
git clone https://github.com/DT27/NoxSSH.git
cd NoxSSH
npm install
npm run dev
```

构建当前平台的发布包，输出到 `dist/`：

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
| `Alt+方向键`         | 切换面板   |                |          |

<a name="community"></a>

## 参与项目

- 遇到问题或希望增加功能，请提交 [Issue](https://github.com/DT27/NoxSSH/issues)。
- 修复问题或实现新功能，欢迎提交 [Pull Request](https://github.com/DT27/NoxSSH/pulls)。
- 提交代码前请先运行 `npm test` 和 `npm run build:renderer`。

<a name="contributors"></a>

## 贡献者

感谢所有参与 NoxSSH 维护与改进的贡献者：

<a href="https://github.com/DT27/NoxSSH/graphs/contributors">
  <img alt="NoxSSH 贡献者" src="https://contrib.rocks/image?repo=DT27/NoxSSH" />
</a>

同时感谢 CloudTerm 原项目的所有贡献者。

<a name="tech-stack"></a>

## 技术栈

Electron · React · xterm.js · ssh2 · IronRDP（WebAssembly）· noVNC · Tailwind ·
Vite

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

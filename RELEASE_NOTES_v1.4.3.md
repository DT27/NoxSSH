# NoxSSH v1.4.3 发布说明

## 🎉 新增功能

### 本地终端

现在可以在 NoxSSH 里直接打开这台电脑自己的 Shell，不必为了跑一条本地命令切到别的终端窗口。

**入口：**

- 主机页右上角的终端图标，一键打开
- 新建标签页（`+`）右上角的「本地终端」

**能力：**

- ✅ **与远程会话同一套界面**：标签、分屏、搜索、复制粘贴、代码片段、截图、会话录制都能用
- 🧭 **自动恢复**：重启后本地终端按原布局重建（内容为新 Shell）
- 🔒 **独立链路**：本地会话不经过 SSH 拨号、认证与主机密钥校验，互不影响

```text
➜  ~ echo hello
hello
```

### 默认 Shell 设置

设置 → 终端 → **默认 Shell**：

- 留空即跟随系统（输入框占位符会显示本机实际会启动的 Shell）
- 也可以指定完整路径或命令名，例如 `/opt/homebrew/bin/fish`、`fish`、`pwsh`、`wsl.exe`
- 只对之后新打开的本地终端生效；写错时终端会明确提示 `Shell not found: …`，不会悄悄换成别的 Shell

该设置仅保存在本机，不随 WebDAV 同步到其他设备；从其他设备拉取设置时也不会覆盖它。

## 🎨 界面改进

- 🔧 主机页工具栏新增本地终端入口，不必先新建标签页
- ⚠️ 连接失败不再一直显示「正在连接」：现在会直接显示「无法连接」、具体原因和「再试一次」
- 📝 本地会话纳入「记录所有会话」，并可在设置中单独开关
- 🗑️ 从历史备份恢复时，备份中已移除的主机会从列表消失，不会再被旧备份复活

## 💻 平台说明

| 平台 | 实现 | 默认 Shell |
| --- | --- | --- |
| macOS | node-pty 预编译，系统 PTY | `/bin/zsh`（跟随 `$SHELL`） |
| Linux | 安装时编译 node-pty | `/bin/bash`（跟随 `$SHELL`） |
| Windows | ConPTY（需 Windows 10 1809+） | PowerShell，其次 `COMSPEC` |

## 🌍 国际化

新增本地终端相关词条，支持以下语言：

- 简体中文 (zh)
- English (en)
- 日本語 (ja)
- 한국어 (ko)
- Português (pt)
- Русский (ru)
- Tiếng Việt (vi)

## 📋 技术细节

- 新增 `src/main/local-shell.js`：基于 `node-pty` 创建伪终端，登录 shell 启动以恢复 PATH
- 新增 `src/renderer/lib/local-shell.js`；布局序列化支持本地窗格
- 新增 IPC 通道 `local-shell-default`，`ssh-connect` 透传 `shell`
- 新增 `src/renderer/lib/settings-snapshot.js`：默认 Shell 不进入云快照
- 打包：`node-pty` 加入 `asarUnpack`，构建前修正 `spawn-helper` 执行位

## 📥 下载

| 平台        | 下载链接                                                                                                                                                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Windows** | [安装版 x64](https://github.com/DT27/NoxSSH/releases/download/v1.4.3/NoxSSH-Setup-v1.4.3-x64.exe) · [便携版 x64](https://github.com/DT27/NoxSSH/releases/download/v1.4.3/NoxSSH-v1.4.3-x64.exe)                                                               |
| **macOS**   | [Apple 芯片 (M1+)](https://github.com/DT27/NoxSSH/releases/download/v1.4.3/NoxSSH-v1.4.3-arm64.dmg) · [Intel](https://github.com/DT27/NoxSSH/releases/download/v1.4.3/NoxSSH-v1.4.3-x64.dmg)                                                               |
| **Linux**   | [AppImage x64](https://github.com/DT27/NoxSSH/releases/download/v1.4.3/NoxSSH-v1.4.3-x64.AppImage)                                                                                                                                                           |

## 🔄 从旧版本升级

直接安装新版本即可，所有设置、主机和 WebDAV 配置都会保留。

默认 Shell 是新设置项，升级后默认为空 —— 也就是继续跟随系统，行为与升级前一致。

## 🙏 致谢

感谢所有为 NoxSSH 做出贡献的开发者和用户！

---

**完整更新日志**: [CHANGELOG.md](https://github.com/DT27/NoxSSH/blob/main/CHANGELOG.md)

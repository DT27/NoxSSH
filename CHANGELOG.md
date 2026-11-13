# 更新日志

## [1.4.3] - 2026-11-13

### 新增

- **本地终端**：在主机页工具栏或新建标签页中直接打开本机 Shell，与远程会话共用标签、分屏、搜索、复制粘贴、片段、会话录制等能力
- **默认 Shell 设置**：设置 → 终端新增「默认 Shell」，留空跟随系统，也可填完整路径或命令名（如 `fish`、`pwsh`、`wsl.exe`）
- 本地终端随布局恢复：重启后在原位置重建为新的本地 Shell

### 改进

- 连接失败不再停在「正在连接」：主进程拒绝连接（如保险库无法解密、处理器抛错）时会显示「无法连接」与具体原因，并可重试
- 主机页工具栏新增终端入口，无需先新建标签页
- 本地会话纳入「记录所有会话」，并可在设置中单独开关
- 从历史备份恢复时，备份中已移除的主机会一并从列表消失（墓碑删除同样生效）

### 技术细节

- 新增 [`local-shell.js`](src/main/local-shell.js)：基于 `node-pty` 创建伪终端，`$SHELL` 优先，macOS 回退 `/bin/zsh`、Linux 回退 `/bin/bash`、Windows 使用 PowerShell 或 `COMSPEC`
- 本地会话经 `transport.js` 的 `local` 后端分发，不经过 SSH 拨号、认证与主机密钥流程
- 新增 `local-shell-default` IPC 通道，`ssh-connect` 透传 `shell` 参数；新增 [`local-shell.js`](src/renderer/lib/local-shell.js) 与布局序列化支持
- 新增 [`settings-snapshot.js`](src/renderer/lib/settings-snapshot.js)：默认 Shell 不进入 WebDAV 快照，拉取时保留本机值
- 打包：`node-pty` 加入依赖与 `asarUnpack`，`before-build.js` 修正 `spawn-helper` 执行位
- 新增词条：`newTab.localTerminal`、`local.title`、`protocol.local`、`settings.terminal.localShell*`（zh / en / ja / ko / pt / ru / vi）

---

## [1.4.2] - 2026-08-21

### 新增

- **自动更新检查改为可选**：默认禁用自动更新检查（opt-in 模式），避免无意中的网络请求
- 在"关于"页面新增"自动检查更新"切换开关，用户可自主选择是否启用自动检查
- 新增国际化词条：`settings.about.autoCheck*` 系列（支持 zh / en / ja / ko / pt / ru / vi）

### 改进

- 更新检查行为优化：
  - 默认启动时不再自动检查更新
  - 用户开启自动检查后，首次在启动 30 秒后检查，之后每 24 小时轮询一次
  - 用户关闭自动检查后，停止定时器，不再请求 GitHub releases
  - 手动点击"检查更新"按钮不受此开关影响，始终可用
- "关于"页面界面改进：使用应用图标替换原有的终端图标，增加 GitHub 仓库链接

### 技术细节

- 新增 `autoCheck` 配置字段到 [`updates.js`](src/main/updates.js)，默认值为 `false`
- 新增 IPC 通道 `update-set-auto-check` 用于启用/禁用自动检查
- 更新 [`AboutPage.jsx`](src/renderer/components/settings/pages/AboutPage.jsx) 增加自动检查开关 UI
- 更新 [`useUpdate.js`](src/renderer/hooks/useUpdate.js) 钩子，支持 `setAutoCheck` 方法

---

## [1.4.1] - 之前版本

### 功能

- WebDAV 同步支持
- NextSSH 主机导入
- 主机连接界面本地化
- 中国网络 Electron 二进制镜像支持

更多历史版本信息请查看 [GitHub Releases](https://github.com/DT27/NoxSSH/releases)

# 更新日志

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

# NoxSSH v1.4.2 发布说明

## 🎉 新增功能

### 自动更新检查改为可选（默认禁用）

为了给用户更多控制权，避免无意中的网络请求，我们将自动更新检查改为 **opt-in 模式**（默认禁用）。

**主要特性：**

- ✅ **默认禁用**：首次启动或升级后，默认不会自动检查更新
- ⚙️ **用户控制**：在"设置 → 关于"页面新增"自动检查更新"开关，用户可自主选择是否启用
- 🔄 **智能检查**：启用后，首次在启动 30 秒后检查，之后每 24 小时轮询一次
- 🛑 **即时生效**：关闭开关后立即停止定时器，不再请求 GitHub releases
- 🖱️ **手动不受影响**：手动点击"检查更新"按钮始终可用，不受开关影响

## 🎨 界面改进

- 🖼️ "关于"页面使用应用图标替换原有的终端图标
- 🔗 新增 GitHub 仓库链接，方便用户访问项目主页

## 🌍 国际化

新增自动更新相关词条，支持以下语言：

- 简体中文 (zh)
- English (en)
- 日本語 (ja)
- 한국어 (ko)
- Português (pt)
- Русский (ru)
- Tiếng Việt (vi)

## 📋 技术细节

- 新增 `autoCheck` 配置字段到 `updates.js`，默认值为 `false`
- 新增 IPC 通道 `update-set-auto-check` 用于启用/禁用自动检查
- 更新 `AboutPage.jsx` 增加自动检查开关 UI 组件
- 更新 `useUpdate.js` 钩子，支持 `setAutoCheck` 方法

## 📥 下载

| 平台        | 下载链接                                                                                                                                                                          |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Windows** | [安装版 x64](https://github.com/DT27/NoxSSH/releases/download/v1.4.2/NoxSSH-Setup-x64.exe) · [便携版 x64](https://github.com/DT27/NoxSSH/releases/download/v1.4.2/NoxSSH-x64.exe) |
| **macOS**   | [Apple 芯片 (M1+)](https://github.com/DT27/NoxSSH/releases/download/v1.4.2/NoxSSH-arm64.dmg) · [Intel](https://github.com/DT27/NoxSSH/releases/download/v1.4.2/NoxSSH-x64.dmg)    |
| **Linux**   | [AppImage x64](https://github.com/DT27/NoxSSH/releases/download/v1.4.2/NoxSSH-x86_64.AppImage)                                                                                    |

## 🔄 从旧版本升级

直接安装新版本即可，所有设置和数据将自动保留。首次启动后，自动更新检查默认为禁用状态，您可以在"设置 → 关于"中手动开启。

## 🙏 致谢

感谢所有为 NoxSSH 做出贡献的开发者和用户！

---

**完整更新日志**: [CHANGELOG.md](https://github.com/DT27/NoxSSH/blob/main/CHANGELOG.md)

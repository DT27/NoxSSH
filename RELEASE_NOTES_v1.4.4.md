# NoxSSH v1.4.4 发布说明

本次更新集中在 SFTP 的可用性、易用性与终端联动。

## 🎉 新增功能

### SFTP 压缩 / 解压

在 SFTP 文件列表上右键即可压缩所选文件或文件夹，也可对已有压缩包一键解压：

- 支持格式：ZIP、tar.gz、tar.bz2、tar.xz（「压缩」菜单折叠为子菜单，按需展开）
- 解压会自动识别 `.zip`、`.tar`、`.tar.gz`、`.tar.bz2`、`.tar.xz`
- 单文件压缩包（`.gz` / `.bz2` / `.xz`）解压时保留原文件
- 压缩与解压都在服务器端通过 exec 通道执行，无需先下载到本机

### 终端路径与 SFTP 联动

- 终端通过 shell 集成上报当前工作目录（OSC 7），远程 SSH 与本地终端都支持
- 切换到 SFTP 时自动同步到终端当前路径，省去手动逐层点开目录

## 🌍 国际化

SFTP 界面全面本地化：

- 工具栏、文件列表、传输面板、属性与权限弹窗、冲突与确认对话框
- 覆盖简体中文、English、日本語、한국어、Português、Русский、Tiếng Việt

## 🔧 构建与发布

- macOS 构建全部迁移到项目自托管 runner，避免公共 macOS 池繁忙时任务被取消
- Release 工作流支持复用已有运行的编译产物，只补编缺失平台

## 📥 下载

| 平台        | 下载链接                                                                                                                                                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Windows** | [安装版 x64](https://github.com/DT27/NoxSSH/releases/download/v1.4.4/NoxSSH-Setup-v1.4.4-x64.exe) · [便携版 x64](https://github.com/DT27/NoxSSH/releases/download/v1.4.4/NoxSSH-v1.4.4-x64.exe)                                                               |
| **macOS**   | [Apple 芯片 (M1+)](https://github.com/DT27/NoxSSH/releases/download/v1.4.4/NoxSSH-v1.4.4-arm64.dmg) · [Intel](https://github.com/DT27/NoxSSH/releases/download/v1.4.4/NoxSSH-v1.4.4-x64.dmg)                                                               |
| **Linux**   | [AppImage x64](https://github.com/DT27/NoxSSH/releases/download/v1.4.4/NoxSSH-v1.4.4-x64.AppImage)                                                                                                                                                           |

## 🔄 从旧版本升级

直接安装新版本即可，所有设置、主机、密钥与 WebDAV 配置都会保留。

---

**完整更新日志**: [CHANGELOG.md](https://github.com/DT27/NoxSSH/blob/main/CHANGELOG.md)

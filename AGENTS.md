# NoxSSH 开发指南

## 语言设置

### 与项目所有者的交流语言：中文

未来所有与此项目相关的对话、说明、解释和文档都应使用中文进行。

---

## 项目概述

NoxSSH 是一个基于 Electron、React 和 xterm.js 构建的现代 SSH 客户端。它是从 CloudTerm 分支而来，支持 SSH、SFTP、Telnet、RDP、VNC 和串口连接，并集成了 AI 代理功能。

**仓库结构：**

- `src/main/` - Electron 主进程，每个模块对应一个功能
- `src/renderer/` - React UI 应用
  - `components/` - 按功能组织的 UI 组件
  - `hooks/` - React 状态管理钩子
  - `lib/` - 纯工具函数
  - `assets/` - 图标、图片、字体
  - `i18n/` - 国际化资源

## 云同步替换为 WebDAV（隐私与安全）

已移除对 CloudBlast 云同步的依赖，改为基于 WebDAV 的自定义同步：

- 新模块：[`src/main/webdav-sync.js`](src/main/webdav-sync.js)
  - 配置：URL、用户名、密码、同步口令（均在主进程保存，渲染进程不可见）
  - 加密：使用 `backup.seal/unseal`（AES-256-GCM + scrypt），口令在设备端加密后再上传
  - 冲突处理：上传前先拉取远端并合并，再以更高 revision 推送
  - 触发：保存时防抖推送、定时轮询、锁屏解锁/系统唤醒时拉取
- 快照内容：
  - 主机、文件夹、密钥、代码片段、代理、已知主机、终端设置
  - 助手设置与各提供商密钥（解密后再封入快照；本机 `local` 模型地址/密钥不同步）
- 历史备份：独立文件 `{base}/noxssh/backups/YYYY-MM-DDTHH-MM-SSZ.json`
  - 明文 `counts` 字段仅统计数量，旧备份没有该字段时列表不展示数量
  - 列表可单条删除（WebDAV `DELETE`）；删除不影响当前快照
- 清空本机数据（设置 → WebDAV 同步）：
  - 需确认后执行
  - 清除本机主机/密钥/片段/代理/已知主机/助手设置与对话/活动日志
  - 同时复位本机 WebDAV 配置（地址、账号、密码、同步口令）并停止轮询
  - **不删除**服务器上已有的快照和历史备份
  - 清空过程中禁止自动推送，避免把空数据写到远端
- IPC 通道（`webdav-sync-*`）：
  - `status / configure / test`
  - `setEnabled / push / pull`
  - `list-backups / create-backup / restore-backup / delete-backup`
  - `reset-local`
  - `reportSettings`（终端设置从渲染进程交给主进程用于快照）
- UI：
  - [`AccountPage.jsx`](src/renderer/components/settings/pages/AccountPage.jsx) 为 WebDAV 设置页：地址、用户名、密码、同步口令、连接测试、启用开关、立即保存/恢复、历史备份、清空本机
  - [`SidebarAccount.jsx`](src/renderer/components/SidebarAccount.jsx) 显示 WebDAV 同步状态
  - 设置导航：`WebDAV同步` + `备份 / 导入`
  - 移除了 CloudBlast 账户登录、服务器同步（`server-sync`）等 UI 与文案
- 预加载暴露：
  - `window.api.webdavSync.*`（取代了旧的 `account / serverSync / cloudSnapshot`）
- 兼容：
  - 旧的 `cloudblast` / `cloudblast-folder-*` 主机与文件夹记录继续保留（仅移除品牌文案），避免破坏已有数据
  - 备份文件格式（`backup.js`）保持不变，导入/导出继续可用

注意：

- 同步口令丢失将无法解密远端快照（与之前 CloudBlast 账户口令丢失的威胁模型一致）
- WebDAV 密码仅用于认证；实际内容在设备端加密
- 清空本机后若不再填写 WebDAV 配置，不会自动从远端拉回数据
- 旧的 CloudBlast 相关模块文件（`account.js`、`server-sync.js`、`cloud-snapshot.js`）暂时保留在磁盘上，但运行时入口已不再引用，可在确认无误后删除

## 中国网络：Electron 二进制镜像

国内下载官方 Electron / electron-builder 二进制经常失败。项目级 [`.npmrc`](.npmrc) 已切到 npmmirror：

- `electron_mirror=https://npmmirror.com/mirrors/electron/`
- `electron_builder_binaries_mirror=https://npmmirror.com/mirrors/electron-builder-binaries/`

`npm install` 会走该镜像。若仍失败，可临时设置同名环境变量后再装 `electron`。

## NextSSH 主机导入

设置 → 备份 / 导入 增加 NextSSH 备份导入，契约与现有 PuTTY / KiTTY / MobaXterm / OpenSSH 一致：

- 模块：[`src/main/nextssh-import.js`](src/main/nextssh-import.js)
- 入口：[`src/main/import.js`](src/main/import.js) 的 `source === "nextssh"`
- UI：[`src/renderer/components/settings/AppImportSection.jsx`](src/renderer/components/settings/AppImportSection.jsx)（仅选文件，无默认路径扫描）
- 测试：[`test/nextssh-import.test.js`](test/nextssh-import.test.js)

备份形态：`{ version, createdAt, data: [...] }`，主机记录 `_id` 前缀为 `ssh_server/`。

安全约定：

- `scan` 只返回可展示字段，密码和私钥正文不进 IPC
- `apply` 只接收用户勾选的 `keys`，主进程重新读盘再导入
- 密码写入保险库；内嵌 PEM / OpenSSH 私钥按指纹复用已有密钥
- `hostKeyHash` 不是 known_hosts 条目，不导入
- 已存在主机（协议 + 地址 + 端口 + 用户名）跳过，不覆盖

## 主机连接界面本地化

连接覆盖层原先写死英文。现已走 `session.*` 词条，语言跟随设置（en / zh / pt / ru / vi）：

- [`ConnectingSplash.jsx`](src/renderer/components/ui/ConnectingSplash.jsx)：`正在连接到 {title}`，主机名仍加粗
- [`SessionScreen.jsx`](src/renderer/components/ui/SessionScreen.jsx)：未知 / 已更改主机密钥、额外认证、连接失败与倒计时重试
- [`TerminalView.jsx`](src/renderer/components/TerminalView.jsx)：窗格状态条、断开连接 / 关闭窗格

词条在各语言文件末尾的 `session.*`。取消按钮复用 `common.cancel`。

未改：写入 xterm 缓冲的 `Reconnected` / `Disconnected` / `Connection failed`，以及活动日志、RDP/VNC 状态点等其它英文。

# NoxSSH 项目体积优化建议

## 当前问题

编译后的客户端体积超过 100MB，主要原因包括：

1. **大量操作系统图标**（~0.86 MB）
2. **项目截图文件**（~3.46 MB）
3. **Node.js 依赖包**
4. **Electron 框架本身**

## 优化建议

### 1. 移除不必要的截图文件（可节省 ~3-4 MB）

以下截图文件仅用于 GitHub README 展示，不应打包到应用程序中：

```
Main Image.png          # 1.4 MB
RDP.png                 # 0.5 MB
NoxSSH_WebDAV.png       # 0.35 MB
NoxSSH_WebDAV_backup.png # 0.3 MB
Customizeable.png       # 0.22 MB
hostscloudterm.png      # 0.14 MB
Split Pane.png          # 0.25 MB
vaults and hosts page.png # 0.19 MB
```

**操作方法：**

在 [`package.json`](package.json:36) 的 `build.files` 中添加排除规则：

```json
"files": [
  "src/main/**/*",
  "dist/renderer/**/*",
  "resources/**/*",
  "!resources/README.md",
  "!resources/hello-helper.exe",
  "!*.png",  // 排除根目录所有 PNG
  "build/icon.png",  // 但保留应用图标
  "!**/node_modules/@hugeicons/**",
  "!**/node_modules/hugeicons-react/**",
  "!**/node_modules/@fontsource/**",
  "!**/node_modules/@xterm/**",
  "!**/node_modules/@novnc/**",
  "!**/node_modules/gsap/**",
  "!**/node_modules/react/**",
  "!**/node_modules/react-dom/**",
  "!**/node_modules/react-hot-toast/**"
]
```

### 2. 优化操作系统图标（可节省 ~0.5 MB）

当前有 105 个操作系统图标（128x128 PNG），可以考虑：

**选项 A：按需加载（推荐）**

- 将不常用的 Linux 发行版图标改为延迟加载
- 只打包最常见的 10-15 个系统图标
- 其他图标使用通用 Linux 图标占位

**选项 B：压缩优化**

- 使用 pngquant 或 tinypng 压缩图标，可减少 30-50% 体积
- 考虑将部分图标转为 WebP 格式

```bash
# 使用 pngquant 压缩图标
pngquant --quality=65-80 src/renderer/assets/icons/*.png --ext .png --force
```

### 3. 启用 ASAR 压缩（可节省 10-20%）

在 [`package.json`](package.json:52) 中启用 ASAR 压缩：

```json
"build": {
  "asar": true,
  "asarUnpack": [
    "**/node_modules/@serialport/bindings-cpp/**"
  ]
}
```

### 4. 优化依赖包

**检查并移除未使用的依赖：**

```bash
# 安装依赖分析工具
npm install -g depcheck

# 检查未使用的依赖
depcheck
```

**考虑替换大型依赖：**

- `electron-updater` - 如果用户禁用自动更新，可以考虑延迟加载
- 检查是否有重复的依赖（如多个版本的 React）

### 5. 生产构建优化

确保使用生产模式构建：

```json
"build:renderer": "vite build --mode production"
```

在 [`vite.config.js`](vite.config.js) 中添加优化配置：

```javascript
export default defineConfig({
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console.log
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          xterm: ["@xterm/xterm", "@xterm/addon-fit"],
        },
      },
    },
  },
});
```

### 6. 字体优化

检查 [`@fontsource`](package.json:176) 依赖，确保只加载需要的字重：

```javascript
// 只导入需要的字重
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css";
```

### 7. 分平台打包

为不同平台创建针对性的构建配置，避免在 Windows 安装包中包含 macOS/Linux 特定的资源。

## 预期效果

实施以上优化后，预计可以：

- **立即见效**：移除截图文件（-3-4 MB）
- **短期优化**：图标压缩 + ASAR（-5-10 MB）
- **中期优化**：依赖清理 + 代码分割（-10-20 MB）

**总计可减少 20-30 MB**，将最终安装包控制在 **80-90 MB** 左右。

## 实施优先级

1. **高优先级**（立即实施）

   - 移除截图文件
   - 启用 ASAR 压缩

2. **中优先级**（下个版本）

   - 图标压缩优化
   - 生产构建优化

3. **低优先级**（长期优化）
   - 按需加载罕见图标
   - 依赖包深度优化

## 注意事项

- 优化前务必测试各平台的构建包，确保功能正常
- 图标压缩后注意检查显示效果
- ASAR 压缩可能会略微增加启动时间（通常不明显）

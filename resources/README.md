# NoxSSH Resources

Application resources bundled into the packaged app (icons and similar assets).

Everything in this folder is copied verbatim into the installer via
`extraResources`, so do not leave build artifacts here.

The one exception is `hello-helper.exe`, which `npm run build:hello` compiles
and which only the Windows package carries. It is filtered out of the macOS and
Linux builds, and it is gitignored, so it is absent from a fresh checkout until
you build it.

## Icons

The app icons are not here. Their day and night sources live at
`build/AppIcons/icons-day/desktop-1024x1024.png` and
`build/AppIcons/icons-night/desktop-1024x1024.png`.

electron-builder uses the day source for Windows, macOS, and Linux, converting
it to `.ico` and `.icns` where required. Both sources are copied into packaged
resources so the running app can follow the selected appearance theme.

`win.icon` used to name `resources/icon.ico`, which was never committed, so
every Windows build up to now quietly shipped the default Electron logo.
electron-builder warns about a missing icon rather than failing, which is how
that went unnoticed.

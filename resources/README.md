# CloudTerm Resources

Application resources bundled into the packaged app (icons and similar assets).

Everything in this folder is copied verbatim into the installer via
`extraResources`, so do not leave build artifacts here.

The one exception is `hello-helper.exe`, which `npm run build:hello` compiles
and which only the Windows package carries. It is filtered out of the macOS and
Linux builds, and it is gitignored, so it is absent from a fresh checkout until
you build it.

## Icons

The app icon is not here. It lives at `build/icon.png` in the repo root, and
all three platform targets point at that one file: electron-builder generates
the Windows `.ico` and the macOS `.icns` from it, and Linux takes the PNG as
it is.

`win.icon` used to name `resources/icon.ico`, which was never committed, so
every Windows build up to now quietly shipped the default Electron logo.
electron-builder warns about a missing icon rather than failing, which is how
that went unnoticed.

**The current `build/icon.png` is built from `appicon.png` in the repo root**,
which serves as the unified brand identity icon for the NoxSSH application
across all platforms (Linux, Windows, and macOS).

<p align="center">
  <img src="appicon.png" alt="NoxSSH" width="128">
</p>

<h1 align="center">NoxSSH</h1>

<p align="center">
  <strong>モダンで安全、WebDAV 同期に対応したマルチプロトコルのリモート接続ツール</strong>
</p>

<p align="center">
  SSH · SFTP · Telnet · シリアル · RDP · VNC<br/>
  分割ペイン · ファイル転送 · ポート転送 · プライベート WebDAV 同期
</p>

<p align="center">
  <a href="https://github.com/DT27/NoxSSH/releases/latest"><img alt="最新リリース" src="https://img.shields.io/github/v/release/DT27/NoxSSH?style=for-the-badge&label=Release&color=2ea44f"></a>
  &nbsp;
  <img alt="プラットフォーム" src="https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue?style=for-the-badge&logo=electron">
  &nbsp;
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/License-fair--code-green?style=for-the-badge"></a>
</p>

<p align="center">
  <a href="./README.md">简体中文</a> ·
  <a href="./README.en.md">English</a> ·
  <strong>日本語</strong> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a>
</p>

---

<img src="NoxSSH_Main.png" alt="NoxSSH メイン画面" width="100%">

NoxSSH は、サーバー、ネットワーク機器、リモートデスクトップを日常的に管理する
開発者や運用担当者向けのデスクトップツールです。ターミナル、ファイル管理、
ポート転送、リモートデスクトップをひとつにまとめ、WebDAV で設定をデバイス間同期できます。

## 特長

- **あらゆる環境へひとつのアプリから接続：** SSH、SFTP、Telnet、シリアル、RDP、VNC をまとめて管理。
- **効率的なターミナルワークスペース：** タブ、柔軟な分割ペイン、入力の一斉送信、セッション復元、検索、録画。
- **WebDAV 同期：** ホスト、鍵、スニペット、プロキシ、既知のホスト、ターミナル設定を端末上で暗号化してからアップロード。
- **独立した履歴バックアップ：** 定期または手動でバージョンを作成し、現在のスナップショットに影響を与えず復元・削除。
- **簡単な移行：** OpenSSH、PuTTY、KiTTY、MobaXterm、NextSSH からデータをインポート。
- **初期状態では通信を最小限に：** テレメトリはなく、自動更新確認はデフォルトで無効。手動確認はいつでも可能。

NoxSSH は [CloudTerm](https://github.com/BradPerbs/cloudterm) を基に、アカウント式クラウド同期を WebDAV に置き換えています。

---

## 目次

- [機能](#features)
- [スクリーンショット](#screenshots)
- [はじめに](#getting-started)
- [参加する](#community)
- [技術スタック](#tech-stack)
- [ライセンス](#license)

---

<a name="features"></a>

## 機能

### ターミナル

- **柔軟な分割ペイン**：左右・上下の分割、ペイン拡大、全画面表示
- **タブとグループ**：名前と色を設定し、次回起動時に復元
- **明暗ターミナルテーマ**、フォントと配色をカスタマイズ可能
- **スクロールバック検索とクリック可能なリンク**、正規表現にも対応
- **入力の一斉送信**で複数セッションを同時操作
- **セッション録画とスクリーンショット**でトラブル対応と記録を支援

### 接続

- **SSH、Telnet、シリアル接続**を同じウィンドウで管理
- **ジャンプホスト**を使った踏み台経由の接続
- **SOCKS5、SOCKS4、HTTP プロキシ**をターミナル、SFTP、ポート転送、リモートデスクトップで共用
- **パスワード、鍵、SSH Agent、証明書**、TPM で保護された Windows Hello 鍵
- **対話型認証と 2FA**
- **自動再接続**：ネットワーク切断やシステム復帰後に再接続
- **接続時コマンド**を接続成功後に自動実行

### ファイルとネットワーク

- **本格的な SFTP マネージャ**：再帰転送、再開、衝突処理、ドラッグ＆ドロップ
- **手元のエディタでリモートファイルを編集**。保存のたびにアップロード
- **ポート転送**：ローカル、リモート、動的 SOCKS5。リアルタイムの通信量
- **リモートデスクトップ**：RDP と VNC をペインに開き、SSH トンネル経由

### データと移行

- **暗号化 WebDAV 同期**：同期パスフレーズで端末上のデータを暗号化してからアップロードします。**同期パスフレーズは端末にのみ保存され、紛失するとリモートデータを復号できません。WebDAV パスワードは接続認証にのみ使用されます。**
- **履歴バックアップ**は作成、復元、個別削除ができ、現在の同期スナップショットを上書きしません
- **ローカル暗号化バックアップ**で設定一式をエクスポートし、別の端末へインポート
- **複数形式からインポート：** OpenSSH、PuTTY、KiTTY、MobaXterm、NextSSH

<a name="operating-systems"></a>

### オペレーティングシステムの検出

接続後に OS を検出し、ホストカードにシステムのアイコンとバージョンを表示します。

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

### セキュリティ

- **暗号化ボルト**にすべての資格情報。起動パスワードは任意
- **ホスト鍵の検証**。接続ごと、ホップごとに確認
- **WebDAV 同期**。アップロード前に同期パスフレーズで暗号化。履歴バックアップは個別に復元・削除
- **暗号化バックアップ**で設定一式を別のマシンへ
- **アクティビティログ**が接続と変更を記録

---

<a name="screenshots"></a>

## スクリーンショット

### WebDAV 同期と履歴バックアップ

<img src="NoxSSH_WebDAV.png" alt="NoxSSH WebDAV 同期" width="100%">

<img src="NoxSSH_WebDAV_backup.png" alt="NoxSSH WebDAV 履歴バックアップ" width="100%">

### 分割ペインと SFTP

<img src="NoxSSH_SplitPane.png" alt="分割ペインと SFTP" width="100%">

### Windows リモートデスクトップ

<img src="NoxSSH_RDP.png" alt="Windows リモートデスクトップ" width="100%">

### 外観とターミナル配色

<img src="NoxSSH_Customizeable.png" alt="外観設定" width="100%">

---

<a name="getting-started"></a>

## はじめに

<a name="download"></a>

### ダウンロード

お使いのプラットフォームに合うパッケージを[最新リリース](https://github.com/DT27/NoxSSH/releases/latest)からダウンロードしてください：

| OS | アーキテクチャ | ファイル名 |
| -- | -------------- | ---------- |
| Windows | x64 | `NoxSSH-Setup-v<version>-x64.exe`（インストーラー、推奨）または `NoxSSH-v<version>-x64.exe`（ポータブル） |
| macOS | Apple シリコン / Intel | `NoxSSH-v<version>-arm64.dmg` または `NoxSSH-v<version>-x64.dmg` |
| Linux | x64 | `NoxSSH-v<version>-x64.AppImage` |

[GitHub のすべてのリリース](https://github.com/DT27/NoxSSH/releases)も見られます。

### ソースからビルド

Node.js 20 以降と npm が必要です。

```bash
git clone https://github.com/DT27/NoxSSH.git
cd NoxSSH
npm install
npm run dev
```

現在のプラットフォーム向けリリースパッケージを `dist/` に生成します：

```bash
npm run build
```

### ショートカット

|                      |                    |                |            |
| -------------------- | ------------------ | -------------- | ---------- |
| `Ctrl+Shift+F`       | スクロールバック検索 | `Alt+Shift+=`  | 右に分割   |
| `Ctrl+Shift+K`       | スニペットパレット | `Alt+Shift+-`  | 下に分割   |
| `Ctrl+Shift+B`       | 入力の一斉送信     | `Alt+Shift+Z`  | ペイン拡大 |
| `Ctrl+Shift+C` / `V` | コピーと貼り付け   | `Ctrl+Shift+W` | ペインを閉じる |
| `Alt+矢印キー`       | ペイン間を移動     |                |            |

<a name="community"></a>

## 参加する

- バグや機能要望は [Issues](https://github.com/DT27/NoxSSH/issues) へ報告してください。
- 修正や新機能は [Pull Request](https://github.com/DT27/NoxSSH/pulls) で送ってください。
- 変更を提出する前に `npm test` と `npm run build:renderer` を実行してください。

<a name="contributors"></a>

## 貢献者

NoxSSH の貢献者：

<a href="https://github.com/DT27/NoxSSH/graphs/contributors">
  <img alt="NoxSSH の貢献者" src="https://contrib.rocks/image?repo=DT27/NoxSSH" />
</a>

元の CloudTerm の貢献者にも感謝します。

<a name="tech-stack"></a>

## 技術スタック

Electron · React · xterm.js · ssh2 · IronRDP（WebAssembly）· noVNC · Tailwind ·
Vite

`src/main/` は Electron メインプロセス。機能ごとに 1 モジュール。
`src/renderer/` は React UI：`components/` は機能別、`hooks/` は状態、
`lib/` は純関数。

<a name="license"></a>

## ライセンス

**NoxSSH** は [CloudTerm](https://github.com/BradPerbs/cloudterm) のフォークです。

本プロジェクトは元の [CloudTerm ライセンス](LICENSE)（fair-code）で配布されます。

- ソースは公開され、読めます。
- ソフトウェアは無料で使用、改変、共有（フォークの公開を含む）できます。個人でも社内でも構いません。
- 本ソフトウェアの販売、有料製品・サービスへの組み込み、有料ホストとしての運用、その他の商用配布には、**CloudBlast からの別途商用ライセンスが必要**です。

コピーまたは実質的な部分を配布するときは、元のライセンスと著作権表示を残してください。

この作品が CloudTerm に由来することを正確に述べて構いません。
このプロジェクトを「CloudTerm」と呼んだり、CloudBlast からのものとして装ったりしてはいけません。

全文：[LICENSE](LICENSE) | https://faircode.io

元プロジェクト：https://github.com/BradPerbs/cloudterm（CloudBlast）

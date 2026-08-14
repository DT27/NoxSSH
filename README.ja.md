<p align="center">
  <img src="cloudterm.png" alt="CloudTerm" width="128">
</p>

<h1 align="center">NoxSSH</h1>

<p align="center">
  <strong>SSH、SFTP、Telnet、Windows RDP をひとつの端末に</strong>
</p>

<p align="center">
  Electron、React、xterm.js で作られたモダンなターミナルワークスペース。<br/>
  AI アシスタント · 分割ペイン · タブ · ファイル転送 · ポート転送 · リモートデスクトップ · スニペット
</p>

<p align="center">
  <a href="https://github.com/DT27/NoxSSH/releases/latest"><img alt="Download" src="https://img.shields.io/badge/Download-Latest-success?style=for-the-badge&logo=github"></a>
  &nbsp;
  <a href="#"><img alt="Platform" src="https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue?style=for-the-badge&logo=electron"></a>
  &nbsp;
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/License-fair--code-green?style=for-the-badge"></a>
</p>

<p align="center">
  <a href="./README.md">English</a> ·
  <a href="./README.zh-CN.md">简体中文</a> ·
  <strong>日本語</strong> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a>
</p>

---

NoxSSH は [CloudTerm](https://github.com/BradPerbs/cloudterm) のフォークです。ターミナル、SFTP、
RDP/VNC、アシスタントはそのままに、データの同期方法を主に変更しています。

## 主な変更点

- **CloudBlast アカウントではなく、自分の WebDAV。** ホスト、フォルダー、鍵、スニペット、プロキシ、既知のホスト、アシスタント設定、ターミナル設定は、この端末で暗号化してから指定した WebDAV にアップロードします。標準の WebDAV ならどれでも使えます。
- **バージョン付き履歴バックアップ**を WebDAV に保存。スケジュールまたは手動。あるバージョンを復元・削除しても、現在の同期データには影響しません。
- **APIゲートウェイ。** AI アシスタントは OpenAI 互換の APIゲートウェイを使え、このマシンに Claude、Codex、OpenCode CLI を入れる必要はありません。
- **NextSSH バックアップのインポート。** PuTTY、KiTTY、MobaXterm、OpenSSH と同じ並びです。
- **テレメトリなし。** 起動時に `console.cloudblast.io` へアクセスしません。更新確認は GitHub の [このリポジトリ](https://github.com/DT27/NoxSSH/releases) を見ます。
  <img src="NoxSSH_WebDAV.png" alt="NoxSSH" width="100%">
  <img src="NoxSSH_WebDAV_backup.png" alt="NoxSSH" width="100%">
  <img src="NoxSSH_AI_APIRelay.png" alt="NoxSSH" width="100%">

<img src="Main%20Image.png" alt="NoxSSH" width="100%">

---

## 目次

- [ダウンロード](#download)
- [これは何か](#what-it-is)
- [機能](#features)
- [スクリーンショット](#screenshots)
- [はじめに](#getting-started)
- [コミュニティ](#community)
- [貢献者](#contributors)
- [技術スタック](#tech-stack)
- [ライセンス](#license)

---

<a name="what-it-is"></a>

## これは何か

- **ひとつのターミナル**：SSH、telnet、シリアルコンソール。タブ、分割ペイン、GPU 描画。
- **ひとつの SFTP クライアント**：すでに開いている接続を使い、再帰転送とドラッグ＆ドロップ。
- **RDP と VNC**：Windows と Linux を同じアプリに並べる。
- **サーバーを置く場所**：フォルダー、タグ、鍵保管庫、スニペット。すべて暗号化、すべて検索可能。

<a name="features"></a>

## 機能

### AI アシスタント

<p align="center">
  <img src="docs/logos/claude-code.svg" alt="Claude Code" title="Claude Code" height="34">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="docs/logos/codex.svg" alt="Codex" title="Codex" height="34">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="docs/logos/opencode.svg" alt="OpenCode" title="OpenCode" height="34">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="docs/logos/grok.svg" alt="Grok Build" title="Grok Build" height="34">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="docs/logos/local-model.svg" alt="ローカルモデル" title="ローカルモデル" height="34">
  <br/>
  <sub><b>Claude Code</b> &nbsp;·&nbsp; <b>Codex</b> &nbsp;·&nbsp; <b>OpenCode</b>
  &nbsp;·&nbsp; <b>Grok Build</b> &nbsp;·&nbsp; <b>ローカルモデル</b></sub>
</p>

- **すでに入っている Claude Code、Codex、OpenCode、Grok Build** を、自分のアカウントと設定のまま使う
- **ローカルモデルも可**：LM Studio、Ollama、llama.cpp、vLLM など。アカウントも鍵も不要。何もこのパソコンから出ない
- **今見ているセッションを読んでリモートサーバーを操作**。変更の前に確認する
- **会話ごとにモデルと推論の強さを選べる**。実行中に使用量を表示

### ターミナル

- **任意の分割**。1 枚を拡大したり全画面にもできる
- **タブ**に名前・色・グループ。次回起動で復元
- **36 のテーマ**。自分で色を決めてもよい
- **スクロールバック検索**は正規表現対応。リンクはクリックできる
- **入力の一斉送信**。一度の入力をすべてのセッションへ
- **セッション録画**とワンクリックのスクリーンショット

### 接続

- **SSH、telnet、シリアル**を同じウィンドウに
- **ジャンプホスト**で堡塁の先へ
- **パスワード、鍵、SSH agent、証明書**、TPM に置く Windows Hello 鍵
- **二要素認証**のプロンプトを正しく扱う
- **自動再接続**。切断やノート PC の復帰後もつなぎ直す
- **接続時に実行するコマンド**。つながるたびに再生

### ファイルとネットワーク

- **本格的な SFTP マネージャ**：再帰転送、再開、衝突処理、ドラッグ＆ドロップ
- **手元のエディタでリモートファイルを編集**。保存のたびにアップロード
- **ポート転送**：ローカル、リモート、動的 SOCKS5。リアルタイムの通信量
- **リモートデスクトップ**：RDP と VNC をペインに開き、SSH トンネル経由

### 整理

- **フォルダーと色付きタグ**がホスト一覧全体に効く
- **スニペット**は値の入力を求められ、一連の手順としてまとめられる
- **名前、アドレス、タグを即座に検索**
- **既存の `~/.ssh/config` を一度で取り込み**

### オペレーティングシステム

接続時に OS を判別し、ホストカードとタブにそのロゴが出ます。ホスト名を読まなくても
Debian と Fedora を見分けられます。

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
  <img src="src/renderer/assets/icons/128_deepin.png" alt="deepin" title="deepin" width="42">
  <img src="src/renderer/assets/icons/128_raspios.png" alt="Raspberry Pi OS" title="Raspberry Pi OS" width="42">
  <img src="src/renderer/assets/icons/128_kali.png" alt="Kali Linux" title="Kali Linux" width="42">
  <img src="src/renderer/assets/icons/128_parrot.png" alt="Parrot OS" title="Parrot OS" width="42">
  <img src="src/renderer/assets/icons/128_tails.png" alt="Tails" title="Tails" width="42">
  <br/>
  <img src="src/renderer/assets/icons/128_fedora_newlogo.png" alt="Fedora" title="Fedora" width="42">
  <img src="src/renderer/assets/icons/128_redhat.png" alt="Red Hat Enterprise Linux" title="Red Hat Enterprise Linux" width="42">
  <img src="src/renderer/assets/icons/128_centos_blue.png" alt="CentOS" title="CentOS" width="42">
  <img src="src/renderer/assets/icons/128_alma_darkblue.png" alt="AlmaLinux" title="AlmaLinux" width="42">
  <img src="src/renderer/assets/icons/128_suse.png" alt="openSUSE and SLES" title="openSUSE and SLES" width="42">
  <img src="src/renderer/assets/icons/128_arch.png" alt="Arch Linux" title="Arch Linux" width="42">
  <img src="src/renderer/assets/icons/128_manjaro.png" alt="Manjaro" title="Manjaro" width="42">
  <img src="src/renderer/assets/icons/128_endeavour.png" alt="EndeavourOS" title="EndeavourOS" width="42">
  <img src="src/renderer/assets/icons/128_garuda_blue.png" alt="Garuda Linux" title="Garuda Linux" width="42">
  <img src="src/renderer/assets/icons/128_arco.png" alt="ArcoLinux" title="ArcoLinux" width="42">
  <img src="src/renderer/assets/icons/128_artix.png" alt="Artix Linux" title="Artix Linux" width="42">
  <br/>
  <img src="src/renderer/assets/icons/128_alpine.png" alt="Alpine Linux" title="Alpine Linux" width="42">
  <img src="src/renderer/assets/icons/128_nixos.png" alt="NixOS" title="NixOS" width="42">
  <img src="src/renderer/assets/icons/128_gentoo.png" alt="Gentoo" title="Gentoo" width="42">
  <img src="src/renderer/assets/icons/128_void.png" alt="Void Linux" title="Void Linux" width="42">
  <img src="src/renderer/assets/icons/128_solus.png" alt="Solus" title="Solus" width="42">
  <img src="src/renderer/assets/icons/128_slackware.png" alt="Slackware" title="Slackware" width="42">
  <img src="src/renderer/assets/icons/128_linux.png" alt="Linux" title="Any other Linux" width="42">
  <img src="src/renderer/assets/icons/128_windows.png" alt="Windows" title="Windows" width="42">
  <img src="docs/logos/macos.svg" alt="macOS" title="macOS" width="42">
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

### ホストとキーチェーン

サーバーはフォルダー、タグ、検索付き。カードにプロトコルが表示されます。WebDAV 同期を
設定すれば、別のパソコンでも同じホストが戻ってきます。

<img src="hostscloudterm.png" alt="ホストとキーチェーン" width="100%">

### 分割ペインと SFTP

左にファイル、右に 2 つのシェル。裏は 1 本の接続です。窓の許す限り分割し、
区切りはドラッグできます。

<img src="Split%20Pane.png" alt="分割ペインと SFTP" width="100%">

### Windows リモートデスクトップ

Linux セッションの隣のタブに、Windows デスクトップ全体。クリップボードは双方向、
解像度はペインに追従します。

<img src="RDP.png" alt="Windows リモートデスクトップ" width="100%">

### 好みに合わせる

ターミナルテーマ、アプリの色、フォント、タイトルバーのアイコンまで変えられます。

<img src="Customizeable.png" alt="外観設定" width="100%">

---

<a name="getting-started"></a>

## はじめに

<a name="download"></a>

### ダウンロード

お使いのプラットフォーム向けの最新版：

| OS      | ダウンロード                                                                                                                                                                                |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| macOS    | [Apple シリコン（M1 以降）](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-arm64.dmg) · [Intel](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-x64.dmg)   |
| Windows  | [インストーラー、x64（推奨）](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-Setup-x64.exe) · [ポータブル、x64](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-x64.exe) |
| Linux    | [AppImage、x64](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-x86_64.AppImage)                                                                                             |

[GitHub のすべてのリリース](https://github.com/DT27/NoxSSH/releases)も見られます。

### ソースからビルド

```bash
git clone https://github.com/DT27/NoxSSH.git
cd NoxSSH/noxssh
npm install
npm run dev
```

OpenCode で AI アシスタントを使うには、`opencode` CLI を入れ、
`opencode auth login` で少なくとも 1 つのモデルプロバイダーを設定してください。
NoxSSH は OpenCode 既存のプロバイダーと資格情報だけを使い、複製も保存もしません。

ポータブル実行ファイルは `dist/` に出力されます：

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

<a name="community"></a>

## コミュニティ

質問、バグ、要望、これから何をするか知りたいとき。

<p>
  <a href="https://discord.gg/7M84Xp8QBr"><img alt="Join the Discord" src="https://img.shields.io/badge/Join%20the%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"></a>
</p>

GitHub の issue と pull request も歓迎します。

<a name="contributors"></a>

## 貢献者

CloudTerm に力を貸したすべての人、そしてここで続けている人に感謝します。

<a href="https://github.com/BradPerbs/cloudterm/graphs/contributors">
  <img alt="貢献者" src="https://contrib.rocks/image?repo=BradPerbs/cloudterm" />
</a>

<a name="tech-stack"></a>

## 技術スタック

Electron · React · xterm.js · ssh2 · IronRDP（WebAssembly）· noVNC · Tailwind ·
Vite · Claude Agent SDK · Codex SDK · OpenCode SDK

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

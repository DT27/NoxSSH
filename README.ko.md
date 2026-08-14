<p align="center">
  <img src="cloudterm.png" alt="CloudTerm" width="128">
</p>

<h1 align="center">NoxSSH</h1>

<p align="center">
  <strong>SSH, SFTP, Telnet, Windows RDP를 하나의 터미널에</strong>
</p>

<p align="center">
  Electron, React, xterm.js로 만든 현대적인 터미널 작업 공간.<br/>
  AI 도우미 · 분할 창 · 탭 · 파일 전송 · 포트 전달 · 원격 데스크톱 · 스니펫
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
  <a href="./README.ja.md">日本語</a> ·
  <strong>한국어</strong> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a>
</p>

---

NoxSSH는 [CloudTerm](https://github.com/BradPerbs/cloudterm)의 포크입니다. 터미널, SFTP,
RDP/VNC, 도우미는 그대로 두고, 주로 데이터 동기화 방식을 바꿨습니다.

## 주요 변경

- **CloudBlast 계정이 아니라 내 WebDAV.** 호스트, 폴더, 키, 스니펫, 프록시, 알려진 호스트, 도우미 설정, 터미널 설정은 이 기기에서 암호화한 뒤 지정한 WebDAV로 올립니다. 표준 WebDAV면 됩니다.
- **버전 있는 기록 백업**을 WebDAV에 저장합니다. 일정 또는 수동. 한 버전을 복원하거나 삭제해도 현재 동기화 데이터는 건드리지 않습니다.
- **API Gateway.** AI 도우미는 OpenAI 호환 API Gateway를 쓸 수 있어, 이 컴퓨터에 Claude, Codex, OpenCode CLI를 설치할 필요가 없습니다.
- **NextSSH 백업 가져오기.** PuTTY, KiTTY, MobaXterm, OpenSSH와 나란히.
- **텔레메트리 없음.** 시작할 때 `console.cloudblast.io`에 접속하지 않습니다. 업데이트 확인은 GitHub의 [이 저장소](https://github.com/DT27/NoxSSH/releases)를 봅니다.
  <img src="NoxSSH_WebDAV.png" alt="NoxSSH" width="100%">
  <img src="NoxSSH_WebDAV_backup.png" alt="NoxSSH" width="100%">
  <img src="NoxSSH_AI_APIRelay.png" alt="NoxSSH" width="100%">

<img src="Main%20Image.png" alt="NoxSSH" width="100%">

---

## 목차

- [다운로드](#download)
- [무엇인가](#what-it-is)
- [기능](#features)
- [스크린샷](#screenshots)
- [시작하기](#getting-started)
- [커뮤니티](#community)
- [기여자](#contributors)
- [기술 스택](#tech-stack)
- [라이선스](#license)

---

<a name="what-it-is"></a>

## 무엇인가

- **하나의 터미널**: SSH, telnet, 시리얼 콘솔. 탭, 분할 창, GPU 렌더링.
- **하나의 SFTP 클라이언트**: 이미 열린 연결을 쓰고, 재귀 전송과 끌어다 놓기.
- **RDP와 VNC**: Windows와 Linux를 같은 앱에 나란히.
- **서버를 두는 곳**: 폴더, 태그, 키 금고, 스니펫. 모두 암호화, 모두 검색 가능.

<a name="features"></a>

## 기능

### AI 도우미

<p align="center">
  <img src="docs/logos/claude-code.svg" alt="Claude Code" title="Claude Code" height="34">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="docs/logos/codex.svg" alt="Codex" title="Codex" height="34">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="docs/logos/opencode.svg" alt="OpenCode" title="OpenCode" height="34">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="docs/logos/grok.svg" alt="Grok Build" title="Grok Build" height="34">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="docs/logos/local-model.svg" alt="로컬 모델" title="로컬 모델" height="34">
  <br/>
  <sub><b>Claude Code</b> &nbsp;·&nbsp; <b>Codex</b> &nbsp;·&nbsp; <b>OpenCode</b>
  &nbsp;·&nbsp; <b>Grok Build</b> &nbsp;·&nbsp; <b>로컬 모델</b></sub>
</p>

- **이미 있는 Claude Code, Codex, OpenCode, Grok Build**를 내 계정과 설정 그대로 사용
- **로컬 모델도 가능**: LM Studio, Ollama, llama.cpp, vLLM 등. 계정과 키 없이, 아무것도 이 컴퓨터를 떠나지 않음
- **지금 보는 세션을 읽고 원격 서버를 조작**. 바꾸기 전에 확인
- **대화마다 모델과 추론 강도를 고르고**, 실행 중 사용량을 표시

### 터미널

- **원하는 대로 분할**. 한 칸을 확대하거나 전체 화면
- **탭**에 이름, 색, 그룹. 다음 실행에 복원
- **테마 36개**. 직접 색을 정해도 됨
- **스크롤백 검색**은 정규식. 링크는 클릭
- **입력 방송**. 한 번 입력하면 모든 세션으로
- **세션 녹화**와 원클릭 스크린샷

### 연결

- **SSH, telnet, 시리얼**을 같은 창에
- **점프 호스트**로 요새 너머로
- **비밀번호, 키, SSH agent, 인증서**, TPM에 두는 Windows Hello 키
- **2단계 인증** 프롬프트를 제대로 처리
- **자동 재연결**. 끊기거나 노트북이 깨어난 뒤에도
- **연결 시 실행할 명령**. 연결될 때마다 다시 재생

### 파일과 네트워크

- **본격 SFTP 관리자**: 재귀 전송, 이어받기, 충돌 처리, 끌어다 놓기
- **로컬 편집기로 원격 파일 수정**. 저장할 때마다 업로드
- **포트 전달**: 로컬, 원격, 동적 SOCKS5. 실시간 트래픽
- **원격 데스크톱**: RDP와 VNC를 창에 열고 SSH 터널로

### 정리

- **폴더와 색 태그**가 호스트 목록 전체에 적용
- **스니펫**은 값을 묻고, 순서대로 실행하는 묶음으로 만들 수 있음
- **이름, 주소, 태그를 바로 검색**
- **기존 `~/.ssh/config`를 한 번에 가져오기**

### 운영 체제

연결할 때 OS를 알아내고, 호스트 카드와 탭에 로고가 붙습니다. 호스트 이름을 읽지 않아도
Debian과 Fedora를 구분할 수 있습니다.

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

### 보안

- **암호화 금고**에 모든 자격 증명. 시작 비밀번호는 선택
- **호스트 키 검증**. 연결마다, 홉마다
- **WebDAV 동기화**. 올리기 전에 동기화 암호로 암호화. 기록 백업은 하나씩 복원·삭제
- **암호화 백업**으로 설정 전체를 다른 기기로
- **활동 로그**가 연결과 변경을 기록

---

<a name="screenshots"></a>

## 스크린샷

### 호스트와 키체인

서버는 폴더, 태그, 검색과 함께. 카드에 프로토콜이 보입니다. WebDAV 동기화를 켜면
다른 컴퓨터에서도 같은 호스트가 돌아옵니다.

<img src="hostscloudterm.png" alt="호스트와 키체인" width="100%">

### 분할 창과 SFTP

왼쪽에 파일, 오른쪽에 셸 두 개. 뒤에는 연결 하나. 창이 허락하는 만큼 나누고
구분선은 끌어 옮깁니다.

<img src="Split%20Pane.png" alt="분할 창과 SFTP" width="100%">

### Windows 원격 데스크톱

Linux 세션 옆 탭에 Windows 데스크톱 전체. 클립보드는 양방향,
해상도는 창을 따릅니다.

<img src="RDP.png" alt="Windows 원격 데스크톱" width="100%">

### 원하는 모습으로

터미널 테마, 앱 색, 글꼴, 제목 표시줄 아이콘까지 바꿀 수 있습니다.

<img src="Customizeable.png" alt="모양 설정" width="100%">

---

<a name="getting-started"></a>

## 시작하기

<a name="download"></a>

### 다운로드

플랫폼별 최신 버전:

| OS      | 다운로드                                                                                                                                                                                      |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| macOS    | [Apple 실리콘(M1 이후)](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-arm64.dmg) · [Intel](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-x64.dmg)         |
| Windows  | [설치 프로그램, x64(권장)](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-Setup-x64.exe) · [포터블, x64](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-x64.exe) |
| Linux    | [AppImage, x64](https://github.com/DT27/NoxSSH/releases/latest/download/NoxSSH-x86_64.AppImage)                                                                                               |

[GitHub의 모든 릴리스](https://github.com/DT27/NoxSSH/releases)도 볼 수 있습니다.

### 소스에서 빌드

```bash
git clone https://github.com/DT27/NoxSSH.git
cd NoxSSH/noxssh
npm install
npm run dev
```

OpenCode로 AI 도우미를 쓰려면 `opencode` CLI를 설치하고
`opencode auth login`으로 모델 공급자를 하나 이상 설정하세요.
NoxSSH는 OpenCode의 기존 공급자와 자격 증명만 쓰며, 복사하거나 저장하지 않습니다.

포터블 실행 파일은 `dist/`에 나갑니다:

```bash
npm run build
```

### 단축키

|                      |              |                |            |
| -------------------- | ------------ | -------------- | ---------- |
| `Ctrl+Shift+F`       | 스크롤백 검색 | `Alt+Shift+=`  | 오른쪽으로 분할 |
| `Ctrl+Shift+K`       | 스니펫 팔레트 | `Alt+Shift+-`  | 아래로 분할 |
| `Ctrl+Shift+B`       | 입력 방송     | `Alt+Shift+Z`  | 창 확대    |
| `Ctrl+Shift+C` / `V` | 복사와 붙여넣기 | `Ctrl+Shift+W` | 창 닫기    |

<a name="community"></a>

## 커뮤니티

질문, 버그, 요청, 다음에 무엇을 할지 보고 싶을 때.

<p>
  <a href="https://discord.gg/7M84Xp8QBr"><img alt="Join the Discord" src="https://img.shields.io/badge/Join%20the%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"></a>
</p>

GitHub 이슈와 pull request도 환영합니다.

<a name="contributors"></a>

## 기여자

CloudTerm에 힘을 보탠 모든 분, 그리고 여기서 이어가는 분들께 감사합니다.

<a href="https://github.com/BradPerbs/cloudterm/graphs/contributors">
  <img alt="기여자" src="https://contrib.rocks/image?repo=BradPerbs/cloudterm" />
</a>

<a name="tech-stack"></a>

## 기술 스택

Electron · React · xterm.js · ssh2 · IronRDP(WebAssembly) · noVNC · Tailwind ·
Vite · Claude Agent SDK · Codex SDK · OpenCode SDK

`src/main/`은 Electron 메인 프로세스. 기능마다 모듈 하나.
`src/renderer/`는 React UI: `components/`는 기능별, `hooks/`는 상태,
`lib/`는 순수 함수.

<a name="license"></a>

## 라이선스

**NoxSSH**는 [CloudTerm](https://github.com/BradPerbs/cloudterm)의 포크입니다.

이 프로젝트는 원래 [CloudTerm 라이선스](LICENSE)(fair-code)로 배포됩니다.

- 소스는 공개되어 읽을 수 있습니다.
- 소프트웨어는 무료로 사용, 수정, 공유(포크 공개 포함)할 수 있습니다. 개인이든 회사 내부든 됩니다.
- 이 소프트웨어를 팔거나, 유료 제품/서비스에 넣거나, 유료 호스팅으로 돌리거나, 그 밖의 상업 배포를 하려면 **CloudBlast의 별도 상업 라이선스가 필요**합니다.

복사본이나 실질적 부분을 배포할 때는 원래 라이선스와 저작권 표시를 남겨야 합니다.

이 작품이 CloudTerm에서 파생되었다고 정확히 말할 수 있습니다.
이 프로젝트를 “CloudTerm”이라고 부르거나 CloudBlast에서 온 것처럼 꾸며서는 안 됩니다.

전문: [LICENSE](LICENSE) | https://faircode.io

원 프로젝트: https://github.com/BradPerbs/cloudterm (CloudBlast)

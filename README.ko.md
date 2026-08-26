<p align="center">
  <img src="appicon.png" alt="NoxSSH" width="128">
</p>

<h1 align="center">NoxSSH</h1>

<p align="center">
  <strong>현대적이고 안전하며 WebDAV 동기화를 지원하는 다중 프로토콜 원격 연결 도구</strong>
</p>

<p align="center">
  SSH · SFTP · Telnet · 시리얼 · RDP · VNC<br/>
  분할 창 · 파일 전송 · 포트 전달 · 개인 WebDAV 동기화
</p>

<p align="center">
  <a href="https://github.com/DT27/NoxSSH/releases/latest"><img alt="최신 릴리스" src="https://img.shields.io/github/v/release/DT27/NoxSSH?style=for-the-badge&label=Release&color=2ea44f"></a>
  &nbsp;
  <img alt="플랫폼" src="https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue?style=for-the-badge&logo=electron">
  &nbsp;
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/License-fair--code-green?style=for-the-badge"></a>
</p>

<p align="center">
  <a href="./README.md">简体中文</a> ·
  <a href="./README.en.md">English</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <strong>한국어</strong> ·
  <a href="./README.es.md">Español</a> ·
  <a href="./README.ru.md">Русский</a>
</p>

---

<img src="NoxSSH_Main.png" alt="NoxSSH 기본 화면" width="100%">

NoxSSH는 서버, 네트워크 장비, 원격 데스크톱을 자주 관리하는 개발자와 운영자를 위한
데스크톱 도구입니다. 터미널, 파일 관리, 포트 전달, 원격 데스크톱을 하나로 통합하고
WebDAV를 통해 여러 기기에서 설정을 동기화합니다.

## 주요 특징

- **하나의 앱으로 모든 환경에 연결:** SSH, SFTP, Telnet, 시리얼, RDP, VNC 세션을 함께 관리합니다.
- **효율적인 터미널 작업 공간:** 탭, 유연한 분할 창, 입력 방송, 세션 복구, 검색, 녹화를 지원합니다.
- **WebDAV 동기화:** 호스트, 키, 스니펫, 프록시, 알려진 호스트, 터미널 설정을 로컬에서 암호화한 뒤 업로드합니다.
- **독립적인 기록 백업:** 예약 또는 수동으로 버전을 만들고 현재 스냅샷에 영향을 주지 않고 복원하거나 삭제합니다.
- **간편한 마이그레이션:** OpenSSH, PuTTY, KiTTY, MobaXterm, NextSSH 데이터를 가져옵니다.
- **기본 네트워크 요청 최소화:** 텔레메트리가 없고 자동 업데이트 확인은 기본적으로 꺼져 있으며, 수동 확인은 항상 사용할 수 있습니다.

NoxSSH는 [CloudTerm](https://github.com/BradPerbs/cloudterm)을 기반으로 하며 계정 기반 클라우드 동기화를 WebDAV로 대체했습니다.

---

## 목차

- [기능](#features)
- [스크린샷](#screenshots)
- [시작하기](#getting-started)
- [참여하기](#community)
- [기술 스택](#tech-stack)
- [라이선스](#license)

---

<a name="features"></a>

## 기능

### 터미널

- **유연한 분할 창**: 좌우/상하 분할, 창 확대, 전체 화면
- **탭과 그룹**: 이름과 색을 지정하고 다음 실행 때 복원
- **밝고 어두운 터미널 테마**, 글꼴과 색상 사용자 지정
- **스크롤백 검색과 클릭 가능한 링크**, 정규식 지원
- **입력 방송**으로 여러 세션을 동시에 제어
- **세션 녹화와 스크린샷**으로 문제 해결과 기록 지원

### 연결

- **SSH, Telnet, 시리얼 연결**을 같은 창에서 관리
- **점프 호스트**를 통한 배스천 연결
- **SOCKS5, SOCKS4, HTTP 프록시**를 터미널, SFTP, 포트 전달, 원격 데스크톱에서 재사용
- **비밀번호, 키, SSH Agent, 인증서**와 TPM으로 보호되는 Windows Hello 키
- **대화형 인증과 2FA**
- **자동 재연결**: 네트워크 끊김이나 시스템 절전 해제 후 재연결
- **연결 후 실행 명령**을 연결 성공 시 자동 실행

### 파일과 네트워크

- **본격 SFTP 관리자**: 재귀 전송, 이어받기, 충돌 처리, 끌어다 놓기
- **로컬 편집기로 원격 파일 수정**. 저장할 때마다 업로드
- **포트 전달**: 로컬, 원격, 동적 SOCKS5. 실시간 트래픽
- **원격 데스크톱**: RDP와 VNC를 창에 열고 SSH 터널로

### 데이터와 마이그레이션

- **암호화된 WebDAV 동기화**: 동기화 암호로 데이터를 로컬에서 암호화한 후 업로드합니다. **동기화 암호는 기기에만 저장되며, 분실하면 원격 데이터를 복호화할 수 없습니다. WebDAV 비밀번호는 연결 인증에만 사용됩니다.**
- **기록 백업**을 생성, 복원, 개별 삭제할 수 있으며 현재 동기화 스냅샷을 덮어쓰지 않습니다.
- **로컬 암호화 백업**으로 전체 설정을 내보내고 다른 기기에서 가져올 수 있습니다.
- **다양한 형식 가져오기**를 지원합니다: OpenSSH, PuTTY, KiTTY, MobaXterm, NextSSH

<a name="operating-systems"></a>

### 운영 체제 감지

연결 후 운영 체제를 감지하고 호스트 카드에 시스템 아이콘과 버전을 표시합니다.

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

### 보안

- **암호화 금고**에 모든 자격 증명. 시작 비밀번호는 선택
- **호스트 키 검증**. 연결마다, 홉마다
- **WebDAV 동기화**. 올리기 전에 동기화 암호로 암호화. 기록 백업은 하나씩 복원·삭제
- **암호화 백업**으로 설정 전체를 다른 기기로
- **활동 로그**가 연결과 변경을 기록

---

<a name="screenshots"></a>

## 스크린샷

### WebDAV 동기화와 기록 백업

<img src="NoxSSH_WebDAV.png" alt="NoxSSH WebDAV 동기화" width="100%">

<img src="NoxSSH_WebDAV_backup.png" alt="NoxSSH WebDAV 기록 백업" width="100%">

### 분할 창과 SFTP

<img src="NoxSSH_SplitPane.png" alt="분할 창과 SFTP" width="100%">

### Windows 원격 데스크톱

<img src="NoxSSH_RDP.png" alt="Windows 원격 데스크톱" width="100%">

### 테마 색상

<img src="NoxSSH_Customizeable.png" alt="모양 설정" width="100%">

---

<a name="getting-started"></a>

## 시작하기

<a name="download"></a>

### 다운로드

플랫폼에 맞는 설치 파일을 [최신 릴리스](https://github.com/DT27/NoxSSH/releases/latest)에서 다운로드하세요:

| 운영 체제 | 아키텍처 | 파일 이름 |
| --------- | -------- | --------- |
| Windows | x64 | `NoxSSH-Setup-v<version>-x64.exe`(설치 프로그램, 권장) 또는 `NoxSSH-v<version>-x64.exe`(포터블) |
| macOS | Apple Silicon / Intel | `NoxSSH-v<version>-arm64.dmg` 또는 `NoxSSH-v<version>-x64.dmg` |
| Linux | x64 | `NoxSSH-v<version>-x64.AppImage` |

[GitHub의 모든 릴리스](https://github.com/DT27/NoxSSH/releases)도 볼 수 있습니다.

### 소스에서 빌드

Node.js 20 이상과 npm이 필요합니다.

```bash
git clone https://github.com/DT27/NoxSSH.git
cd NoxSSH
npm install
npm run dev
```

현재 플랫폼용 릴리스 패키지를 빌드하며 결과는 `dist/`에 저장됩니다:

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
| `Alt+방향키`         | 창 사이 이동 |                |            |

<a name="community"></a>

## 참여하기

- 문제나 기능 요청은 [Issue](https://github.com/DT27/NoxSSH/issues)로 등록해 주세요.
- 버그 수정이나 새 기능은 [Pull Request](https://github.com/DT27/NoxSSH/pulls)로 제출해 주세요.
- 코드를 제출하기 전에 `npm test`와 `npm run build:renderer`를 실행해 주세요.

<a name="contributors"></a>

## 기여자

NoxSSH를 유지하고 개선하는 데 참여한 모든 기여자께 감사드립니다:

<a href="https://github.com/DT27/NoxSSH/graphs/contributors">
  <img alt="NoxSSH 기여자" src="https://contrib.rocks/image?repo=DT27/NoxSSH" />
</a>

CloudTerm 원본 프로젝트의 모든 기여자께도 감사드립니다.

<a name="tech-stack"></a>

## 기술 스택

Electron · React · xterm.js · ssh2 · IronRDP(WebAssembly) · noVNC · Tailwind ·
Vite

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

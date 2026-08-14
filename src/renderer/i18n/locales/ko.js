/**
 * 한국어 (Korean).
 *
 * Korean has one plural form, so every counted string is stored as `_other`
 * alone. Anything missing here falls back to en.js.
 */
export default {
  /* ---- Shared words ---- */
  "common.allFiles": "모든 파일",
  "common.apply": "적용",
  "common.cancel": "취소",
  "common.change": "변경",
  "common.changeEllipsis": "변경…",
  "common.clear": "지우기",
  "common.close": "닫기",
  "common.filter": "필터",
  "common.filtered": "필터됨.",
  "common.keepCurrentColors": "없음(현재 색상 유지)",
  "common.left": "왼쪽",
  "common.loading": "불러오는 중…",
  "common.noFilterMatches": "해당 필터와 일치하는 항목이 없습니다.",
  "common.noMatches": "“{query}”와 일치하는 항목이 없습니다",
  "common.noMatchesTitle": "일치 항목 없음",
  "common.off": "꺼짐",
  "common.remove": "제거",
  "common.reset": "재설정",
  "common.right": "오른쪽",
  "common.save": "저장",
  "common.saveAndApply": "저장 후 적용",
  "common.startFrom": "이것으로 시작",
  "common.working": "처리 중…",

  /* ---- Sidebar ---- */
  "nav.hosts": "호스트",
  "nav.keychain": "키체인",
  "nav.proxies": "프록시",
  "nav.snippets": "스니펫",
  "nav.logs": "로그",
  "nav.settings": "설정",

  /* ---- Hosts ---- */
  "hosts.count_other": "호스트 {count}대",
  "hosts.folderCount_other": "폴더 {count}개",
  "hosts.empty": "아직 호스트가 없습니다",
  "hosts.emptyNote": "서버를 추가하면 시작할 수 있습니다.",
  "hosts.emptyFolder": "아직 아무것도 없습니다",
  "hosts.layout": "카드 레이아웃",
  "hosts.newFolder": "새 폴더",
  "hosts.newHost": "새 호스트",
  "hosts.search": "호스트 검색",
  "hosts.viewGrid": "격자",
  "hosts.viewList": "목록",

  /* ---- Host editor ---- */
  "hosts.editor.titleNew": "새 호스트",
  "hosts.editor.titleEdit": "호스트 편집",
  "hosts.editor.subtitle": "연결 주소, 인증 방식, 접속 후 할 일을 입력하세요.",
  "hosts.editor.thisHostIs": "이 호스트는",
  "hosts.kind.ssh": "SSH",
  "hosts.kind.telnet": "Telnet",
  "hosts.kind.serial": "시리얼",
  "hosts.kind.desktop": "데스크톱",
  "hosts.kind.ipmi": "IPMI",
  "hosts.editor.telnetWarning":
    "Telnet은 암호화되지 않습니다. 로그인 프롬프트에 입력하는 내용을 포함해 전송되는 모든 것이 경로상의 누구에게나 읽힐 수 있습니다. 더 나은 선택이 없을 때만 사용하세요.",
  "hosts.editor.hostname": "호스트 이름 / IP",
  "hosts.editor.hostnameDesktopHint":
    "데스크톱의 주소입니다. 아래 “원격 데스크톱”에서 다른 주소를 지정하지 않으면 이 값이 사용됩니다.",
  "hosts.editor.hostnameIpmiHint":
    "서비스 프로세서의 주소입니다. 아래 “IPMI”에서 다른 주소를 지정하지 않으면 이 값이 사용됩니다.",
  "hosts.editor.port": "포트",
  "hosts.editor.username": "사용자 이름",
  "hosts.editor.authMethod": "인증 방식",
  "hosts.editor.auth.password": "비밀번호",
  "hosts.editor.auth.passwordHint": "저장된 비밀번호로 로그인",
  "hosts.editor.auth.keychain": "키체인",
  "hosts.editor.auth.keychainHint": "앱 키체인의 키 사용",
  "hosts.editor.auth.key": "키",
  "hosts.editor.auth.keyHint": "이 호스트 전용 개인 키를 붙여넣기",
  "hosts.editor.auth.agent": "Agent",
  "hosts.editor.auth.agentHint": "SSH agent가 보유한 키 사용",
  "hosts.editor.sshKey": "SSH 키",
  "hosts.editor.noKeysInKeychain":
    "아직 SSH 키가 없습니다. 먼저 “키체인” 페이지에서 추가하세요.",
  "hosts.editor.selectKey": "키 선택…",
  "hosts.editor.password": "비밀번호",
  "hosts.editor.passwordPlaceholderStored": "저장됨, 비워 두면 유지",
  "hosts.editor.passwordPlaceholder": "••••••••",
  "hosts.editor.showPassword": "비밀번호 표시",
  "hosts.editor.hidePassword": "비밀번호 숨기기",
  "hosts.editor.storedPasswordHint": "이 호스트에 비밀번호가 저장되어 있습니다.",
  "hosts.editor.privateKey": "개인 키",
  "hosts.editor.privateKeyPlaceholderStored": "저장됨, 비워 두면 유지",
  "hosts.editor.privateKeyPlaceholder": "-----BEGIN OPENSSH PRIVATE KEY-----…",
  "hosts.editor.storedPrivateKeyHint": "이 호스트에 개인 키가 저장되어 있습니다.",
  "hosts.editor.keyPassphrase": "키 암호",
  "hosts.editor.keyPassphrasePlaceholder": "키에 암호가 없으면 비워 두세요",
  "hosts.editor.chooseKeyFile": "키 파일 선택…",
  "hosts.editor.optional": "선택 사항",
  "hosts.editor.disclosure.nameAndTags": "이름 및 태그",
  "hosts.editor.displayName": "표시 이름",
  "hosts.editor.displayNameHint": "비워 두면 호스트 이름/IP로 표시됩니다.",
  "hosts.editor.displayNamePlaceholder": "예: 프로덕션 서버",
  "hosts.editor.tags": "태그",
  "hosts.editor.tagsHint":
    "태그는 폴더를 가로지릅니다. 호스트는 폴더 하나에만 속하지만 태그는 원하는 만큼 달 수 있습니다.",
  "hosts.editor.disclosure.connectThrough": "다음을 통해 연결",
  "hosts.editor.connectDirectly": "직접 연결",
  "hosts.editor.jumpHintWith":
    "먼저 이 호스트에 접속한 뒤, 그 위의 채널로 대상에 도달합니다. 세션 내용은 종단 간 암호화되어 점프 호스트는 읽을 수 없습니다.",
  "hosts.editor.jumpHintWithout":
    "이 컴퓨터에서 대상에 직접 갈 수 없으면, 대상에 도달할 수 있는 배스천을 지정하세요.",
  "hosts.editor.disclosure.proxies": "프록시",
  "hosts.editor.proxyHintWith":
    "위의 주소에 도달하도록 해당 프록시를 통해 소켓을 엽니다. 파일, 포트 포워딩, 원격 데스크톱을 포함해 세션의 모든 것이 이 프록시를 통과합니다.",
  "hosts.editor.proxyHintWithout":
    "대상 네트워크에 SOCKS 또는 HTTP 프록시로만 갈 수 있을 때 사용합니다. 프록시는 “프록시” 페이지에서 관리합니다.",
  "hosts.editor.noProxiesSaved": "저장된 프록시가 없습니다. 먼저 “프록시” 페이지에서 추가하세요.",
  "hosts.editor.dialStraightOut": "직접 나가기",
  "hosts.editor.proxyJumpNote":
    "{jump}을(를) 통해 도달합니다. 이 컴퓨터에서 나가는 유일한 연결은 {jump}이므로, 그 프록시 설정이 연결을 엽니다. 점프를 거치지 않으면 여기서 선택한 프록시가 사용됩니다.",
  "hosts.editor.disclosure.runOnConnect": "연결 후 실행",
  "hosts.editor.initHintSsh":
    "셸이 열리자마자 전송되며, 재연결 후에도 다시 전송됩니다. 한 줄에 명령 하나.",
  "hosts.editor.initHintOther":
    "세션이 열리자마자 프롬프트를 기다리지 않고 전송됩니다. 프롬프트 감지가 없으므로, 로그인을 요구하는 장치에서는 로그인 프롬프트에 그대로 입력됩니다.",
  "hosts.editor.initPlaceholderSsh": "cd /srv/app && tmux attach",
  "hosts.editor.initPlaceholderOther": "terminal length 0",
  "hosts.editor.disclosure.monitoring": "모니터링",
  "hosts.editor.watchThisHost": "이 호스트 감시",
  "hosts.editor.watchDesc":
    "앱이 열려 있는 동안 이 호스트가 여전히 응답하는지 주기적으로 확인합니다. 응답이 멈추면 알림이 한 번 뜨고, 복구될 때까지 카드가 오프라인으로 표시됩니다.",
  "hosts.editor.checkPort": "확인할 포트",
  "hosts.editor.checkPortHint":
    "비워 두면 이 호스트가 연결에 쓰는 포트를 사용합니다. 다른 포트를 넣으면 로그인 포트가 아니라 같은 기기의 웹 서비스나 데이터베이스를 감시할 수 있습니다.",
  "hosts.editor.checkPortHintDefault":
    "비워 두면 이 호스트가 연결에 쓰는 포트로 확인합니다.",
  "hosts.editor.checkPortHintDefaultOn":
    "비워 두면 이 호스트가 연결에 쓰는 포트 {port}로 확인합니다.",
  "hosts.editor.monitorSummary": "감시 중",
  "hosts.editor.monitorSummaryWithPort": "포트 {port}에서 감시",
  "hosts.editor.advancedSummary": "레거시 알고리즘 허용됨",
  "hosts.editor.desktopRdp": "RDP",
  "hosts.editor.desktopVnc": "VNC",
  "hosts.editor.bmcSameHost": "호스트와 동일",
  "hosts.editor.aJumpHost": "점프 호스트",
  "hosts.editor.monitoringOffForApp":
    "앱의 모니터링이 꺼져 있어, 이 호스트는 설정만 되고 아직 확인되지 않습니다.",
  "hosts.editor.turnItOn": "지금 켜기",
  "hosts.editor.disclosure.portForwarding": "포트 포워딩",
  "hosts.editor.disclosure.remoteDesktop": "원격 데스크톱",
  "hosts.editor.disclosure.ipmi": "IPMI",
  "hosts.editor.disclosure.advanced": "고급",
  "hosts.editor.allowLegacy": "레거시 알고리즘 허용",
  "hosts.editor.allowLegacyDesc":
    "오래된 서버를 위해 SHA-1, CBC, 3DES를 켭니다. 연결 보안이 약해지므로 핸드셰이크가 실패하지 않으면 꺼 두세요.",
  "hosts.editor.cancel": "취소",
  "hosts.editor.save": "호스트 저장",
  "hosts.editor.create": "호스트 만들기",

  /* ---- Keychain ---- */
  "keychain.count_other": "키 {count}개",
  "keychain.empty": "아직 키가 없습니다",
  "keychain.emptyNote": "생성하거나 가져오면 시작할 수 있습니다.",
  "keychain.helloAdd": "이 PC의 TPM에 보관되는 Windows Hello 키 추가",
  "keychain.helloWaiting": "Windows Hello를 기다리는 중…",
  "keychain.import": "파일 또는 붙여넣기로 기존 키 가져오기",
  "keychain.newKey": "새 키",
  "keychain.search": "키 검색",
  "keychain.editor.titleHello": "Windows Hello 키",
  "keychain.editor.titleEdit": "SSH 키 편집",
  "keychain.editor.titleGenerate": "SSH 키 생성",
  "keychain.editor.titleImport": "SSH 키 가져오기",
  "keychain.editor.subtitleHello":
    "개인 키는 이 PC의 TPM에 있습니다. 이 앱을 포함해 아무도 읽을 수 없습니다.",
  "keychain.editor.subtitle": "키는 앱 키체인에 저장되며 메인 프로세스를 떠나지 않습니다.",
  "keychain.editor.save": "키 저장",
  "keychain.editor.name": "키 이름",
  "keychain.editor.namePlaceholder": "예: 내 GitHub 키",
  "keychain.editor.helloHeld": "Windows Hello가 보관",
  "keychain.editor.helloBody":
    "개인 키는 이 PC의 TPM에 있으며 내보내기, 복사, 백업이 불가능합니다. 이 앱도, 당신도 할 수 없습니다. 연결할 때마다 Windows Hello를 요구합니다.",
  "keychain.editor.helloWarn":
    "이 기기에서만 동작합니다. 다른 곳에 다시 설치하거나 Windows Hello를 재설정하면 영구히 사라집니다. 잠기지 않도록 서버에 다른 키를 남겨 두세요.",
  "keychain.editor.publicKey": "공개 키",
  "keychain.editor.publicKeyOptional": "공개 키(선택)",
  "keychain.editor.publicKeyHelloHint":
    "접속하려는 서버의 ~/.ssh/authorized_keys에 이 줄을 넣으세요.",
  "keychain.editor.publicKeyImportHint": "붙여넣으면 지문과 알고리즘이 기록됩니다.",
  "keychain.editor.publicKeyCopied": "공개 키를 복사했습니다",
  "keychain.editor.copy": "복사",
  "keychain.editor.fingerprint": "지문",
  "keychain.editor.keyType": "키 종류",
  "keychain.editor.typeEd25519": "현대적이고 빠르며 안전함(권장)",
  "keychain.editor.typeEcdsa": "타원 곡선 DSA",
  "keychain.editor.typeRsa": "전통적인 RSA 키",
  "keychain.editor.curveSize": "타원 곡선 길이(비트)",
  "keychain.editor.keySize": "키 길이(비트)",
  "keychain.editor.keySizeHint": "선택 사항입니다. 비워 두면 ssh-keygen이 기본값을 사용합니다.",
  "keychain.editor.comment": "주석",
  "keychain.editor.commentHint": "선택 사항입니다. 키 자체에 기록됩니다.",
  "keychain.editor.commentPlaceholder": "예: user@example.com",
  "keychain.editor.passphrase": "암호",
  "keychain.editor.passphraseGenerateHint": "선택 사항입니다. 생성된 키가 이 암호로 암호화됩니다.",
  "keychain.editor.passphraseGeneratePlaceholder": "암호를 쓰지 않으려면 비워 두세요",
  "keychain.editor.generating": "생성하는 중…",
  "keychain.editor.generate": "키 쌍 생성",
  "keychain.editor.importFromFile": "파일에서 가져오기",
  "keychain.editor.importFromFileHint":
    "id_ed25519 같은 키 파일을 선택하세요. 옆에 있는 .pub 또는 -cert.pub도 함께 읽히며, 이 창을 거치지 않습니다.",
  "keychain.editor.choosing": "선택 중…",
  "keychain.editor.chooseFile": "파일 선택",
  "keychain.editor.chooseAnother": "다른 파일 선택",
  "keychain.editor.pasteInstead": "대신 붙여넣기",
  "keychain.editor.privateKey": "개인 키",
  "keychain.editor.privateKeyFromFile": "{file}에서 개인 키를 읽었습니다",
  "keychain.editor.privateKeyGenerated": "개인 키를 생성했습니다",
  "keychain.editor.privateKeyHeld": "앱이 보관하며, 저장할 때 시스템 키 저장소로 암호화됩니다.",
  "keychain.editor.privateKeyStoredPlaceholder": "저장됨, 비워 두면 기존 키 유지",
  "keychain.editor.hidePrivate": "개인 키 숨기기",
  "keychain.editor.showPrivate": "개인 키 표시",
  "keychain.editor.hidePassphrase": "암호 숨기기",
  "keychain.editor.showPassphrase": "암호 표시",
  "keychain.editor.certificate": "인증서(선택)",
  "keychain.editor.certHintEmpty":
    "CA가 서명하며 맨 키 대신 제시됩니다. *-cert.pub를 붙여넣으세요.",
  "keychain.editor.certNeverExpires": "만료되지 않음",
  "keychain.editor.certExpired": "{date}에 만료됨",
  "keychain.editor.certValidUntil": "{date}까지 유효",
  "keychain.editor.certLogsInAs": "{names}(으)로 로그인",
  "keychain.editor.certAnyUser": "모든 사용자 이름에 유효",
  "keychain.editor.certSummary": "{who} · {expiry} · CA {ca}",
  "keychain.editor.passphraseFileEncrypted":
    "{file}이(가) 암호화되어 있습니다. 암호 없이는 연결할 수 없습니다.",
  "keychain.editor.passphraseStoredHint": "이 키에 암호가 저장되어 있습니다. 비워 두면 유지됩니다.",
  "keychain.editor.passphraseImportHint": "위의 개인 키가 암호화된 경우에만 필요합니다.",
  "keychain.editor.passphraseStoredPlaceholder": "저장됨, 비워 두면 유지",
  "keychain.editor.passphraseNonePlaceholder": "키에 암호가 없으면 비워 두세요",
  "keychain.editor.dangerZone": "위험 구역",
  "keychain.editor.dangerZoneDesc": "삭제하면 되돌릴 수 없습니다. 확실히 한 뒤에 진행하세요.",
  "keychain.editor.delete": "이 키 삭제",

  /* ---- Proxies ---- */
  "proxies.empty": "아직 프록시가 없습니다",
  "proxies.emptyNote":
    "SOCKS 또는 HTTP 프록시를 추가하면 어떤 호스트든 그 경유로 연결할 수 있습니다. " +
    "터미널 세션, SFTP, 포트 포워딩, 원격 데스크톱 모두 해당됩니다.",
  "proxies.newProxy": "새 프록시",
  "proxies.search": "프록시 검색",
  "proxies.editor.titleNew": "새 프록시",
  "proxies.editor.titleEdit": "프록시 편집",
  "proxies.editor.subtitle":
    "접속을 중계할 서버입니다. 호스트가 이를 가리키고, 연결된 뒤에는 각자의 프로토콜을 사용합니다.",
  "proxies.editor.check": "응답 확인",
  "proxies.editor.checking": "확인 중…",
  "proxies.editor.create": "프록시 만들기",
  "proxies.editor.save": "프록시 저장",
  "proxies.editor.speaks": "이 프록시가 사용하는 프로토콜",
  "proxies.editor.address": "프록시 주소",
  "proxies.editor.port": "포트",
  "proxies.editor.name": "이름",
  "proxies.editor.nameHint": "선택 사항입니다. 비워 두면 주소로 표시됩니다.",
  "proxies.editor.namePlaceholder": "예: 사무실 배스천 프록시",
  "proxies.editor.username": "사용자 이름",
  "proxies.editor.usernamePlaceholder": "필요 없으면 비워 두세요",
  "proxies.editor.password": "비밀번호",
  "proxies.editor.passwordStored": "저장됨, 비워 두면 유지",
  "proxies.editor.passwordStoredHint": "이 프록시에 비밀번호가 저장되어 있습니다.",
  "proxies.editor.showPassword": "비밀번호 표시",
  "proxies.editor.hidePassword": "비밀번호 숨기기",
  "proxies.editor.ident": "Ident",
  "proxies.editor.identHint":
    "SOCKS4 사용자 ID로 평문 전송됩니다. 대부분의 프록시는 무시하므로, 상대가 검사하지 않으면 비워 두세요.",
  "proxies.editor.identPlaceholder": "보통 비워 둠",
  "proxies.editor.opening": "프록시에 연결하는 중…",
  "proxies.editor.optional": "선택 사항",
  "proxies.editor.reachedThrough": "다음 프록시를 통해 도달",
  "proxies.editor.viaHintWith":
    "먼저 그 프록시에 접속한 뒤 이 프록시에 도달합니다. 각 홉은 다음 홉만 알며, 원격은 경로의 마지막 홉을 봅니다.",
  "proxies.editor.viaHintWithout":
    "이 컴퓨터에서 해당 프록시에 직접 갈 수 없으면, 그곳에 도달할 수 있는 프록시를 지정하세요.",
  "proxies.editor.dialFromHere": "이 컴퓨터에서 직접 접속",
  "proxies.editor.advanced": "고급",
  "proxies.editor.remoteDns": "프록시가 호스트 이름을 해석하게 함",
  "proxies.editor.remoteDnsSocks4":
    "주소 대신 호스트 이름을 보냅니다. SOCKS4a가 추가한 기능입니다. 호스트 이름을 받지 못하는 아주 오래된 프록시에서만 끄세요.",
  "proxies.editor.remoteDnsDesc":
    "이 컴퓨터에서 DNS를 하지 않으므로 여기에서는 어떤 호스트에 가는지 알지 못하고, 분할 네트워크는 해석 가능한 쪽에서 해석됩니다. 프록시가 호스트 이름을 거부하면 끄세요.",
  "proxies.editor.timeout": "제한 시간",
  "proxies.editor.timeoutHint":
    "프록시가 이 시간 안에 연결을 수락하고 응답해야 합니다. 세션 자체는 이것으로 끊기지 않습니다.",
  "proxies.editor.seconds": "초",

  /* ---- Snippets ---- */
  "snippets.count_other": "스니펫 {count}개",
  "snippets.empty": "아직 스니펫이 없습니다",
  "snippets.emptyNote": "모든 기기에서 반복해 치는 명령을 저장해 두세요.",
  "snippets.newPackage": "새 패키지",
  "snippets.newSnippet": "새 스니펫",
  "snippets.nothingShown": "표시할 내용이 없습니다",
  "snippets.search": "스니펫 검색",
  "snippets.showing": "표시 중: {kind}",
  "snippets.kind.all": "전체",
  "snippets.kind.command": "명령만",
  "snippets.kind.package": "패키지만",
  "snippets.editor.titleNew": "새 스니펫",
  "snippets.editor.titleEdit": "스니펫 편집",
  "snippets.editor.titleNewPackage": "새 패키지",
  "snippets.editor.titleEditPackage": "패키지 편집",
  "snippets.editor.subtitle": "패널에 두고 세션에 넣을 수 있는 한 줄 명령입니다.",
  "snippets.editor.subtitlePackage": "순서대로 세션에 보내는 명령 모음입니다.",
  "snippets.editor.add": "스니펫 추가",
  "snippets.editor.addPackage": "패키지 추가",
  "snippets.editor.kind": "종류",
  "snippets.editor.kindCommand": "명령",
  "snippets.editor.kindPackage": "패키지",
  "snippets.editor.kindCommandHint": "프롬프트에 넣는 한 덩어리의 텍스트입니다.",
  "snippets.editor.kindPackageHint":
    "설정한 순서대로 단계가 실행됩니다. 단계는 여기서 작성하거나 라이브러리에서 고를 수 있습니다.",
  "snippets.editor.name": "이름",
  "snippets.editor.namePlaceholder": "예: nginx 오류 추적",
  "snippets.editor.namePlaceholderPackage": "예: 배포 후 재시작",
  "snippets.editor.command": "명령",
  "snippets.editor.commandHint":
    "물어볼 내용은 이중 중괄호로 감싸세요. 예: {{service}}.",
  "snippets.editor.willAskFor": "물어볼 항목",
  "snippets.editor.description": "설명",
  "snippets.editor.descriptionHint": "선택 사항입니다. 이름과 함께 검색됩니다.",
  "snippets.editor.descriptionPlaceholder": "무엇을 하는지, 또는 언제 쓰는지",
  "snippets.editor.tags": "태그",
  "snippets.editor.tagsHint": "쉼표로 구분합니다.",
  "snippets.editor.availableOn": "사용 가능",
  "snippets.editor.allHosts": "모든 호스트",
  "snippets.editor.specificHosts": "지정 호스트",
  "snippets.editor.noHostWarning": "호스트를 선택하지 않으면 이 스니펫은 어디에도 나타나지 않습니다.",
  "snippets.editor.runImmediately": "삽입 직후 바로 실행",
  "snippets.editor.runImmediatelyCommand":
    "대신 Enter를 누릅니다. 끄면 명령을 프롬프트에 두고 확인한 뒤 실행할 수 있습니다.",
  "snippets.editor.runImmediatelyPackage":
    "대신 Enter를 눌러 전체 단계를 시작합니다. 끄면 프롬프트에 두고 확인한 뒤 실행할 수 있습니다.",

  "folders.editor.titleNew": "새 폴더",
  "folders.editor.titleEdit": "폴더 편집",
  "folders.editor.subtitle":
    "폴더는 호스트를 묶는 용도입니다. 폴더를 삭제해도 안의 호스트는 삭제되지 않습니다.",
  "folders.editor.create": "폴더 만들기",
  "folders.editor.save": "폴더 저장",
  "folders.editor.name": "폴더 이름",
  "folders.editor.namePlaceholder": "예: AWS 서버",

  /* ---- Logs ---- */
  "logs.blurbStart":
    "이 컴퓨터에서 만든 모든 연결과 변경된 모든 기록이며, 최신이 앞에 옵니다. 로그인한 시스템 계정에 연결해 기록되며",
  "logs.blurbEnd":
    ", 조작자가 다른 사람일 때만 해당 줄에 표시됩니다. 비밀번호와 키 내용은 절대 기록하지 않습니다.",
  "logs.categoryConnection": "연결",
  "logs.categoryData": "변경",
  "logs.categoryFiles": "파일",
  "logs.categorySecurity": "보안",
  "logs.empty": "아직 기록이 없습니다",
  "logs.emptyNote": "연결과 변경이 생기면 여기에 나타납니다.",
  "logs.export": "JSON으로 내보내기",
  "logs.filterAll": "전체",
  "logs.filterAria": "활동 로그 필터",
  "logs.noMatches": "해당 필터와 일치하는 기록이 없습니다",
  "logs.noMatchesNote": "다른 분류를 고르거나 필터 상자를 비우세요.",
  "logs.problemsOnly": "문제만",
  "logs.reading": "로그를 읽는 중…",
  "logs.refresh": "새로 고침",

  /* ---- New session tab ---- */
  "newTab.title": "새 세션",
  "newTab.subtitle": "호스트를 고르거나 주소를 직접 입력해 연결하세요.",
  "newTab.searchPlaceholder": "호스트 검색, 또는 주소 입력…",
  "newTab.recent": "최근 사용",
  "newTab.allHosts": "모든 호스트",
  "newTab.notSaved": "저장되지 않음",
  "newTab.notSavedNote": "저장되지 않았습니다. 연결 시 로그인 정보를 묻습니다.",
  "newTab.connectTo": "연결 대상",
  "newTab.hintNavigate": "이동",
  "newTab.hintConnect": "연결",
  "newTab.hintClose": "탭 닫기",

  /* ---- Title bar ---- */
  "titleBar.reload": "다시 로드",
  "titleBar.devTools": "개발자 도구",
  "titleBar.minimize": "최소화",
  "titleBar.maximize": "최대화",
  "titleBar.exit": "종료",
  "titleBar.rename": "이름 바꾸기…",
  "titleBar.renameAria": "{name} 이름 바꾸기",
  "titleBar.renameGroup": "그룹 이름 바꾸기…",
  "titleBar.renameGroupAria": "그룹 {name} 이름 바꾸기",
  "titleBar.useHostName": "호스트 이름 다시 사용",
  "titleBar.colour": "색상",
  "titleBar.removeFromGroup": "그룹에서 빼기",
  "titleBar.newGroup": "이 탭으로 새 그룹 만들기",
  "titleBar.moveToGroup": "“{group}”(으)로 이동",
  "titleBar.duplicate": "복제",
  "titleBar.reconnect": "다시 연결",
  "titleBar.reconnectAll": "모두 다시 연결",
  "titleBar.disconnect": "연결 끊기",
  "titleBar.disconnectAll": "모두 연결 끊기",
  "titleBar.closeTab": "탭 닫기",
  "titleBar.closeOthers": "다른 탭 닫기",
  "titleBar.closeRight": "오른쪽 탭 닫기",
  "titleBar.ungroup": "그룹 해제",
  "titleBar.closeGroupTabs_other": "탭 {count}개 모두 닫기",

  /* ---- Monitoring vocabulary ---- */
  "monitor.every30s": "30초",
  "monitor.every1min": "1분",
  "monitor.every5min": "5분",
  "monitor.every15min": "15분",
  "monitor.wait5s": "5초",
  "monitor.wait10s": "10초",
  "monitor.wait20s": "20초",
  "monitor.wait30s": "30초",
  "monitor.onceFailed": "1회",
  "monitor.twiceFailed": "2회",
  "monitor.thriceFailed": "3회",
  "monitor.stateOnline": "응답함",
  "monitor.stateOffline": "응답 없음",
  "monitor.stateProblem": "확인할 수 없음",
  "monitor.stateUnknown": "아직 확인하지 않음",
  "monitor.unsupportedSerial": "시리얼 콘솔에는 확인할 네트워크 주소가 없습니다.",
  "monitor.unsupportedJump":
    "이 호스트는 점프 호스트를 통해 접근하므로, 이 컴퓨터에서 직접 확인할 경로가 없습니다. 점프 호스트를 감시하세요.",
  "monitor.justNow": "방금",
  "monitor.minutesAgo": "{count}분 전",
  "monitor.hoursAgo": "{count}시간 전",
  "monitor.daysAgo": "{count}일 전",
  "monitor.notAnswering": "응답 없음",
  "monitor.describeOffline": "{reason}, {when}부터",
  "monitor.describeOnline": "응답함, {when}에 확인",
  "monitor.describeOnlineLatency": "응답함, {latency}ms, {when}에 확인",
  "monitor.describeUnknown": "아직 확인하지 않음",

  /* ---- App palette editor ---- */
  "appColors.subtitle":
    "앱 전체는 이 여섯 가지 표면 색으로 이루어집니다. 창 색을 고르면 나머지가 자동으로 파생되며, 항목별로 직접 지정할 수도 있습니다.",
  "appColors.surfaces": "표면",
  "appColors.derive": "한 가지 색에서 파생",
  "appColors.deriveHint": "여섯 단계를 모두 다시 쓰고 앱 고유의 단계 간격을 유지합니다",
  "appColors.base": "창",
  "appColors.baseHint": "전체 인터페이스의 바탕색",
  "appColors.raised": "패널",
  "appColors.raisedHint": "카드, 대화 상자, 사이드바",
  "appColors.control": "컨트롤",
  "appColors.controlHint": "버튼, 입력란과 그 테두리",
  "appColors.hover": "호버",
  "appColors.hoverHint": "포인터가 올라간 컨트롤",
  "appColors.active": "누름",
  "appColors.activeHint": "사용 중인 컨트롤과 구분선",
  "appColors.muted": "보조 텍스트",
  "appColors.mutedHint": "보조 레이블과 자리 표시 텍스트",

  /* ---- Terminal palette editor ---- */
  "termColors.title": "사용자 지정 터미널 테마",
  "termColors.subtitle": "항목별로 직접 고르거나, 내장 테마에서 시작해 필요한 부분만 바꾸세요.",
  "termColors.groupBase": "기본",
  "termColors.groupAnsi": "ANSI 색상",
  "termColors.background": "배경",
  "termColors.foreground": "텍스트",
  "termColors.cursor": "커서",
  "termColors.selection": "선택 영역",
  "termColors.black": "검정",
  "termColors.red": "빨강",
  "termColors.green": "초록",
  "termColors.yellow": "노랑",
  "termColors.blue": "파랑",
  "termColors.magenta": "자홍",
  "termColors.cyan": "청록",
  "termColors.white": "흰색",

  /* ---- OpenSSH import ---- */
  "import.title": "OpenSSH에서 가져오기",
  "import.desc":
    "~/.ssh/config와 ~/.ssh/known_hosts를 읽어 호스트, 포트 포워딩, 신뢰한 키를 여기로 가져옵니다.",
  "import.nothingFound":
    "{dir}에서 아무것도 찾지 못했습니다. 파일을 직접 선택할 수는 있습니다.",
  "import.scan": "~/.ssh 검사",
  "import.scanning": "검사 중…",
  "import.scanFailed": "SSH 설정을 읽을 수 없습니다: {reason}",
  "import.chooseConfigTitle": "SSH 설정 파일 선택",
  "import.trustedKeys": "신뢰한 호스트 키",
  "import.statusPresent": "이미 추가됨",
  "import.statusConflict": "저장된 키와 다름",
  "import.selectedOf": "{selected} / {count} 선택됨",
  "import.keyNote": "키 {name}",
  "import.keyNoteState": "키 {name}({state})",
  "import.included": "추가로 {count}개",
  "import.nothingToImport": "이 파일들에 가져올 내용이 없습니다.",
  "import.copyKeys": "이 호스트가 참조하는 개인 키도 복사",
  "import.copyKeysDesc":
    "각 IdentityFile이 키체인에 읽혀 시스템 키 저장소로 암호화됩니다. 선택하지 않으면 " +
    "가져온 호스트는 SSH agent를 사용하도록 설정됩니다.",
  "import.importing": "가져오는 중…",
  "import.importSelected": "선택한 {count}개 가져오기",
  "import.nothingSelected": "선택한 항목이 없습니다",
  "import.imported": "{what}을(를) 가져왔습니다",
  "import.nothingNew": "새로 가져올 내용이 없습니다",
  "import.failed": "가져오기 실패: {reason}",
  "import.hostKeyCount_other": "호스트 키 {count}개",
  "import.report":
    "호스트 {hosts}대, 키 {keys}개, 호스트 키 {hostKeys}개를 가져왔습니다.",
  "import.reportSkipped": "{count}개는 이미 있습니다.",
  "import.reportRelayed": "{count}개는 점프 호스트를 통해 연결하도록 설정했습니다.",
  "import.skipHashed": "해시됨 {count}개",
  "import.skipPatterns": "와일드카드 {count}개",
  "import.skipMarkers": "인증서 또는 폐기됨 {count}개",
  "import.skipMalformed": "읽을 수 없음 {count}개",
  "import.skipped": "{what} 건너뜀",

  /* ---- Import from other apps ---- */
  "appImport.title": "다른 앱에서 가져오기",
  "appImport.desc":
    "호스트, 포트 포워딩, 폴더, 시리얼 또는 원격 데스크톱 설정이 함께 들어옵니다. 비밀번호는 가져오지 않습니다. " +
    "각 앱이 자체 방식으로 암호화해 저장하기 때문입니다.",
  "appImport.checking": "확인 중…",
  "appImport.notFound": "찾을 수 없음",
  "appImport.sessionCount_other": "저장된 세션 {count}개",
  "appImport.import": "가져오기",
  "appImport.chooseFile": "MobaXterm 파일 선택…",
  "appImport.choosePortable": "휴대용 설치인가요? MobaXterm 파일을 선택하세요…",
  "appImport.chooseFileHint":
    "휴대용 MobaXterm.ini, 또는 내보낸 .mxtsessions 파일",
  "appImport.chooseFileTitle": "MobaXterm.ini 또는 .mxtsessions 파일 선택",
  "appImport.fileKind": "MobaXterm 세션",
  "appImport.scanFailed": "{source} 세션을 읽을 수 없습니다: {reason}",
  "appImport.sessionsOf": "{app} 세션",
  "appImport.nothingIn": "{app}에 가져올 내용이 없습니다.",
  "appImport.inFolder": "{folder}에 있음",
  "appImport.keyEncrypted": "암호로 보호됨",
  "appImport.keyNeedsConversion": "변환 필요",
  "appImport.keyUnreadable": "읽을 수 없음",
  "appImport.copyKeysDesc":
    "각 키 파일이 키체인에 읽혀 시스템 키 저장소로 암호화됩니다. 선택하지 않으면 " +
    "가져온 호스트는 SSH agent를 사용하도록 설정됩니다.",
  "appImport.chooseNextsshTitle": "NextSSH 백업 파일 선택",
  "appImport.copyNextsshKeysDesc":
    "백업의 개인 키가 키체인에 쓰이고 시스템 키 저장소로 암호화됩니다. 선택하지 않으면 비밀번호가 있는 호스트는 그 비밀번호를 쓰고, 나머지는 SSH agent를 사용합니다.",
  "appImport.nextsshFileKind": "NextSSH 백업",
  "appImport.nextsshHint": "백업 파일 선택",
  "appImport.report": "호스트 {hosts}대를 가져왔습니다",

  /* ---- Settings navigation ---- */
  "settings.nav.aria": "설정 분류",
  "settings.nav.general": "일반",
  "settings.nav.appearance": "모양",
  "settings.nav.terminal": "터미널",
  "settings.nav.assistant": "AI 도우미",
  "settings.nav.monitoring": "모니터링",
  "settings.nav.logging": "로깅",
  "settings.nav.security": "보안",
  "settings.nav.account": "WebDAV 동기화",
  "settings.nav.backup": "백업 / 가져오기",
  "settings.nav.about": "정보",

  /* ---- Settings: General ---- */
  "settings.general.title": "일반",
  "settings.general.desc": "앱이 시작될 때의 동작입니다.",
  "settings.general.language": "언어",
  "settings.general.languageDesc":
    "앱 자체 텍스트에 쓰는 언어입니다. 터미널 출력과 서버가 인쇄하는 내용은 그대로 둡니다.",
  "settings.general.languageChanged": "언어가 {language}(으)로 바뀌었습니다",
  "settings.general.startup": "로그인 시 시작",
  "settings.general.startupDesc": "이 컴퓨터에 로그인할 때 CloudTerm을 자동으로 엽니다",
  "settings.general.startupOn": "로그인하면 CloudTerm이 자동으로 열립니다",
  "settings.general.startupOff": "로그인해도 CloudTerm이 더 이상 자동으로 열리지 않습니다",
  "settings.general.startupFailed": "해당 설정을 바꿀 수 없습니다",
  "settings.general.startupUnknown": "앱이 시스템 시작 시 켜지는지 읽을 수 없습니다",
  "settings.general.restore": "세션 복원",
  "settings.general.restoreDesc":
    "앱을 닫을 때 열려 있던 탭을 다시 열고 해당 호스트에 다시 연결합니다",

  /* ---- Settings: Appearance ---- */
  "settings.appearance.title": "모양",
  "settings.appearance.desc": "앱 자체의 모습입니다.",
  "settings.appearance.theme": "테마",
  "settings.appearance.themeDesc": "선호하는 인터페이스 테마를 선택하세요",
  "settings.appearance.themeCustomDesc":
    "앱이 직접 만든 배색을 쓰고 있습니다. 아래에서 출발점을 고르거나 항목별로 직접 설정할 수 있습니다.",
  "settings.appearance.theme.light": "라이트",
  "settings.appearance.theme.dark": "다크",
  "settings.appearance.theme.system": "시스템 따름",
  "settings.appearance.theme.custom": "사용자 지정",
  "settings.appearance.themeToast.light": "라이트 모드",
  "settings.appearance.themeToast.dark": "다크 모드",
  "settings.appearance.themeToast.system": "시스템 따름",
  "settings.appearance.themeToast.custom": "사용자 지정",
  "settings.appearance.themeChanged": "테마가 {theme}(으)로 바뀌었습니다",
  "settings.appearance.appColors": "앱 배색",
  "settings.appearance.appColorsDesc":
    "출발점으로 쓸 배색입니다. 앱의 모든 표면이 이로부터 파생됩니다.",
  "settings.appearance.appColorsChanged": "앱 배색이 {palette}(으)로 바뀌었습니다",
  "settings.appearance.yours": "내 배색",
  "settings.appearance.customColors": "사용자 지정 색상",
  "settings.appearance.customColorsDesc":
    "창, 패널, 컨트롤, 텍스트 색을 직접 설정합니다",
  "settings.appearance.editColors": "색상 편집",
  "settings.appearance.colorsApplied": "배색을 적용했습니다",
  "settings.appearance.showLogo": "로고 표시",
  "settings.appearance.showLogoDesc":
    "제목 표시줄의 로고입니다. 끄면 그 공간이 탭 막대에 주어집니다.",
  "settings.appearance.showLogoAria": "제목 표시줄에 로고 표시",
  "settings.appearance.logoShown": "로고를 표시했습니다",
  "settings.appearance.logoHidden": "로고를 숨겼습니다",
  "settings.appearance.customLogo": "사용자 지정 로고",
  "settings.appearance.customLogoSet":
    "CloudBlast 로고 대신 내 이미지를 사용합니다.",
  "settings.appearance.customLogoDesc":
    "CloudBlast 로고 대신 내 이미지를 사용합니다. PNG, JPG, GIF, " +
    "WebP, SVG, BMP 또는 ICO, 최대 512KB.",
  "settings.appearance.choosing": "선택 중…",
  "settings.appearance.chooseImage": "이미지 선택",
  "settings.appearance.logoUnreadable": "해당 이미지를 읽을 수 없습니다",
  "settings.appearance.logoSet": "로고를 {name}(으)로 설정했습니다",
  "settings.appearance.logoCleared": "CloudBlast 로고로 되돌렸습니다",
  "settings.appearance.position": "위치",
  "settings.appearance.positionDesc":
    "로고가 제목 표시줄의 어느 끝에 있을지: 메뉴 버튼 옆, 또는 창 버튼 쪽.",
  "settings.appearance.positionAria": "로고 위치",
  "settings.appearance.logoMovedLeft": "로고를 왼쪽으로 옮겼습니다",
  "settings.appearance.logoMovedRight": "로고를 오른쪽으로 옮겼습니다",

  /* ---- Settings: Terminal ---- */
  "settings.terminal.title": "터미널",
  "settings.terminal.desc": "세션 안 셸의 모습과, 무엇을 남길지입니다.",
  "settings.terminal.font": "글꼴",
  "settings.terminal.fontAria": "터미널 글꼴",
  "settings.terminal.fontDesc":
    "이 컴퓨터에 실제로 설치된 글꼴만 나열됩니다. JetBrains Mono는 앱과 함께 제공됩니다.",
  "settings.terminal.fontMissing":
    "이 글꼴이 더 이상 설치되어 있지 않아 터미널이 JetBrains Mono로 되돌아갔습니다.",
  "settings.terminal.fontBundled": "내장",
  "settings.terminal.fontNotInstalled": "설치되지 않음",
  "settings.terminal.size": "글자 크기",
  "settings.terminal.sizeAria": "글자 크기",
  "settings.terminal.sizeDesc":
    "열린 모든 세션에 적용됩니다. 각 세션이 다시 배치되고 새 창 크기를 원격에 알립니다.",
  "settings.terminal.weight": "글자 굵기",
  "settings.terminal.weightDesc":
    "굵은 글씨는 대비를 유지합니다. 여기 설정보다 항상 300 더 무겁게 그려집니다.",
  "settings.terminal.weightAria": "글자 굵기",
  "settings.terminal.lineHeight": "줄 간격",
  "settings.terminal.lineHeightAria": "줄 간격",
  "settings.terminal.lineHeightDesc":
    "글자 크기의 배수입니다. 줄이 높을수록 행 수가 줄며, 이 점이 원격에 전달됩니다.",
  "settings.terminal.letterSpacing": "자간",
  "settings.terminal.letterSpacingAria": "자간",
  "settings.terminal.letterSpacingDesc":
    "각 문자 칸에 더해집니다. 음수면 터미널에 너무 헐거운 글꼴을 조입니다.",
  "settings.terminal.ligatures": "합자",
  "settings.terminal.ligaturesDesc":
    "->와 != 같은 조합을 한 글립으로 그립니다. 이를 그릴 수 없는 GPU 렌더링을 끄므로, " +
    "출력이 매우 빽빽한 세션은 스크롤이 덜 매끄러울 수 있습니다.",
  "settings.terminal.ligaturesNone":
    "{font}에는 합자가 없어 이 설정은 아무 변화도 주지 않습니다. " +
    "JetBrains Mono, Cascadia Code, Fira Code에는 합자가 있습니다.",
  "settings.terminal.thisFont": "이 글꼴",
  "settings.terminal.cursor": "커서",
  "settings.terminal.cursorAria": "커서 모양",
  "settings.terminal.cursorDesc": "셸이 입력을 기다리는 곳의 커서 모습입니다.",
  "settings.terminal.cursor.bar": "세로선",
  "settings.terminal.cursor.block": "블록",
  "settings.terminal.cursor.underline": "밑줄",
  "settings.terminal.blink": "커서 깜박임",
  "settings.terminal.scrollback": "스크롤백 버퍼",
  "settings.terminal.scrollbackAria": "스크롤백 줄 수",
  "settings.terminal.scrollbackDesc":
    "각 세션이 창 위쪽에 남겨 두는 줄 수입니다. 스크롤백 검색은 이 줄을 모두 검색하며, " +
    "각 줄은 서버가 아니라 이 창의 메모리를 씁니다.",
  "settings.terminal.smoothScroll": "부드러운 스크롤",
  "settings.terminal.smoothScrollAria": "부드러운 스크롤 시간",
  "settings.terminal.smoothScrollDesc":
    "마우스 휠과 트랙패드 스크롤이 멈추는 데 걸리는 시간입니다. " +
    "끄면 조작에 즉시 반응합니다.",
  "settings.terminal.smoothScrollMs": "{value}밀리초",
  "settings.terminal.links": "링크 열기",
  "settings.terminal.linksDesc":
    "세션에 인쇄된 URL을 클릭하면 브라우저에서 열립니다. {modifier}를 함께 누르도록 하는 것은 편집기의 방식입니다. " +
    "URL 아래 텍스트를 누르려다 세션 도중에 브라우저가 뜨는 일을 막습니다.",
  "settings.terminal.link.click": "클릭",
  "settings.terminal.link.modifier": "{modifier} + 클릭",
  "settings.terminal.reset": "기본값으로 되돌리기",
  "settings.terminal.resetAlready": "위의 항목이 이미 모두 기본값입니다.",
  "settings.terminal.resetDesc":
    "글꼴, 간격, 커서, 스크롤백, 부드러운 스크롤, 링크 클릭 방식을 재설정합니다. 배색은 그대로 둡니다.",
  "settings.terminal.resetDone": "터미널 타이포그래피를 재설정했습니다",
  "settings.terminal.colors": "터미널 배색",
  "settings.terminal.colorsDesc": "터미널 배색을 고르거나 직접 맞추세요",
  "settings.terminal.custom": "사용자 지정",
  "settings.terminal.customTheme": "사용자 지정 테마",
  "settings.terminal.customThemeDesc": "배경, 텍스트, 커서, ANSI 색을 직접 설정합니다",
  "settings.terminal.themeChanged": "터미널 테마가 {theme}(으)로 바뀌었습니다",
  "settings.terminal.customApplied": "사용자 지정 터미널 테마를 적용했습니다",

  /* ---- Settings: Assistant ---- */
  "settings.assistant.title": "AI 도우미",
  "settings.assistant.desc":
    "도우미는 터미널을 읽고, 이미 열어 둔 연결을 통해 서버에서 작업합니다. " +
    "저장된 비밀번호나 키는 절대 보지 않습니다.",
  "settings.assistant.loading": "도우미 설정을 불러오는 중…",
  "settings.assistant.agent": "에이전트",
  "settings.assistant.agentDesc":
    "어떤 코딩 에이전트가 답할지: 이 컴퓨터에 설치된 것, 중계, 또는 직접 돌리는 모델. 바꾸면 새 대화가 시작됩니다.",
  "settings.assistant.provider.claudeCode": "Anthropic, 내 계정 사용.",
  "settings.assistant.provider.codex": "OpenAI, 내 계정 사용.",
  "settings.assistant.provider.opencode": "오픈 소스, 설정한 제공자 사용.",
  "settings.assistant.provider.relayName": "중계",
  "settings.assistant.provider.relay":
    "OpenAI 호환 중계를 사용합니다. Claude Code / Codex / OpenCode를 설치할 필요가 없습니다.",
  "settings.assistant.provider.grok": "xAI, 내 계정 사용.",
  "settings.assistant.provider.local":
    "내 모델: LM Studio, Ollama, vLLM.",
  "settings.assistant.provider.unavailable": "이 빌드에서는 아직 제공되지 않습니다.",
  "settings.assistant.relayBaseUrl": "중계 주소",
  "settings.assistant.relayModel": "기본 모델",
  "settings.assistant.relayModelManual": "직접 입력…",
  "settings.assistant.relayNote":
    "OpenAI 호환 엔드포인트만 넣으면 됩니다. 예: https://example.com/v1. 로컬 CLI는 필요 없습니다.",
  "settings.assistant.relayModelsFetch": "모델 가져오기",
  "settings.assistant.relayModelsFetching": "가져오는 중…",
  "settings.assistant.relayModelsLoaded": "모델 {count}개를 가져왔습니다",
  "settings.assistant.relayModelsEmpty":
    "중계가 모델 목록을 반환하지 않았습니다. 모델 이름을 직접 입력할 수 있습니다.",
  "settings.assistant.relayModelsFailed": "모델을 가져오지 못했습니다. 주소와 키를 확인하세요.",
  "settings.assistant.accountRelay":
    "중계를 통해 모델을 호출합니다. 주소와 API 키를 넣으면 되며, 로컬 에이전트는 필요 없습니다.",
  "settings.assistant.endpoint": "서버 주소",
  "settings.assistant.endpointDesc":
    "로컬 모델 서버가 수신하는 주소입니다. OpenAI API를 말하는 서버면 됩니다.",
  "settings.assistant.endpointNote":
    "LM Studio: http://localhost:1234/v1. Ollama: " +
    "http://localhost:11434/v1. llama.cpp: http://localhost:8080/v1.",
  "settings.assistant.endpointChecking": "해당 주소에 어떤 모델이 있는지 묻는 중...",
  "settings.assistant.endpointFound_other": "응답함, 고를 수 있는 모델 {count}개.",
  "settings.assistant.endpointNone":
    "해당 주소에서 아무 응답이 없습니다. 서버가 실행 중인지, API가 켜져 있는지 확인하세요.",
  "settings.assistant.commandMode": "명령이 실행되는 곳",
  "settings.assistant.commandMode.terminal": "내 터미널에서",
  "settings.assistant.commandMode.background": "백그라운드에서",
  "settings.assistant.commandMode.terminal.note":
    "보고 있는 세션에 명령이 입력되므로 " +
    "실행을 지켜볼 수 있고 출력은 스크롤백에 남습니다. 해당 셸의 기록에 들어가며, " +
    "도우미는 종료 코드가 아니라 화면에서 결과를 읽습니다.",
  "settings.assistant.commandMode.background.note":
    "보이지 않는 별도 채널에서 명령이 실행됩니다. 더 깔끔하고 " +
    "도우미가 실제 종료 코드와 깨끗한 출력을 받지만, 무슨 일이 있었는지는 전언에 의존합니다.",
  "settings.assistant.approval": "실행 전 묻기",
  "settings.assistant.approval.always": "모든 작업",
  "settings.assistant.approval.writes": "변경 작업만",
  "settings.assistant.approval.never": "묻지 않음",
  "settings.assistant.approval.always.note":
    "파일이나 터미널 읽기를 포함해 모든 도구 호출이 확인을 기다립니다. " +
    "안전하지만, 긴 조사는 클릭이 많아집니다.",
  "settings.assistant.approval.writes.note":
    "읽기는 자유롭게 진행됩니다. 시스템을 바꾸는 작업은 멈추고 " +
    "정확한 명령과 실행할 호스트를 보여 줍니다.",
  "settings.assistant.approval.never.note":
    "데이터를 지우거나 서비스를 재시작하는 명령을 포함해 아무 작업도 승인을 기다리지 않습니다. " +
    "호스트를 망가뜨려도 감당할 수 있을 때만 쓰세요.",
  "settings.assistant.localTools": "이 컴퓨터에서 도구 사용 허용",
  "settings.assistant.localToolsDesc":
    "도우미가 로컬 파일을 읽고 쓰고 로컬 명령을 실행할 수 있습니다. 기본은 꺼짐입니다. " +
    "이 패널은 서버 관리용이며, 내 기기는 그보다 훨씬 넓은 범위입니다.",
  "settings.assistant.allowList": "승인 없이 실행할 수 있는 명령",
  "settings.assistant.allowListDesc":
    "한 줄에 하나, 앞의 완전한 단어로 맞춥니다. 파이프, 리다이렉트, 세미콜론, " +
    "치환, 둘째 줄이 있으면 무엇이로 시작하든 반드시 묻습니다.",
  "settings.assistant.allowListNote": "승인 방식이 “{mode}”일 때만 적용됩니다.",
  "settings.assistant.blockList": "절대 실행하지 않을 명령",
  "settings.assistant.blockListDesc":
    "한 줄에 하나입니다. 이 명령은 묻지 않고 바로 거부되며, “묻지 않음”을 포함한 모든 승인 모드에서 그렇습니다. " +
    "도우미가 자체 채널에서 실행하든 터미널에 입력하든 마찬가지입니다. 인자도 셉니다. “rm -rf”는 " +
    "“rm -fr”, “rm -r -f”, “sudo /bin/rm --recursive --force”도 막습니다.",
  "settings.assistant.blockListEmpty": "입력란을 비우면 아무 명령도 막지 않습니다.",
  "settings.assistant.blockListWarning":
    "실수 방지용 가드레일이지 보안 통제가 아닙니다. " +
    "셸에서 같은 명령을 쓰는 방법이 너무 많아 어떤 목록도 전부 덮을 수 없으므로, 중요한 작업은 승인을 켜 두세요.",
  "settings.assistant.saveList": "목록 저장",
  "settings.assistant.restoreDefaults": "기본값 복원",
  "settings.assistant.quickPrompts": "빠른 질문",
  "settings.assistant.quickPromptsDesc":
    "대화가 비어 있을 때 패널이 이 질문들을 원클릭 버튼으로 만듭니다. 한 줄에 하나. " +
    "기본값은 없습니다. 진짜 쓸모 있는 것은 매주 자기 기기에게 묻는 질문이기 때문입니다.",
  "settings.assistant.quickPromptsPlaceholder":
    "디스크를 무엇이 채우고 있나요?\n지난 배포는 왜 실패했나요?",
  "settings.assistant.quickPromptsNote":
    "최대 12개입니다. 하나를 누르면 바로 보내지 않고 입력란에만 넣으므로 " +
    "먼저 내용을 보탤 수 있습니다.",
  "settings.assistant.savePrompts": "질문 저장",
  "settings.assistant.steps": "턴당 단계 수",
  "settings.assistant.stepsDesc":
    "한 질문에 도구를 최대 몇 번 호출한 뒤 도우미가 멈추고 보고할지입니다. " +
    "결과가 나오지 않는 실행은 당신이 알아차리기 전에 스스로 끝납니다.",
  "settings.assistant.lines": "읽을 수 있는 터미널 줄 수",
  "settings.assistant.linesDesc":
    "한 번 읽기가 세션의 최근 출력을 얼마나 돌려주는지입니다. 높이면 맥락이 늘지만 " +
    "대화 예산도 더 씁니다.",
  "settings.assistant.signIn": "로그인 방식",
  "settings.assistant.theAgent": "해당 에이전트",
  "settings.assistant.accountOpencode":
    "OpenCode는 CLI에 이미 설정된 제공자와 자격 증명을 사용합니다. " +
    "“opencode auth login”으로 관리하세요. 여기에 저장된 키는 OpenCode에 전달되지 않습니다.",
  "settings.assistant.accountGrokApi":
    "이 컴퓨터에 Grok Build가 없어 NoxSSH가 여기에 저장한 키로 xAI API를 직접 호출하며, " +
    "토큰당 과금됩니다. CLI를 설치하고 로그인하면 내 요금제를 쓸 수 있습니다.",
  "settings.assistant.accountLocal":
    "로그인할 계정이 없습니다. 모델이 이 컴퓨터에서 돌아가므로 " +
    "계정도, 토큰당 과금도 없습니다. 서버에 직접 키를 둔 경우에만 입력하면 됩니다.",
  "settings.assistant.accountPlan":
    "이 컴퓨터에서 {agent}(으)로 로그인되어 있으며 {plan} 요금제를 씁니다. " +
    "사용량은 그 요금제에서 빠지므로 여기에 키를 넣을 필요가 없습니다.",
  "settings.assistant.accountProvider":
    "이 컴퓨터의 {agent}가 {provider}를 쓰도록 설정되어 있으며, " +
    "자격 증명은 해당 제공자가 관리합니다. 여기서는 아무 설정도 필요 없습니다.",
  "settings.assistant.accountAgentKey":
    "이 컴퓨터의 {agent}가 API 키를 쓰므로 토큰당 과금됩니다.",
  "settings.assistant.accountStoredKey":
    "여기에 저장된 키가 사용됩니다. 입력란을 비우고 저장하면 삭제되고 " +
    "{agent} 로그인으로 돌아갑니다.",
  "settings.assistant.accountNone":
    "이미 이 컴퓨터에서 {agent}에 로그인했다면(보통 그렇습니다) 할 일이 없습니다. " +
    "로그인하지 않은 경우에만 키가 필요합니다.",
  "settings.assistant.apiKey": "API 키",
  "settings.assistant.keyStored": "키가 저장되어 있습니다",
  "settings.assistant.keyOptional": "서버가 요구할 때만 필요합니다",
  "settings.assistant.keySaved": "키를 저장했습니다.",
  "settings.assistant.keyRemoved": "키를 삭제했습니다.",
  "settings.assistant.keyFailed": "해당 키를 저장할 수 없습니다.",
  "settings.assistant.noSecureStore":
    "이 시스템에 사용 가능한 보안 저장소가 없어 여기에 키를 저장할 수 없습니다.",
  "settings.assistant.tools": "할 수 있는 일",
  "settings.assistant.toolsDesc":
    "도구 {count}개 중 {readOnly}개는 읽기 전용입니다. 나머지는 위의 승인 설정을 따릅니다.",

  /* ---- Settings: Monitoring ---- */
  "settings.monitoring.title": "모니터링",
  "settings.monitoring.desc":
    "앱이 열려 있는 동안 호스트가 여전히 도달 가능한지 확인하고, 응답이 멈추면 알립니다. " +
    "스위치가 두 개 필요합니다. 이 페이지에서 기능을 켜고, 감시할 각 호스트는 해당 편집기에서 따로 켭니다.",
  "settings.monitoring.unreadable":
    "앱에서 모니터링 설정을 읽을 수 없습니다. CloudTerm을 다시 시작한 뒤 이 페이지를 여세요.",
  "settings.monitoring.saveFailed": "해당 설정을 저장할 수 없습니다",
  "settings.monitoring.checkFailed": "해당 호스트를 확인할 수 없습니다",
  "settings.monitoring.master": "호스트 장애 감시",
  "settings.monitoring.masterDesc":
    "총 스위치입니다. 호스트는 한꺼번에가 아니라 한 대씩 감시하므로, 여기만 켠다고 아무것도 확인되지 않습니다. " +
    "감시할 각 호스트는 해당 편집기의 “모니터링”에서 켜야 합니다.",
  "settings.monitoring.interval": "확인 주기",
  "settings.monitoring.intervalDesc":
    "감시 중인 각 호스트를 이 간격으로 확인합니다. 한 번 확인은 연결을 열고 바로 닫는 것이라 " +
    "호스트 목록이 길어도 부담이 작습니다.",
  "settings.monitoring.timeout": "대기 시간",
  "settings.monitoring.timeoutDesc":
    "이 시간 안에 연결을 수락하지 않으면 확인 실패입니다. VPN 너머의 기기라면 " +
    "조금 늘리는 것이 좋습니다.",
  "settings.monitoring.failures": "오프라인으로 보기 전",
  "settings.monitoring.failuresDesc":
    "연속으로 몇 번 실패해야 하는지입니다. Wi-Fi에서는 두 번 이상으로 두세요. " +
    "패킷 하나 떨어진 것이 서버 다운은 아니며, 분마다 그런 알림을 받으면 알림을 읽지 않게 됩니다.",
  "settings.monitoring.notify": "호스트가 오프라인이 되면 알림",
  "settings.monitoring.notifyDesc":
    "호스트가 응답에서 무응답으로 바뀌면 데스크톱 알림을 한 번 보냅니다. " +
    "끄면 호스트 카드와 종 아이콘의 상태는 남지만 방해하지는 않습니다.",
  "settings.monitoring.notifyBack": "복구될 때도 알림",
  "settings.monitoring.notifyBackDesc":
    "오프라인이던 호스트가 다시 응답하면 알림을 하나 더 보내고, 얼마나 떨어져 있었는지 알려 줍니다.",
  "settings.monitoring.list": "감시 중인 대상",
  "settings.monitoring.checkNow": "지금 확인",
  "settings.monitoring.checking": "확인 중…",
  "settings.monitoring.noneWatched": "감시는 호스트 편집기에서 대별로 켭니다.",
  "settings.monitoring.watched_other": "호스트 {count}대.",
  "settings.monitoring.watchedButOff_other":
    "호스트 {count}대가 설정되어 있지만 위 스위치가 꺼져 있어 확인이 진행되지 않습니다.",
  "settings.monitoring.watchedWithOffline_other":
    "호스트 {count}대, 그중 {offline}대가 응답하지 않습니다.",
  "settings.monitoring.emptyList": "아직 감시 중인 호스트가 없습니다.",
  "settings.monitoring.emptyListHow":
    "“호스트” 페이지에서 호스트를 열고, “선택 사항” 아래 “모니터링”에서 “이 호스트 감시”를 켜세요.",
  "settings.monitoring.noNetwork":
    "이 컴퓨터에 네트워크가 없어 아무 확인도 하지 않았고, 어떤 호스트도 오프라인으로 보고하지 않았습니다.",
  "settings.monitoring.allFailed":
    "마지막 확인에서 모든 호스트가 동시에 실패했습니다. 보통 모든 호스트가 아니라 이 컴퓨터의 문제입니다. " +
    "그 결과는 버려졌고 아무 보고도 하지 않았습니다.",
  "settings.monitoring.lastChecked": "마지막 확인: {when}.",

  /* ---- Settings: Logging ---- */
  "settings.logging.title": "로깅",
  "settings.logging.desc":
    "각 세션이 보여 준 내용을 파일에 쓰고, 어떤 세션을 기록할지와 파일을 얼마나 남길지 정합니다.",
  "settings.logging.saveFailed": "해당 설정을 저장할 수 없습니다",
  "settings.logging.folderFailed": "해당 폴더를 사용할 수 없습니다",
  "settings.logging.folderChanged": "이후 세션 로그는 그곳에 저장됩니다",
  "settings.logging.openFailed": "해당 폴더를 열 수 없습니다",
  "settings.logging.revealFailed": "해당 로그를 찾을 수 없습니다",
  "settings.logging.recordAll": "모든 세션 기록",
  "settings.logging.recordAllDesc":
    "세션이 열릴 때마다 서버가 출력한 내용을 파일에 씁니다. " +
    "이 항목을 켜지 않아도, 개별 세션은 제목 표시줄에서 언제든 따로 기록을 시작할 수 있습니다.",
  "settings.logging.whichSessions": "기록할 세션",
  "settings.logging.whichSessionsDesc":
    "위 스위치가 기록하는 세션 종류입니다. " +
    "세션 자체 제목 표시줄에서 따로 기록을 켜면 이 목록을 무시합니다.",
  "settings.logging.format": "무엇을 쓸지",
  "settings.logging.formatDesc":
    "“읽기 쉽게”는 색과 커서 제어 코드를 벗겨 grep하기 쉽게 만듭니다. " +
    "“원본 그대로”는 모든 바이트를 남겨 나중에 터미널에서 재생할 수 있습니다.",
  "settings.logging.formatPlain": "읽기 쉽게",
  "settings.logging.formatRaw": "원본 그대로",
  "settings.logging.timestamps": "각 줄에 시각 붙이기",
  "settings.logging.timestampsDesc": "각 줄 앞에 도착한 로컬 시각을 붙입니다.",
  "settings.logging.timestampsUnavailable":
    "원본 로그에는 쓸 수 없습니다. 이스케이프 시퀀스 한가운데에 타임스탬프를 넣으면 깨집니다.",
  "settings.logging.retention": "보관 기간",
  "settings.logging.retentionDesc":
    "오래된 기록은 시작 시와 세션이 열릴 때 삭제됩니다. 쓰고 있는 기록은 아무리 오래돼도 건드리지 않습니다.",
  "settings.logging.forever": "영구 보관",
  "settings.logging.days_other": "{count}일",
  "settings.logging.cap": "폴더 크기 제한",
  "settings.logging.capDesc":
    "폴더가 이 크기를 넘으면 가장 오래된 기록부터 지워 다시 들어가게 합니다.",
  "settings.logging.noCap": "제한 없음",
  "settings.logging.folder": "저장 위치",
  "settings.logging.folderDesc":
    "로그에는 화면에 나온 모든 것이 들어갑니다. 비밀번호 관리자를 돌리거나 토큰을 인쇄한 세션이라면 " +
    "자격 증명 자체만큼 민감합니다. 그런 자격 증명을 둘 곳에 두세요.",
  "settings.logging.openFolder": "폴더 열기",
  "settings.logging.defaultFolder": "기본 폴더로 되돌리기",
  "settings.logging.showInFolder": "폴더에서 보기",

  /* ---- Settings: Security ---- */
  "settings.security.title": "보안",
  "settings.security.desc": "누가 이 앱을 열 수 있는지, 어떤 서버를 신뢰하는지입니다.",

  "settings.lock.title": "시작 비밀번호",
  "settings.lock.badgeOn": "켜짐",
  "settings.lock.descOn":
    "앱을 열 때마다 묻습니다. 저장한 비밀번호, 키, 암호가 이것으로 암호화되므로 " +
    "없이는 저장 파일을 읽을 수 없습니다.",
  "settings.lock.descOff":
    "앱을 열려면 비밀번호를 요구하고, 저장한 비밀번호, 키, 암호를 그것으로 암호화합니다.",
  "settings.lock.warnOn":
    "복구 방법은 없습니다. 이 비밀번호를 잊으면 저장된 자격 증명을 다시 읽을 수 없습니다.",
  "settings.lock.warnOff":
    "설정하지 않으면 자격 증명은 시스템 키 저장소만으로 보호되므로, 당신으로 로그인한 누구나 읽을 수 있습니다.",
  "settings.lock.lockNow": "지금 잠그기",
  "settings.lock.setPassword": "비밀번호 설정",
  "settings.lock.changePassword": "비밀번호 변경",
  "settings.lock.removePassword": "비밀번호 삭제",
  "settings.lock.currentPassword": "현재 비밀번호",
  "settings.lock.password": "비밀번호",
  "settings.lock.newPassword": "새 비밀번호",
  "settings.lock.confirmPassword": "비밀번호 확인",
  "settings.lock.mismatch": "두 비밀번호가 일치하지 않습니다",
  "settings.lock.failed": "작업이 성공하지 않았습니다",
  "settings.lock.passwordSet": "시작 비밀번호를 설정했습니다",
  "settings.lock.passwordChanged": "비밀번호를 변경했습니다",
  "settings.lock.passwordRemoved": "시작 비밀번호를 삭제했습니다",
  "settings.lock.acknowledge": "이 비밀번호는 복구할 수 없음을 이해합니다",
  "settings.lock.acknowledgeDesc":
    "저장한 비밀번호, 키, 암호가 이것으로 암호화됩니다. 잊으면 " +
    "이 앱이든 다른 무엇이든 다시 읽어 올 수 없습니다.",
  "settings.lock.confirmTitle": "지금 앱을 잠글까요?",
  "settings.lock.confirmMessage":
    "열린 모든 세션이 끊기며, 다시 들어가려면 비밀번호가 필요합니다.",
  "settings.lock.confirmAction": "잠그기",

  "settings.knownHosts.title": "알려진 호스트",
  "settings.knownHosts.desc":
    "신뢰한 서버 키입니다. 하나를 잊으면 다음 연결 때 다시 묻습니다. " +
    "서버가 실제로 다시 만들어진 경우 그렇게 해야 합니다.",
  "settings.knownHosts.unknownType": "알 수 없음",
  "settings.knownHosts.copy": "지문 복사",
  "settings.knownHosts.copied": "지문을 복사했습니다",
  "settings.knownHosts.forget": "잊기",
  "settings.knownHosts.forgetKey": "이 키 잊기",
  "settings.knownHosts.keyCount_other": "키 {count}개",
  "settings.knownHosts.empty": "아직 신뢰한 호스트 키가 없습니다",
  "settings.knownHosts.emptyNote":
    "서버에 처음 연결하면 그 키가 여기에 기록됩니다.",
  "settings.knownHosts.confirmTitle": "이 호스트 키를 잊을까요?",
  "settings.knownHosts.confirmMessage":
    "다음에 연결하면 {host}가 새 호스트로 취급되며, 키를 다시 확인하게 됩니다.",
  "settings.knownHosts.forgotHost": "{host}을(를) 잊었습니다",
  "settings.knownHosts.forgotKey": "{host}의 {type} 키를 잊었습니다",

  /* ---- Settings: Account (WebDAV sync) ---- */
  "settings.account.title": "WebDAV 동기화",
  "settings.account.webdavUrl": "WebDAV 주소",
  "settings.account.webdavUrlHint":
    "서버 주소만 입력하세요. 예: https://dav.jianguoyun.com/dav/. 백업 경로로 NoxSSH/가 자동으로 붙습니다.",
  "settings.account.username": "사용자 이름",
  "settings.account.webdavPassword": "WebDAV 비밀번호",
  "settings.account.webdavPasswordHint":
    "HTTP Basic 인증에 쓰는 비밀번호입니다(안전하게 저장됨).",
  "settings.account.syncPassphrase": "동기화 암호",
  "settings.account.syncPassphraseHint":
    "업로드 전에 동기화 데이터를 암호화하는 데 씁니다. 다른 기기에서 복원하려면 같은 암호가 필요합니다.",
  "settings.account.saveUrlUser": "주소와 사용자 이름 저장",
  "settings.account.saveSecrets": "암호 저장",
  "settings.account.test": "연결 테스트",
  "settings.account.testing": "테스트 중...",
  "settings.account.testOk": "연결에 성공했습니다",
  "settings.account.enableSync": "WebDAV 동기화 사용",
  "settings.account.enableSyncDesc":
    "켜면 로컬 변경이 약 8초 후 자동 업로드됩니다. 5분마다, 그리고 잠금 해제나 절전 해제 시 서버에서 내려받습니다. 업로드 전에 서버에 더 새 동기화 데이터가 있으면 먼저 병합한 뒤 올립니다.",
  "settings.account.saveNowHint":
    "자동 업로드를 기다리지 않고 이 컴퓨터의 현재 데이터를 지금 올립니다.",
  "settings.account.restoreNowHint":
    "다음 자동 다운로드를 기다리지 않고 서버에서 동기화 데이터를 받아 이 컴퓨터를 덮어씁니다.",
  "settings.account.syncOn": "WebDAV 동기화가 켜졌습니다",
  "settings.account.syncOff": "WebDAV 동기화가 꺼졌습니다",
  "settings.account.configSaved": "설정을 저장했습니다",
  "settings.account.secretsSaved": "자격 증명을 업데이트했습니다",
  "settings.account.backedUp": "WebDAV에 업로드했습니다",
  "settings.account.saveNow": "지금 업로드",
  "settings.account.saving": "업로드 중…",
  "settings.account.savedAgo": "{when}에 업로드함",
  "settings.account.notSavedYet": "아직 업로드하지 않음",
  "settings.account.restoreNow": "지금 다운로드",
  "settings.account.restoring": "다운로드 중…",
  "settings.account.restored": "WebDAV에서 내려받았습니다",
  "settings.account.notRestoredYet": "아직 내려받지 않음",
  "settings.account.restoredAgo": "{when}에 내려받음",
  "settings.account.webdavPrivacyNote":
    "데이터는 이 기기를 떠나기 전에 동기화 암호로 암호화됩니다. WebDAV 비밀번호는 인증에만 쓰입니다.",
  "settings.account.backupSection": "이력 백업",
  "settings.account.backupEnabled": "이력 백업 사용",
  "settings.account.backupEnabledDesc":
    "설정한 주기로 서버에 타임스탬프가 붙은 별도 암호화 백업 파일을 만듭니다. 현재 동기화 데이터와는 분리됩니다.",
  "settings.account.backupFrequency": "백업 주기",
  "settings.account.backupFrequencyManual": "수동만",
  "settings.account.backupFrequencyHourly": "매시간",
  "settings.account.backupFrequencyDaily": "매일",
  "settings.account.backupFrequencyWeekly": "매주",
  "settings.account.maxBackups": "최대 보관",
  "settings.account.maxBackupsSuffix": "개",
  "settings.account.backupNow": "지금 백업",
  "settings.account.backingUp": "백업 중…",
  "settings.account.backupsTitle": "사용 가능한 이력 버전",
  "settings.account.noBackups": "아직 이력 백업이 없습니다",
  "settings.account.restoreVersion": "이 버전 복원",
  "settings.account.restoringVersion": "복원하는 중…",
  "settings.account.backupCreated": "백업을 만들었습니다",
  "settings.account.backupRestored": "이력 백업에서 복원했습니다",
  "settings.account.lastBackup": "마지막 백업",
  "settings.account.backupOnNow": "이력 백업을 켰습니다",
  "settings.account.backupOffNow": "이력 백업을 껐습니다",
  "settings.account.revision": "버전",
  "settings.account.justNow": "방금",
  "settings.account.minutesAgo": "{count}분 전",
  "settings.account.hoursAgo": "{count}시간 전",
  "settings.account.daysAgo": "{count}일 전",
  "settings.account.proxyCount_other": "프록시 {count}개",
  "settings.account.deletingVersion": "삭제 중…",
  "settings.account.backupDeleted": "백업을 삭제했습니다",
  "settings.account.resetLocalTitle": "이 기기의 데이터 지우기",
  "settings.account.resetLocalDesc":
    "이 컴퓨터의 호스트, 키, 스니펫, 프록시, 알려진 호스트, 도우미 설정, WebDAV 동기화 구성을 지우고 초기 상태로 되돌립니다. 서버의 동기화 데이터나 이력 백업은 건드리지 않습니다.",
  "settings.account.resetLocal": "로컬 데이터 지우기",
  "settings.account.resettingLocal": "지우는 중…",
  "settings.account.resetLocalConfirmTitle": "로컬 데이터를 지울까요?",
  "settings.account.resetLocalConfirmMessage":
    "이 컴퓨터의 호스트, 키, 스니펫, 프록시, 알려진 호스트, 도우미 설정과 WebDAV 주소, 계정, 암호가 삭제됩니다. 서버의 동기화 데이터와 이력 백업은 영향받지 않습니다.",
  "settings.account.resetLocalConfirm": "이 기기 지우기",
  "settings.account.localResetDone": "로컬 데이터를 지웠습니다",

  /* ---- Settings: Backup ---- */
  "settings.backup.title": "백업 / 가져오기",
  "settings.backup.desc": "기존 구성을 가져오거나 사본을 내보냅니다.",
  "settings.backup.exportTitle": "백업 내보내기",
  "settings.backup.exportDesc":
    "모든 호스트, 폴더, SSH 키, 스니펫, 포트 포워딩, 신뢰한 호스트 키를 " +
    "암호화된 파일 하나에 쓰고, 여기서 정한 암호로 보호합니다.",
  "settings.backup.exportNote":
    "이 암호는 시작 비밀번호와 별개이므로, 이 기기를 본 적 없는 컴퓨터에서도 파일을 열 수 있습니다.",
  "settings.backup.create": "백업 만들기",
  "settings.backup.passphrase": "백업 암호",
  "settings.backup.confirmPassphrase": "암호 확인",
  "settings.backup.tooShort": "최소 {count}자가 필요합니다",
  "settings.backup.mismatch": "두 암호가 일치하지 않습니다",
  "settings.backup.acknowledge": "이 파일에 저장된 자격 증명이 들어 있음을 이해합니다",
  "settings.backup.acknowledgeDesc":
    "파일과 이 암호를 둘 다 가진 사람은 그 안의 저장된 비밀번호, " +
    "개인 키, 암호를 모두 읽을 수 있습니다. 그런 자격 증명을 둘 곳에 두세요.",
  "settings.backup.chooseLocation": "저장 위치 선택…",
  "settings.backup.exportFailed": "백업을 쓸 수 없습니다",
  "settings.backup.exported": "백업을 저장했습니다: {hosts}, {keys}, {snippets}",
  "settings.backup.restoreTitle": "백업 복원",
  "settings.backup.restoreDesc":
    ".cbbackup 파일을 읽어 내용을 가져옵니다. 무엇이든 바뀌기 전에 " +
    "안에 무엇이 있는지 먼저 보여 줍니다.",
  "settings.backup.restoreNote":
    "기본적으로 여기에 이미 있는 것은 건드리지 않으므로, 두 번 복원해도 안전합니다.",
  "settings.backup.chooseFile": "파일 선택…",
  "settings.backup.openTitle": "암호화된 백업 열기",
  "settings.backup.fileKind": "CloudBlast 백업",
  "settings.backup.pickerFailed": "파일 선택기를 열 수 없습니다",
  "settings.backup.file": "파일",
  "settings.backup.open": "백업 열기",
  "settings.backup.opening": "여는 중…",
  "settings.backup.openFailed": "해당 백업을 열 수 없습니다",
  "settings.backup.from": "{when}의 백업",
  "settings.backup.unknownDate": "알 수 없는 날짜",
  "settings.backup.appVersion": "앱 {version}",
  "settings.backup.emptyFile": "이 백업은 비어 있습니다.",
  "settings.backup.folders": "폴더",
  "settings.backup.keys": "SSH 키",
  "settings.backup.newCount": "{count}개는 신규",
  "settings.backup.existingReplaced": "{count}개는 이미 있어 교체됩니다",
  "settings.backup.existingSkipped": "{count}개는 이미 있어 건너뜁니다",
  "settings.backup.trustedKeys": "신뢰한 키",
  "settings.backup.hostWord_other": "대 호스트",
  "settings.backup.overwrite": "여기에 이미 있는 항목 바꾸기",
  "settings.backup.overwriteDesc":
    "이름이 아니라 기록 id로 맞춥니다. 끄면 빠진 것만 채우고, " +
    "켜면 이 기기를 백업과 같게 만들며 해당 기록의 로컬 수정을 버립니다.",
  "settings.backup.overwriteWarning": "해당 기록의 로컬 변경이 사라집니다.",
  "settings.backup.restore": "복원",
  "settings.backup.restoring": "복원하는 중…",
  "settings.backup.restoreFailed": "복원이 끝나지 않았습니다",
  "settings.backup.restored_other": "새 항목 {count}개를 복원했습니다",
  "settings.backup.restoredAndReplaced_other":
    "새 항목 {count}개를 복원하고 {replaced}개를 바꿨습니다",
  "settings.backup.duplicateKeys_other":
    "이제 {count}대 호스트가 같은 종류의 키를 둘 이상 신뢰합니다. " +
    "“보안”의 “알려진 호스트”를 확인하세요.",

  /* ---- Settings: About ---- */
  "settings.about.title": "정보",
  "settings.about.version": "버전 {version}",
  "settings.about.updates": "업데이트",
  "settings.about.checking": "업데이트를 확인하는 중…",
  "settings.about.checkingShort": "확인 중…",
  "settings.about.checkNow": "업데이트 확인",
  "settings.about.disabled": "이 설치에서는 업데이트 확인이 꺼져 있습니다.",
  "settings.about.ready": "버전 {version}을(를) 설치할 준비가 되었습니다. 다시 시작하면 완료됩니다.",
  "settings.about.downloading": "업데이트를 내려받는 중…",
  "settings.about.downloadingVersion": "버전 {version}을(를) 내려받는 중…",
  "settings.about.available": "버전 {version}이(가) 나왔습니다.",
  "settings.about.availableToDownload": "버전 {version}을(를) 내려받을 수 있습니다.",
  "settings.about.upToDate": "최신 버전입니다. 마지막 확인: {when}.",
  "settings.about.neverChecked": "아직 확인하지 않았습니다.",
  "settings.about.restartToUpdate": "다시 시작해 업데이트",
  "settings.about.download": "{version} 내려받기",
  "settings.about.noChecksLeft": "이번 시간의 확인 횟수를 모두 썼습니다.",
  "settings.about.noChecksUntil": "이번 시간의 확인 횟수를 모두 썼습니다. {when}까지 기다려야 합니다.",
  "settings.about.checksLeft_other":
    "이번 시간에 {limit}회 중 {count}회가 남았습니다.",
  "settings.about.noteInstall":
    "업데이트는 백그라운드에서 내려받아 앱을 종료할 때 설치됩니다. " +
    "업데이트 확인은 GitHub에 최신 릴리스만 물으며, 당신이나 기기에 대한 정보는 보내지 않습니다.",
  "settings.about.noteNotify":
    "업데이트는 자동 설치되지 않습니다. 내려받기가 브라우저에서 열려 시스템이 검사할 수 있습니다. " +
    "업데이트 확인은 GitHub에 최신 릴리스만 물으며, 당신이나 기기에 대한 정보는 보내지 않습니다.",

  /* ---- More shared words ---- */
  "common.add": "추가",
  "common.copy": "복사",
  "common.delete": "삭제",
  "common.deleteNamed": "{name} 삭제",
  "common.edit": "편집",
  "common.rename": "이름 바꾸기",

  /* ---- Hosts ---- */
  "hosts.rootLabel": "모든 호스트",
  "hosts.unnamed": "이름 없는 호스트",
  "hosts.noPort": "포트 없음",
  "hosts.connected": "연결됨",
  "hosts.viaProxy": "프록시 경유",
  "hosts.lastConnected": "{when}",
  "hosts.tunnelCount_other": "터널 {count}개",
  "hosts.itemCount_other": "항목 {count}개",
  "hosts.selectedCount": "{count}개 선택됨",
  "hosts.folderEmpty": "비어 있음",
  "hosts.folderActions": "폴더 작업",
  "hosts.syncedBadge": "동기화됨",
  "hosts.syncedAccount": "CloudBlast 계정에서 동기화됨",
  "hosts.syncedProject":
    "CloudBlast 계정의 프로젝트입니다. 동기화가 이름과 위치를 유지합니다",
  "hosts.upOneLevel": "한 단계 위로",
  "hosts.dragHint": "카드를 폴더로 끌어 정리 · 상자를 끌어 여러 개를 한 번에 선택",
  "hosts.dragHintFiltered": "카드 위에서 상자를 끌어 여러 개를 한 번에 선택",

  "hosts.open": "열기",
  "hosts.editHost": "호스트 편집",
  "hosts.connectVia": "{protocol}(으)로 연결",
  "hosts.openIpmi": "IPMI 열기",
  "hosts.notSetUp": "아직 설정되지 않음",
  "hosts.moveToFolder": "폴더로 이동…",
  "hosts.keepsContents": "내용은 유지",
  "hosts.move": "이동",
  "hosts.tag": "태그",
  "hosts.tags": "태그…",
  "hosts.moveMany": "{what} 이동…",
  "hosts.groupIntoFolder": "폴더로 묶기…",
  "hosts.clearSelection": "선택 해제",

  "hosts.deleteHostTitle": "이 호스트를 삭제할까요?",
  "hosts.deleteHostMessage":
    "“{name}”과(와) 저장된 자격 증명이 제거됩니다. 이미 열린 세션은 연결된 채로 남습니다.",
  "hosts.deleteHost": "호스트 삭제",
  "hosts.deleteFolderTitle": "이 폴더를 삭제할까요?",
  "hosts.deleteFolderMessage":
    "“{name}”이(가) 제거됩니다. 안의 내용은 삭제되지 않고 한 단계 위로 올라갑니다.",
  "hosts.deleteFolder": "폴더 삭제",
  "hosts.deleted": "“{name}”을(를) 삭제했습니다",
  "hosts.deleteManyTitle": "{what}을(를) 삭제할까요?",
  "hosts.deleteMany": "{what} 삭제",
  "hosts.deletedMany": "{what}을(를) 삭제했습니다",
  "hosts.deleteManyHostsNote":
    "호스트는 저장된 자격 증명과 함께 제거되며, 이미 열린 세션은 연결된 채로 남습니다.",
  "hosts.deleteManyFoldersNote":
    "폴더는 제거되지만 안의 내용은 삭제되지 않고 한 단계 위로 올라갑니다.",
  "hosts.deleteFailed": "삭제할 수 없습니다: {reason}",

  "hosts.moved": "{what}을(를) 이동했습니다",
  "hosts.movedSome": "{of}개 중 {count}개를 이동했습니다. 나머지는 그곳으로 갈 수 없습니다",
  "hosts.movedTo": "{what}을(를) {where}(으)로 이동했습니다",
  "hosts.movedSomeTo": "{of}개 중 {count}개를 {where}(으)로 이동했습니다",
  "hosts.movedInto": "{what}을(를) “{name}”에 넣었습니다",
  "hosts.nothingToMove": "이동할 것이 없습니다. 모두 이미 그곳에 있습니다",
  "hosts.folderInsideItself": "폴더를 자기 안으로 옮길 수 없습니다.",
  "hosts.moveTitle": "항목 {count}개 이동",
  "hosts.moveSubtitle": "넣을 폴더를 고르세요.",
  "hosts.findFolder": "폴더 찾기…",
  "hosts.noFolderMatches": "“{query}”와 일치하는 폴더가 없습니다.",
  "hosts.alreadyHere": "이미 여기 있음",
  "hosts.insideSelection": "선택 안에 있음",

  "hosts.editFolder": "폴더 편집",
  "hosts.saveFolder": "폴더 저장",
  "hosts.createFolder": "폴더 만들기",
  "hosts.creating": "만드는 중…",
  "hosts.folderName": "폴더 이름",
  "hosts.folderNamePlaceholder": "예: AWS 서버",
  "hosts.folderSubtitle":
    "폴더는 호스트를 묶는 용도입니다. 폴더를 삭제해도 안의 내용은 삭제되지 않습니다.",
  "hosts.folderCreateFailed": "해당 폴더를 만들 수 없습니다",
  "hosts.folderCreateFailedWhy": "해당 폴더를 만들 수 없습니다: {reason}",
  "hosts.groupTitle": "선택으로 새 폴더 만들기",
  "hosts.groupSubtitle": "{what}이(가) {parent} 아래 그 안으로 옮겨집니다.",

  "hosts.sort": "정렬",
  "hosts.sortLabel": "정렬: {sort}",
  "hosts.sortNameAsc": "이름 A-Z",
  "hosts.sortNameDesc": "이름 Z-A",
  "hosts.sortRecent": "최근 사용",
  "hosts.sortManual": "수동",
  "hosts.filterByTag": "태그로 필터",
  "hosts.filteredByTags_other": "태그 {count}개로 필터",
  "hosts.filterBy": "“{tag}”(으)로 필터",
  "hosts.stopFilteringBy": "“{tag}” 필터 해제",
  "hosts.searchTags": "태그 검색",
  "hosts.searchTagsPlaceholder": "태그 {count}개 검색…",
  "hosts.noTagMatches": "“{query}”와 일치하는 태그가 없습니다",
  "hosts.tagMode.all": "모두",
  "hosts.tagMode.any": "아무거나",
  "hosts.tagModeAllHint": "고른 태그를 모두 가진 호스트",
  "hosts.tagModeAnyHint": "고른 태그 중 하나라도 가진 호스트",

  "hosts.tagTitle": "호스트에 태그 달기",
  "hosts.tagSubtitle":
    "{what}이(가) 선택되었습니다. 반선택 태그는 그중 일부에만 달려 있으며, 건드리지 않으면 그대로입니다.",
  "hosts.applying": "적용 중…",
  "hosts.newTag": "새 태그",
  "hosts.newTagPlaceholder": "새 태그…",
  "hosts.noTagsYet": "아직 태그가 없습니다. 위에서 하나 입력해 시작하세요.",
  "hosts.tagWillAdd": "추가됨",
  "hosts.tagWillRemove": "제거됨",
  "hosts.tagOnAll": "모두에 있음",
  "hosts.tagOnSome": "{total}대 중 {on}대에 있음",

  /* ---- Protocols ---- */
  "protocol.serial": "시리얼",
  "protocol.desktop": "원격 데스크톱",
  "protocol.ssh.summary": "암호화된 셸, 그리고 그 위에 올라간 모든 것",
  "protocol.ssh.detail":
    "파일, 포트 포워딩, 원격 데스크톱은 모두 SSH 연결 위의 채널이므로 여기에서만 제공됩니다.",
  "protocol.telnet.summary": "SSH가 없는 장치로 가는 일반 소켓",
  "protocol.telnet.detail":
    "비밀번호를 포함해 모든 것이 평문으로 전송됩니다. 콘솔 서버, PDU, " +
    "SSH 데몬을 한 번도 두지 않은 스위치에 씁니다.",
  "protocol.serial.summary": "이 컴퓨터의 콘솔 케이블",
  "protocol.serial.detail":
    "네트워크를 전혀 거치지 않습니다. 설정이 장치와 정확히 같아야 합니다. 보드율이 틀리면 오류가 아니라 " +
    "깨진 글자만 나옵니다.",
  "protocol.desktop.summary": "RDP 또는 VNC, 뒤에 셸 없음",
  "protocol.desktop.detail":
    "원격 데스크톱을 바로 열며 SSH는 걸지 않습니다. 보통 SSH 서버가 없는 Windows 기기에 씁니다.",
  "protocol.ipmi.summary": "서비스 프로세서만, 뒤에는 없음",
  "protocol.ipmi.detail":
    "BMC 자체 웹 인터페이스를 바로 열며 기기 자체로는 접속하지 않습니다. 이 앱에 세션이 없는 호스트 앞의 " +
    "iDRAC, iLO, Supermicro 보드에 씁니다.",

  /* ---- Serial ---- */
  "serial.port": "시리얼 포트",
  "serial.selectPort": "포트 선택…",
  "serial.rescan": "포트 다시 검색",
  "serial.noPorts": "시리얼 포트를 찾지 못했습니다. 어댑터를 꽂고 다시 검색하세요.",
  "serial.portMissing":
    "{path}이(가) 지금은 연결되어 있지 않습니다. 호스트에는 그대로 남아 있으며, 케이블을 다시 꽂으면 쓸 수 있습니다.",
  "serial.baudRate": "보드율",
  "serial.dataBits": "데이터 비트",
  "serial.stopBits": "정지 비트",
  "serial.parity": "패리티",
  "serial.parityNone": "없음",
  "serial.parityEven": "짝수",
  "serial.parityOdd": "홀수",
  "serial.parityMark": "마크",
  "serial.paritySpace": "스페이스",
  "serial.flowControl": "흐름 제어",
  "serial.flowNone": "없음",
  "serial.flowHardware": "하드웨어(RTS/CTS)",
  "serial.flowSoftware": "소프트웨어(XON/XOFF)",
  "serial.enterSends": "Enter가 보내는 것",
  "serial.enterSendsHint":
    "어떤 프로토콜도 이 질문에 답하지 않습니다. 잘못 설정된 장치는 죽은 것처럼 보입니다. 프롬프트가 돌아오지 않습니다.",
  "serial.newlineCrHint": "네트워크 장비, 대부분의 콘솔",
  "serial.newlineLfHint": "Linux getty",
  "serial.newlineCrLfHint": "일부 임베디드 모니터",
  "serial.localEcho": "입력한 내용 에코",
  "serial.localEchoHint":
    "에코하지 않는 장치에서는 켜세요. 그렇지 않으면 입력하는 동안 창이 비어 있어 " +
    "조용한 것이 아니라 포트가 죽은 것처럼 보입니다.",
  "serial.dtr": "열 때 DTR 설정",
  "serial.dtrHint":
    "기본은 켜짐이며 대부분의 장치가 이를 기대합니다. DTR이 리셋을 트리거하도록 배선된 보드는 끄세요. " +
    "그렇지 않으면 이 포트를 열 때마다 재부팅됩니다.",
  "serial.rts": "열 때 RTS 설정",
  "serial.rtsHint": "기본은 켜짐입니다. 일부 어댑터는 RTS를 리셋 또는 부트 핀에 연결합니다.",
  "serial.rtsIgnored": "하드웨어 흐름 제어가 켜져 있으면 무시됩니다. 그때 RTS는 드라이버가 맡습니다.",
  "serial.noWindowSize":
    "시리얼 선은 창 크기와 터미널 종류를 전달하지 않으므로, 창이 아무리 커도 장치는 80×24로 처리합니다.",

  /* ---- Port forwarding ---- */
  "tunnel.heading": "포트 포워딩",
  "tunnel.headingNote": "터널은 이 세션의 연결 위에서 동작하며, 세션이 닫히면 함께 멈춥니다.",
  "tunnel.local": "로컬",
  "tunnel.remote": "원격",
  "tunnel.dynamic": "동적",
  "tunnel.local.summary": "이 컴퓨터에서 원격 서비스에 접근",
  "tunnel.local.detail":
    "이 컴퓨터에 포트를 엽니다. 그곳에 연결되는 트래픽은 서버에서 나가 서버가 대상으로 접속합니다.",
  "tunnel.remote.summary": "로컬 서비스를 서버에 노출",
  "tunnel.remote.detail": "서버에 포트를 엽니다. 그곳이 받는 연결은 이 컴퓨터에서 나갑니다.",
  "tunnel.dynamic.summary": "서버를 경유하는 SOCKS5 프록시",
  "tunnel.dynamic.detail":
    "이 컴퓨터에 SOCKS5 프록시를 엽니다. 각 연결이 대상을 스스로 지정하고 서버가 접속합니다.",
  "tunnel.newTitle": "새 포트 포워딩",
  "tunnel.editTitle": "포트 포워딩 편집",
  "tunnel.add": "포워딩 추가",
  "tunnel.added": "포워딩을 추가했습니다",
  "tunnel.updated": "포워딩을 업데이트했습니다",
  "tunnel.removed": "포워딩을 제거했습니다",
  "tunnel.removeTitle": "이 포트 포워딩을 제거할까요?",
  "tunnel.removeMessage": "{tunnel}이(가) 중지되고 {host}에서 제거됩니다.",
  "tunnel.label": "레이블",
  "tunnel.labelHint": "선택 사항, 주소 대신 표시됩니다",
  "tunnel.labelPlaceholder": "예: 프로덕션 데이터베이스",
  "tunnel.listenAddress": "수신 주소",
  "tunnel.listenPort": "수신 포트",
  "tunnel.bindAddress": "서버의 바인드 주소",
  "tunnel.bindAddressHint": "루프백이 아니면 “GatewayPorts yes”가 필요합니다",
  "tunnel.remotePort": "원격 포트",
  "tunnel.autoPort": "0 = 자동",
  "tunnel.destHost": "대상 호스트",
  "tunnel.destHostLocalHint": "이 컴퓨터에서 해석",
  "tunnel.destHostRemoteHint": "서버에서 해석하므로 내부 이름도 쓸 수 있습니다",
  "tunnel.destPort": "대상 포트",
  "tunnel.autoStart": "연결과 함께 시작",
  "tunnel.autoStartHint": "이 호스트가 연결될 때마다 시작되며, 재연결 후에도 마찬가지입니다.",
  "tunnel.autoBadge": "자동",
  "tunnel.exposedWarning":
    "네트워크에서 이 기기에 닿을 수 있는 누구나 이 포워딩을 쓸 수 있습니다. 공유할 생각이 아니면 " +
    "127.0.0.1을 쓰세요.",
  "tunnel.badRemotePort": "원격 포트는 0에서 65535 사이여야 합니다",
  "tunnel.badListenPort": "수신 포트는 1에서 65535 사이여야 합니다",
  "tunnel.destHostRequired": "대상 호스트가 필요합니다",
  "tunnel.badDestPort": "대상 포트는 1에서 65535 사이여야 합니다",
  "tunnel.anywhere": "임의 대상",
  "tunnel.serverWord": "서버",
  "tunnel.usageLocal": "{where}에 연결",
  "tunnel.usageRemote": "서버에서: {where}",
  "tunnel.usageDynamic": "{where}의 SOCKS5 프록시",
  "tunnel.stateActive": "실행 중",
  "tunnel.stateStarting": "시작하는 중…",
  "tunnel.stateStopped": "중지됨",
  "tunnel.stateFailed": "실패",
  "tunnel.start": "시작",
  "tunnel.stop": "중지",
  "tunnel.startAll": "모두 시작",
  "tunnel.stopAll": "모두 중지",
  "tunnel.connections": "연결 수",
  "tunnel.copyAddress": "주소 복사",
  "tunnel.addressCopied": "주소를 복사했습니다",
  "tunnel.lastError": "마지막 오류: {error}",
  "tunnel.sessionDown": "세션이 연결되지 않았습니다. 다시 연결되면 포워딩이 다시 시작됩니다.",
  "tunnel.empty": "아직 포트 포워딩이 없습니다",
  "tunnel.emptyNote":
    "포트를 포워딩하면 이 서버를 통해 데이터베이스나 내부 대시보드에 갈 수 있고, " +
    "SOCKS 프록시를 열어 그곳에서 웹을 둘러볼 수도 있습니다.",
  "tunnel.editorEmpty":
    "포트를 포워딩하면 이 호스트를 통해 데이터베이스나 내부 서비스에 갈 수 있고, " +
    "SOCKS 프록시를 열어 그곳에서 웹을 둘러볼 수도 있습니다.",

  /* ---- Assistant panel ---- */
  "assistant.title": "AI 도우미",
  "assistant.welcome": "서버를 함께 관리해 볼까요",
  "assistant.welcomeNote":
    "이 터미널을 읽고, 별도 채널에서 명령을 실행하며, 저장한 모든 호스트에서 작업할 수 있습니다.",
  "assistant.createQuickPrompts": "빠른 질문 만들기",
  "assistant.newConversation": "새 대화",
  "assistant.chats": "대화",
  "assistant.chatHistory": "대화 기록",
  "assistant.working": "처리 중",
  "assistant.send": "보내기",
  "assistant.stop": "중지",
  "assistant.askAbout": "{about}에 대해 묻기",
  "assistant.costHint": "이 대화의 예상 비용, 토큰당 과금",

  "assistant.currentSession": "현재 세션",
  "assistant.nothingConnected": "연결된 세션이 없습니다",
  "assistant.noSessionOpen": "열린 세션이 없습니다",
  "assistant.yourServers": "내 서버",
  "assistant.anyHost": "임의 호스트",
  "assistant.closedSession": "닫힌 세션",
  "assistant.savedHost": "저장된 호스트",
  "assistant.savedHosts": "저장된 호스트",
  "assistant.openSessions": "열린 세션",
  "assistant.allHostsHint": "저장된 모든 호스트와 열린 세션",
  "assistant.serverCount": "서버 {count}대",
  "assistant.sessionsOpen_other": "세션 {count}개 열림",
  "assistant.notConnected": "연결되지 않음",
  "assistant.searchScope": "서버 검색",
  "assistant.searchScopeAria": "세션과 호스트 검색",

  "assistant.model": "모델",
  "assistant.modelAndEffort": "모델과 사고 강도",
  "assistant.readingModels": "모델 목록을 읽는 중…",
  "assistant.noModels": "보고된 모델이 없습니다. 다시 시도하세요",
  "assistant.notInRuntimeList": "이 런타임 목록에 없음",
  "assistant.agentDefault": "{agent} 기본값",
  "assistant.agentDefaultHint": "설치한 {agent}가 쓰는 것을 그대로 사용",
  "assistant.effort": "사고 강도",
  "assistant.effortLow": "낮음",
  "assistant.effortMedium": "중간",
  "assistant.effortHigh": "높음",
  "assistant.effortXHigh": "매우 높음",
  "assistant.effortMax": "최대",
  "assistant.effortUltra": "초고",

  "assistant.approvalsLabel": "승인 방식: {mode}",
  "assistant.approvalAlways": "매번 묻기",
  "assistant.approvalAlwaysHint": "모든 도구 호출이 확인을 기다립니다",
  "assistant.approvalWrites": "변경 전에 묻기",
  "assistant.approvalWritesHint": "읽기는 자유롭게 진행됩니다",
  "assistant.approvalNever": "자유 모드",
  "assistant.approvalNeverHint": "삭제를 포함해 아무것도 멈추지 않습니다",

  "assistant.didListHosts": "호스트를 나열함",
  "assistant.didListSessions": "세션을 나열함",
  "assistant.didReadTerminal": "터미널을 읽음",
  "assistant.didRun": "실행함",
  "assistant.didType": "입력함",
  "assistant.didList": "나열함",
  "assistant.didRead": "읽음",
  "assistant.didWrite": "씀",
  "assistant.didConnect": "연결함",
  "assistant.didDisconnect": "세션을 닫음",
  "assistant.lastLines": "마지막 {count}줄",
  "assistant.recentOutput": "최근 출력",
  "assistant.matching": '"{query}"와 일치',

  "assistant.askRunCommand": "명령 실행",
  "assistant.askSendInput": "터미널에 입력",
  "assistant.askWriteFile": "파일 덮어쓰기",
  "assistant.askConnectHost": "연결 열기",
  "assistant.askDisconnect": "세션 닫기",
  "assistant.askReadTerminal": "터미널 읽기",
  "assistant.askReadFile": "파일 읽기",
  "assistant.askListDirectory": "디렉터리 나열",
  "assistant.askListHosts": "저장된 호스트 나열",
  "assistant.askListSessions": "열린 세션 나열",
  "assistant.askRunLocally": "로컬에서 {tool} 실행",
  "assistant.onHost": "{host}에서",
  "assistant.allow": "허용",
  "assistant.decline": "거부",
  "assistant.somethingElse": "다른 방법…",
  "assistant.insteadPlaceholder": "대신 무엇을 해야 할까요?",
  "assistant.copyCommand": "명령 복사",
  "assistant.localWarning": "서버가 아니라 내 컴퓨터에서 실행됩니다.",
  "assistant.allowed": "허용됨",
  "assistant.declined": "거부됨",
  "assistant.timedOut": "시간 초과",

  /* ---------------------------------------------------------------- *
   * Connection overlay (host key, extra auth, retry)
   * ---------------------------------------------------------------- */
  "session.additionalAuth": "추가 인증 필요",
  "session.closePane": "창 닫기",
  "session.connectingTo": "{title}에 연결하는 중",
  "session.continue": "계속",
  "session.copied": "복사됨",
  "session.copyFingerprint": "지문 복사",
  "session.couldNotConnect": "연결할 수 없음",
  "session.disconnect": "연결 끊기",
  "session.hostKeyChanged": "호스트 키가 변경됨",
  "session.hostKeyChangedDesc":
    "이 서버가 제시한 키가, 이전에 이 주소에 대해 신뢰한 키와 다릅니다.",
  "session.hostKeyChangedWarn":
    "서버를 다시 설치하거나 키를 바꾼 경우에도 이렇게 보입니다. 중간자 가로채기도 이렇게 보입니다. 어느 쪽인지 확인하기 전에는 계속하지 마세요.",
  "session.hostKeyUnknown": "알 수 없는 호스트 키",
  "session.hostKeyUnknownDesc":
    "이 서버는 처음 보는 것입니다. 이 연결에서 본 것이 아니라, 서버 자체에서 받은 지문으로 대조하세요.",
  "session.replaceStoredKey": "저장된 키 바꾸기",
  "session.response": "응답",
  "session.retryAttempt": "({attempt} / {max}회)",
  "session.retryIn": "{seconds}초 후 다시 시도",
  "session.retryNow": "지금 다시 시도",
  "session.statusConnected": "연결됨",
  "session.statusConnecting": "연결 중…",
  "session.statusDisconnected": "연결 끊김",
  "session.statusFailed": "연결 끊김, 다시 연결할 수 없음",
  "session.statusFailedShort": "다시 연결할 수 없음",
  "session.statusReconnecting": "다시 연결하는 중…",
  "session.statusRetrying": "{seconds}초 후 다시 연결({attempt} / {max}회)",
  "session.statusRetryingShort": "{seconds}초 후 다시 시도",
  "session.trustAndConnect": "신뢰하고 연결",
  "session.tryAgain": "다시 시도",
  "session.unknownKeyType": "알 수 없음",
};

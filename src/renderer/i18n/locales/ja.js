/**
 * 日本語 (Japanese).
 *
 * Japanese has one plural form, so every counted string is stored as `_other`
 * alone. Anything missing here falls back to en.js.
 */
export default {
  /* ---- Shared words ---- */
  "common.allFiles": "すべてのファイル",
  "common.apply": "適用",
  "common.cancel": "キャンセル",
  "common.change": "変更",
  "common.changeEllipsis": "変更…",
  "common.clear": "クリア",
  "common.close": "閉じる",
  "common.filter": "フィルター",
  "common.filtered": "フィルター済み。",
  "common.keepCurrentColors": "プリセットなし（現在の色を維持）",
  "common.left": "左",
  "common.loading": "読み込み中…",
  "common.noFilterMatches": "この条件に一致するものはありません。",
  "common.noMatches": "「{query}」に一致するものはありません",
  "common.noMatchesTitle": "一致なし",
  "common.off": "オフ",
  "common.remove": "削除",
  "common.reset": "リセット",
  "common.right": "右",
  "common.save": "保存",
  "common.saveAndApply": "保存して適用",
  "common.startFrom": "これを起点にする",
  "common.working": "処理中…",

  /* ---- Sidebar ---- */
  "nav.hosts": "ホスト",
  "nav.keychain": "キーチェーン",
  "nav.proxies": "プロキシ",
  "nav.snippets": "スニペット",
  "nav.logs": "ログ",
  "nav.settings": "設定",

  /* ---- Hosts ---- */
  "hosts.count_other": "{count} 台のホスト",
  "hosts.folderCount_other": "{count} 個のフォルダー",
  "hosts.empty": "ホストはまだありません",
  "hosts.emptyNote": "サーバーを追加して始めましょう。",
  "hosts.emptyFolder": "ここはまだ空です",
  "hosts.layout": "カードレイアウト",
  "hosts.newFolder": "新しいフォルダー",
  "hosts.newHost": "新しいホスト",
  "hosts.search": "ホストを検索",
  "hosts.viewGrid": "グリッド",
  "hosts.viewList": "リスト",

  /* ---- Host editor ---- */
  "hosts.editor.titleNew": "新しいホスト",
  "hosts.editor.titleEdit": "ホストを編集",
  "hosts.editor.subtitle": "接続先、認証方法、接続後に行うことを指定します。",
  "hosts.editor.thisHostIs": "このホストは",
  "hosts.kind.ssh": "SSH",
  "hosts.kind.telnet": "Telnet",
  "hosts.kind.serial": "シリアル",
  "hosts.kind.desktop": "デスクトップ",
  "hosts.kind.ipmi": "IPMI",
  "hosts.editor.telnetWarning":
    "Telnet は暗号化されません。ログインプロンプトで入力した内容を含め、送信したすべてが経路上の機器から読み取れます。より良い手段がない場合にだけ使ってください。",
  "hosts.editor.hostname": "ホスト名 / IP",
  "hosts.editor.hostnameDesktopHint":
    "デスクトップのアドレスです。下の「リモートデスクトップ」で別のアドレスを指定しない限り、ここが使われます。",
  "hosts.editor.hostnameIpmiHint":
    "サービスプロセッサのアドレスです。下の「IPMI」で別のアドレスを指定しない限り、ここが使われます。",
  "hosts.editor.port": "ポート",
  "hosts.editor.username": "ユーザー名",
  "hosts.editor.authMethod": "認証方式",
  "hosts.editor.auth.password": "パスワード",
  "hosts.editor.auth.passwordHint": "保存済みのパスワードでログインする",
  "hosts.editor.auth.keychain": "キーチェーン",
  "hosts.editor.auth.keychainHint": "アプリのキーチェーンにある鍵を使う",
  "hosts.editor.auth.key": "鍵",
  "hosts.editor.auth.keyHint": "このホスト専用の秘密鍵を貼り付ける",
  "hosts.editor.auth.agent": "Agent",
  "hosts.editor.auth.agentHint": "SSH agent が保持している鍵を使う",
  "hosts.editor.sshKey": "SSH 鍵",
  "hosts.editor.noKeysInKeychain":
    "SSH 鍵がまだありません。先に「キーチェーン」ページで追加してください。",
  "hosts.editor.selectKey": "鍵を選択…",
  "hosts.editor.password": "パスワード",
  "hosts.editor.passwordPlaceholderStored": "保存済み。空のままなら変更しません",
  "hosts.editor.passwordPlaceholder": "••••••••",
  "hosts.editor.showPassword": "パスワードを表示",
  "hosts.editor.hidePassword": "パスワードを隠す",
  "hosts.editor.storedPasswordHint": "このホストにはパスワードが保存されています。",
  "hosts.editor.privateKey": "秘密鍵",
  "hosts.editor.privateKeyPlaceholderStored": "保存済み。空のままなら変更しません",
  "hosts.editor.privateKeyPlaceholder": "-----BEGIN OPENSSH PRIVATE KEY-----…",
  "hosts.editor.storedPrivateKeyHint": "このホストには秘密鍵が保存されています。",
  "hosts.editor.keyPassphrase": "鍵のパスフレーズ",
  "hosts.editor.keyPassphrasePlaceholder": "鍵にパスフレーズがなければ空のまま",
  "hosts.editor.chooseKeyFile": "鍵ファイルを選択…",
  "hosts.editor.optional": "任意",
  "hosts.editor.disclosure.nameAndTags": "名前とタグ",
  "hosts.editor.displayName": "表示名",
  "hosts.editor.displayNameHint": "空のときはホスト名 / IP で表示されます。",
  "hosts.editor.displayNamePlaceholder": "例：本番サーバー",
  "hosts.editor.tags": "タグ",
  "hosts.editor.tagsHint":
    "タグはフォルダーをまたいで使えます。ホストは 1 つのフォルダーに属しますが、タグはいくつでも付けられます。",
  "hosts.editor.disclosure.connectThrough": "次のホスト経由で接続",
  "hosts.editor.connectDirectly": "直接接続",
  "hosts.editor.jumpHintWith":
    "先にこのホストへダイヤルし、そこから開いたチャネルで目的のホストへ到達します。セッション内容は端から端まで暗号化され、ジャンプホストからは読めません。",
  "hosts.editor.jumpHintWithout":
    "このマシンから目的のホストへ直接届かないときは、届く踏み台を指定してください。",
  "hosts.editor.disclosure.proxies": "プロキシ",
  "hosts.editor.proxyHintWith":
    "上のアドレスへ到達するために、このプロキシ経由でソケットを開きます。ファイル、ポート転送、リモートデスクトップなど、セッション上のすべてがこのプロキシを通ります。",
  "hosts.editor.proxyHintWithout":
    "目的のネットワークが SOCKS または HTTP プロキシ経由でしか届かないときに使います。プロキシは「プロキシ」ページで管理できます。",
  "hosts.editor.noProxiesSaved": "プロキシがまだありません。先に「プロキシ」ページで追加してください。",
  "hosts.editor.dialStraightOut": "直接発信",
  "hosts.editor.proxyJumpNote":
    "{jump} 経由で到達します。このマシンからの唯一の発信先は {jump} なので、そのプロキシ設定が接続を開きます。ジャンプを使わないときは、ここで選んだプロキシが使われます。",
  "hosts.editor.disclosure.runOnConnect": "接続後に実行",
  "hosts.editor.initHintSsh":
    "シェルが開いた直後に送信され、再接続後にも再度送られます。1 行に 1 コマンドです。",
  "hosts.editor.initHintOther":
    "セッションが開いた直後に送信され、プロンプトは待ちません。プロンプト検出はないため、ログインを求める機器ではログインプロンプトにそのまま打ち込まれます。",
  "hosts.editor.initPlaceholderSsh": "cd /srv/app && tmux attach",
  "hosts.editor.initPlaceholderOther": "terminal length 0",
  "hosts.editor.disclosure.monitoring": "監視",
  "hosts.editor.watchThisHost": "このホストを監視する",
  "hosts.editor.watchDesc":
    "アプリを開いているあいだ、このホストが応答しているかを定期的に確認します。応答が止まると通知を 1 回出し、復帰するまでカードをオフラインとしてマークします。",
  "hosts.editor.checkPort": "確認するポート",
  "hosts.editor.checkPortHint":
    "空ならこのホストの接続ポートを使います。別のポートを指定すれば、ログインポートではなく同じマシン上の Web サービスやデータベースを監視できます。",
  "hosts.editor.checkPortHintDefault":
    "空なら、このホストが接続に使うポートで確認します。",
  "hosts.editor.checkPortHintDefaultOn":
    "空なら、このホストが接続に使うポート {port} で確認します。",
  "hosts.editor.monitorSummary": "監視中",
  "hosts.editor.monitorSummaryWithPort": "ポート {port} を監視",
  "hosts.editor.advancedSummary": "古いアルゴリズムを許可済み",
  "hosts.editor.desktopRdp": "RDP",
  "hosts.editor.desktopVnc": "VNC",
  "hosts.editor.bmcSameHost": "ホストと同じ",
  "hosts.editor.aJumpHost": "ジャンプホスト",
  "hosts.editor.monitoringOffForApp":
    "アプリの監視機能がオフのため、このホストは設定されていても現在は確認されません。",
  "hosts.editor.turnItOn": "今すぐオンにする",
  "hosts.editor.disclosure.portForwarding": "ポート転送",
  "hosts.editor.disclosure.remoteDesktop": "リモートデスクトップ",
  "hosts.editor.disclosure.ipmi": "IPMI",
  "hosts.editor.disclosure.advanced": "詳細",
  "hosts.editor.allowLegacy": "古いアルゴリズムを許可",
  "hosts.editor.allowLegacyDesc":
    "古いサーバー向けに SHA-1、CBC、3DES を有効にします。接続の安全性が下がるため、ハンドシェイクが失敗しない限りオフのままにしてください。",
  "hosts.editor.cancel": "キャンセル",
  "hosts.editor.save": "ホストを保存",
  "hosts.editor.create": "ホストを作成",

  /* ---- Keychain ---- */
  "keychain.count_other": "{count} 個の鍵",
  "keychain.empty": "鍵はまだありません",
  "keychain.emptyNote": "生成するかインポートして始めましょう。",
  "keychain.helloAdd": "この PC の TPM に保存する Windows Hello 鍵を追加",
  "keychain.helloWaiting": "Windows Hello を待っています…",
  "keychain.import": "ファイルまたは貼り付けから既存の鍵をインポート",
  "keychain.newKey": "新しい鍵",
  "keychain.search": "鍵を検索",
  "keychain.editor.titleHello": "Windows Hello 鍵",
  "keychain.editor.titleEdit": "SSH 鍵を編集",
  "keychain.editor.titleGenerate": "SSH 鍵を生成",
  "keychain.editor.titleImport": "SSH 鍵をインポート",
  "keychain.editor.subtitleHello":
    "秘密鍵はこの PC の TPM にあります。このアプリを含め、誰も読み取れません。",
  "keychain.editor.subtitle": "鍵はアプリのキーチェーンに保存され、メインプロセスの外へは出ません。",
  "keychain.editor.save": "鍵を保存",
  "keychain.editor.name": "鍵の名前",
  "keychain.editor.namePlaceholder": "例：GitHub 用の鍵",
  "keychain.editor.helloHeld": "Windows Hello が保管",
  "keychain.editor.helloBody":
    "秘密鍵はこの PC の TPM にあり、エクスポート、コピー、バックアップはできません。このアプリでもあなたでもできません。接続のたびに Windows Hello が求められます。",
  "keychain.editor.helloWarn":
    "このマシンでしか使えません。別の場所への再インストールや Windows Hello のリセットで永久に失われます。締め出されないよう、サーバーには別の鍵も残してください。",
  "keychain.editor.publicKey": "公開鍵",
  "keychain.editor.publicKeyOptional": "公開鍵（任意）",
  "keychain.editor.publicKeyHelloHint":
    "この 1 行を、ログインしたいサーバーの ~/.ssh/authorized_keys に入れてください。",
  "keychain.editor.publicKeyImportHint": "貼り付けると指紋とアルゴリズムを記録できます。",
  "keychain.editor.publicKeyCopied": "公開鍵をコピーしました",
  "keychain.editor.copy": "コピー",
  "keychain.editor.fingerprint": "指紋",
  "keychain.editor.keyType": "鍵の種類",
  "keychain.editor.typeEd25519": "新しく、速く、安全（推奨）",
  "keychain.editor.typeEcdsa": "楕円曲線 DSA",
  "keychain.editor.typeRsa": "従来の RSA 鍵",
  "keychain.editor.curveSize": "楕円曲線の長さ（ビット）",
  "keychain.editor.keySize": "鍵の長さ（ビット）",
  "keychain.editor.keySizeHint": "任意です。未指定なら ssh-keygen の既定値が使われます。",
  "keychain.editor.comment": "コメント",
  "keychain.editor.commentHint": "任意です。鍵そのものに書き込まれます。",
  "keychain.editor.commentPlaceholder": "例：user@example.com",
  "keychain.editor.passphrase": "パスフレーズ",
  "keychain.editor.passphraseGenerateHint": "任意です。生成した鍵はこのパスフレーズで暗号化されます。",
  "keychain.editor.passphraseGeneratePlaceholder": "パスフレーズなしなら空のまま",
  "keychain.editor.generating": "生成中…",
  "keychain.editor.generate": "鍵ペアを生成",
  "keychain.editor.importFromFile": "ファイルからインポート",
  "keychain.editor.importFromFileHint":
    "id_ed25519 のような鍵ファイルを選びます。隣の .pub や -cert.pub も一緒に読み込まれ、このウィンドウを通りません。",
  "keychain.editor.choosing": "選択中…",
  "keychain.editor.chooseFile": "ファイルを選択",
  "keychain.editor.chooseAnother": "別のファイルを選ぶ",
  "keychain.editor.pasteInstead": "貼り付けに切り替える",
  "keychain.editor.privateKey": "秘密鍵",
  "keychain.editor.privateKeyFromFile": "{file} から秘密鍵を読み込みました",
  "keychain.editor.privateKeyGenerated": "秘密鍵を生成しました",
  "keychain.editor.privateKeyHeld": "アプリが保管し、保存時にシステムのキーストアで暗号化します。",
  "keychain.editor.privateKeyStoredPlaceholder": "保存済み。空のままなら既存の鍵を維持します",
  "keychain.editor.hidePrivate": "秘密鍵を隠す",
  "keychain.editor.showPrivate": "秘密鍵を表示",
  "keychain.editor.hidePassphrase": "パスフレーズを隠す",
  "keychain.editor.showPassphrase": "パスフレーズを表示",
  "keychain.editor.certificate": "証明書（任意）",
  "keychain.editor.certHintEmpty":
    "CA が発行し、裸の鍵の代わりに使います。*-cert.pub を貼り付けてください。",
  "keychain.editor.certNeverExpires": "期限なし",
  "keychain.editor.certExpired": "{date} に期限切れ",
  "keychain.editor.certValidUntil": "{date} まで有効",
  "keychain.editor.certLogsInAs": "{names} としてログイン",
  "keychain.editor.certAnyUser": "任意のユーザー名に有効",
  "keychain.editor.certSummary": "{who} · {expiry} · CA {ca}",
  "keychain.editor.passphraseFileEncrypted":
    "{file} は暗号化されています。パスフレーズがないと接続できません。",
  "keychain.editor.passphraseStoredHint": "この鍵にはパスフレーズが保存されています。空のままなら維持します。",
  "keychain.editor.passphraseImportHint": "上の秘密鍵が暗号化されているときだけ必要です。",
  "keychain.editor.passphraseStoredPlaceholder": "保存済み。空のままなら維持します",
  "keychain.editor.passphraseNonePlaceholder": "鍵にパスフレーズがなければ空のまま",
  "keychain.editor.dangerZone": "危険な操作",
  "keychain.editor.dangerZoneDesc": "削除すると元に戻せません。確認してから実行してください。",
  "keychain.editor.delete": "この鍵を削除",

  /* ---- Proxies ---- */
  "proxies.empty": "プロキシはまだありません",
  "proxies.emptyNote":
    "SOCKS または HTTP プロキシを追加すると、どのホストもそこ経由で接続できます。ターミナルセッション、SFTP、" +
    "ポート転送、リモートデスクトップも同様です。",
  "proxies.newProxy": "新しいプロキシ",
  "proxies.search": "プロキシを検索",
  "proxies.editor.titleNew": "新しいプロキシ",
  "proxies.editor.titleEdit": "プロキシを編集",
  "proxies.editor.subtitle":
    "ダイヤルを中継するサーバーです。ホストはこれを指し、接続後はそれぞれのプロトコルを使います。",
  "proxies.editor.check": "応答するか確認",
  "proxies.editor.checking": "確認中…",
  "proxies.editor.create": "プロキシを作成",
  "proxies.editor.save": "プロキシを保存",
  "proxies.editor.speaks": "このプロキシは",
  "proxies.editor.address": "プロキシアドレス",
  "proxies.editor.port": "ポート",
  "proxies.editor.name": "名前",
  "proxies.editor.nameHint": "任意です。空ならアドレスで表示されます。",
  "proxies.editor.namePlaceholder": "例：オフィスの踏み台プロキシ",
  "proxies.editor.username": "ユーザー名",
  "proxies.editor.usernamePlaceholder": "不要なら空のまま",
  "proxies.editor.password": "パスワード",
  "proxies.editor.passwordStored": "保存済み。空のままなら維持します",
  "proxies.editor.passwordStoredHint": "このプロキシにはパスワードが保存されています。",
  "proxies.editor.showPassword": "パスワードを表示",
  "proxies.editor.hidePassword": "パスワードを隠す",
  "proxies.editor.ident": "Ident",
  "proxies.editor.identHint":
    "SOCKS4 のユーザー識別として平文で送られます。ほとんどのプロキシは無視します。相手が検証していない限り空のままにしてください。",
  "proxies.editor.identPlaceholder": "通常は空",
  "proxies.editor.opening": "プロキシに接続しています…",
  "proxies.editor.optional": "任意",
  "proxies.editor.reachedThrough": "次のプロキシ経由で到達",
  "proxies.editor.viaHintWith":
    "先にそのプロキシへダイヤルし、そこ経由でこのプロキシへ到達します。各ホップは次のホップしか知らず、遠端からは経路の最後のホップが見えます。",
  "proxies.editor.viaHintWithout":
    "このマシンからそのプロキシへ直接届かないときは、届くプロキシを指定してください。",
  "proxies.editor.dialFromHere": "このマシンから直接ダイヤル",
  "proxies.editor.advanced": "詳細",
  "proxies.editor.remoteDns": "ホスト名の解決をプロキシに任せる",
  "proxies.editor.remoteDnsSocks4":
    "アドレスではなくホスト名を送ります。これは SOCKS4a が追加した機能です。ホスト名を受け付けない古いプロキシのときだけオフにしてください。",
  "proxies.editor.remoteDnsDesc":
    "このマシンでは DNS を行わないため、どのホストへ向かっているかはここからは分かりません。分割ネットワークでも解決できる側で名前解決されます。プロキシがホスト名を拒否するときだけオフにしてください。",
  "proxies.editor.timeout": "タイムアウト",
  "proxies.editor.timeoutHint":
    "プロキシがこの時間内に接続を受け入れて応答する必要があります。セッションそのものが切られることはありません。",
  "proxies.editor.seconds": "秒",

  /* ---- Snippets ---- */
  "snippets.count_other": "{count} 個のスニペット",
  "snippets.empty": "スニペットはまだありません",
  "snippets.emptyNote": "どのマシンでも繰り返し入力するコマンドを保存しておきましょう。",
  "snippets.newPackage": "新しいパッケージ",
  "snippets.newSnippet": "新しいスニペット",
  "snippets.nothingShown": "表示できるものはありません",
  "snippets.search": "スニペットを検索",
  "snippets.showing": "表示中：{kind}",
  "snippets.kind.all": "すべて",
  "snippets.kind.command": "コマンドのみ",
  "snippets.kind.package": "パッケージのみ",
  "snippets.editor.titleNew": "新しいスニペット",
  "snippets.editor.titleEdit": "スニペットを編集",
  "snippets.editor.titleNewPackage": "新しいパッケージ",
  "snippets.editor.titleEditPackage": "パッケージを編集",
  "snippets.editor.subtitle": "パネルに保存し、セッションへ挿入できる 1 つのコマンドです。",
  "snippets.editor.subtitlePackage": "決めた順にセッションへ送る一連のコマンドです。",
  "snippets.editor.add": "スニペットを追加",
  "snippets.editor.addPackage": "パッケージを追加",
  "snippets.editor.kind": "種類",
  "snippets.editor.kindCommand": "コマンド",
  "snippets.editor.kindPackage": "パッケージ",
  "snippets.editor.kindCommandHint": "プロンプトに挿入する 1 つのテキストです。",
  "snippets.editor.kindPackageHint":
    "手順は設定した順に実行されます。ここで書くことも、ライブラリから選ぶこともできます。",
  "snippets.editor.name": "名前",
  "snippets.editor.namePlaceholder": "例：nginx のエラーを追跡",
  "snippets.editor.namePlaceholderPackage": "例：デプロイして再起動",
  "snippets.editor.command": "コマンド",
  "snippets.editor.commandHint":
    "尋ねたい内容は二重の波括弧で囲みます。例：{{service}}。",
  "snippets.editor.willAskFor": "尋ねる項目",
  "snippets.editor.description": "説明",
  "snippets.editor.descriptionHint": "任意です。名前と一緒に検索されます。",
  "snippets.editor.descriptionPlaceholder": "何をするか、いつ使うか",
  "snippets.editor.tags": "タグ",
  "snippets.editor.tagsHint": "カンマ区切りです。",
  "snippets.editor.availableOn": "利用できる場所",
  "snippets.editor.allHosts": "すべてのホスト",
  "snippets.editor.specificHosts": "指定したホスト",
  "snippets.editor.noHostWarning": "ホストを選ばないと、このスニペットはどこにも表示されません。",
  "snippets.editor.runImmediately": "挿入したらすぐに実行",
  "snippets.editor.runImmediatelyCommand":
    "代わりに Enter を押します。オフなら、先にプロンプトへ置いて確認できます。",
  "snippets.editor.runImmediatelyPackage":
    "代わりに Enter を押し、一連の手順を開始します。オフなら、先にプロンプトへ置いて確認できます。",

  "folders.editor.titleNew": "新しいフォルダー",
  "folders.editor.titleEdit": "フォルダーを編集",
  "folders.editor.subtitle":
    "フォルダーはホストをグループ化します。フォルダーを削除しても中のホストは消えません。",
  "folders.editor.create": "フォルダーを作成",
  "folders.editor.save": "フォルダーを保存",
  "folders.editor.name": "フォルダー名",
  "folders.editor.namePlaceholder": "例：AWS サーバー",

  /* ---- Logs ---- */
  "logs.blurbStart":
    "このマシンで確立したすべての接続と変更したすべての記録です。新しいものが上です。記録時にはログイン中のシステムアカウント",
  "logs.blurbEnd":
    "が関連付けられ、操作者が別人のときだけその行に示されます。パスワードと鍵の内容は記録されません。",
  "logs.categoryConnection": "接続",
  "logs.categoryData": "変更",
  "logs.categoryFiles": "ファイル",
  "logs.categorySecurity": "セキュリティ",
  "logs.empty": "記録はまだありません",
  "logs.emptyNote": "接続と変更は発生したときにここに現れます。",
  "logs.export": "JSON として書き出す",
  "logs.filterAll": "すべて",
  "logs.filterAria": "アクティビティログを絞り込む",
  "logs.noMatches": "この条件に一致する記録はありません",
  "logs.noMatchesNote": "別の分類にするか、フィルターを空にしてください。",
  "logs.problemsOnly": "問題のみ",
  "logs.reading": "ログを読み込んでいます…",
  "logs.refresh": "更新",

  /* ---- New session tab ---- */
  "newTab.title": "新しいセッション",
  "newTab.subtitle": "ホストを選ぶか、アドレスを直接入力して接続します。",
  "newTab.searchPlaceholder": "ホストを検索、またはアドレスを入力…",
  "newTab.recent": "最近使ったもの",
  "newTab.allHosts": "すべてのホスト",
  "newTab.notSaved": "未保存",
  "newTab.notSavedNote": "未保存です。接続時にログイン情報を尋ねます。",
  "newTab.connectTo": "接続先",
  "newTab.hintNavigate": "移動",
  "newTab.hintConnect": "接続",
  "newTab.hintClose": "タブを閉じる",

  /* ---- Title bar ---- */
  "titleBar.reload": "再読み込み",
  "titleBar.devTools": "開発者ツール",
  "titleBar.minimize": "最小化",
  "titleBar.maximize": "最大化",
  "titleBar.exit": "終了",
  "titleBar.rename": "名前を変更…",
  "titleBar.renameAria": "{name} の名前を変更",
  "titleBar.renameGroup": "グループ名を変更…",
  "titleBar.renameGroupAria": "グループ {name} の名前を変更",
  "titleBar.useHostName": "ホスト名に戻す",
  "titleBar.colour": "色",
  "titleBar.removeFromGroup": "グループから外す",
  "titleBar.newGroup": "このタブで新しいグループを作る",
  "titleBar.moveToGroup": "「{group}」へ移動",
  "titleBar.duplicate": "複製",
  "titleBar.reconnect": "再接続",
  "titleBar.reconnectAll": "すべて再接続",
  "titleBar.disconnect": "切断",
  "titleBar.disconnectAll": "すべて切断",
  "titleBar.closeTab": "タブを閉じる",
  "titleBar.closeOthers": "他のタブを閉じる",
  "titleBar.closeRight": "右側のタブを閉じる",
  "titleBar.ungroup": "グループを解除",
  "titleBar.closeGroupTabs_other": "{count} 個のタブをすべて閉じる",

  /* ---- Monitoring vocabulary ---- */
  "monitor.every30s": "30 秒",
  "monitor.every1min": "1 分",
  "monitor.every5min": "5 分",
  "monitor.every15min": "15 分",
  "monitor.wait5s": "5 秒",
  "monitor.wait10s": "10 秒",
  "monitor.wait20s": "20 秒",
  "monitor.wait30s": "30 秒",
  "monitor.onceFailed": "1 回",
  "monitor.twiceFailed": "2 回",
  "monitor.thriceFailed": "3 回",
  "monitor.stateOnline": "応答あり",
  "monitor.stateOffline": "応答なし",
  "monitor.stateProblem": "確認できない",
  "monitor.stateUnknown": "未確認",
  "monitor.unsupportedSerial": "シリアルコンソールには確認できるネットワークアドレスがありません。",
  "monitor.unsupportedJump":
    "このホストはジャンプホスト経由で到達するため、このマシンから直接確認できる経路がありません。代わりにジャンプホストを監視してください。",
  "monitor.justNow": "たった今",
  "monitor.minutesAgo": "{count} 分前",
  "monitor.hoursAgo": "{count} 時間前",
  "monitor.daysAgo": "{count} 日前",
  "monitor.notAnswering": "応答なし",
  "monitor.describeOffline": "{reason}、{when} から",
  "monitor.describeOnline": "応答あり、確認は {when}",
  "monitor.describeOnlineLatency": "応答あり、所要 {latency} ミリ秒、確認は {when}",
  "monitor.describeUnknown": "まだ確認していません",

  /* ---- App palette editor ---- */
  "appColors.subtitle":
    "アプリ全体はこの 6 つのサーフェス色で構成されます。ウィンドウの色を選ぶと残りは自動で導出されます。個別に指定することもできます。",
  "appColors.surfaces": "サーフェス",
  "appColors.derive": "1 色から導出",
  "appColors.deriveHint": "6 つの階層すべてを上書きし、アプリ本来の階層間隔を保ちます",
  "appColors.base": "ウィンドウ",
  "appColors.baseHint": "インターフェース全体の下地色",
  "appColors.raised": "パネル",
  "appColors.raisedHint": "カード、ダイアログ、サイドバー",
  "appColors.control": "コントロール",
  "appColors.controlHint": "ボタン、入力欄とその枠線",
  "appColors.hover": "ホバー",
  "appColors.hoverHint": "ポインターを重ねたときのコントロール",
  "appColors.active": "押下",
  "appColors.activeHint": "使用中のコントロールと区切り線",
  "appColors.muted": "補助テキスト",
  "appColors.mutedHint": "補助ラベルとプレースホルダー",

  /* ---- Terminal palette editor ---- */
  "termColors.title": "カスタム端末テーマ",
  "termColors.subtitle": "色を個別に選ぶか、内蔵テーマを起点にして必要なところだけ変えます。",
  "termColors.groupBase": "基本",
  "termColors.groupAnsi": "ANSI 色",
  "termColors.background": "背景",
  "termColors.foreground": "文字",
  "termColors.cursor": "カーソル",
  "termColors.selection": "選択範囲",
  "termColors.black": "黒",
  "termColors.red": "赤",
  "termColors.green": "緑",
  "termColors.yellow": "黄",
  "termColors.blue": "青",
  "termColors.magenta": "マゼンタ",
  "termColors.cyan": "シアン",
  "termColors.white": "白",

  /* ---- OpenSSH import ---- */
  "import.title": "OpenSSH からインポート",
  "import.desc":
    "~/.ssh/config と ~/.ssh/known_hosts を読み、ホスト、ポート転送、信頼済みの鍵をここに取り込みます。",
  "import.nothingFound":
    "{dir} には何も見つかりませんでした。ファイルを手で選ぶことはできます。",
  "import.scan": "~/.ssh をスキャン",
  "import.scanning": "スキャン中…",
  "import.scanFailed": "SSH 設定を読めませんでした：{reason}",
  "import.chooseConfigTitle": "SSH 設定ファイルを選択",
  "import.trustedKeys": "信頼済みのホスト鍵",
  "import.statusPresent": "追加済み",
  "import.statusConflict": "保存済みの鍵と異なります",
  "import.selectedOf": "{selected} / {count} を選択",
  "import.keyNote": "鍵 {name}",
  "import.keyNoteState": "鍵 {name}（{state}）",
  "import.included": "ほか {count} 件を含む",
  "import.nothingToImport": "これらのファイルに取り込めるものはありません。",
  "import.copyKeys": "これらのホストが参照する秘密鍵もコピーする",
  "import.copyKeysDesc":
    "各 IdentityFile はキーチェーンに読み込まれ、システムのキーストアで暗号化されます。オフにすると、" +
    "取り込んだホストは SSH agent を使うようになります。",
  "import.importing": "インポート中…",
  "import.importSelected": "選択した {count} 件をインポート",
  "import.nothingSelected": "何も選ばれていません",
  "import.imported": "{what} をインポートしました",
  "import.nothingNew": "新しく取り込めるものはありません",
  "import.failed": "インポートに失敗しました：{reason}",
  "import.hostKeyCount_other": "{count} 個のホスト鍵",
  "import.report":
    "ホスト {hosts} 台、鍵 {keys} 個、ホスト鍵 {hostKeys} 個をインポートしました。",
  "import.reportSkipped": "{count} 件は既に存在します。",
  "import.reportRelayed": "{count} 件をジャンプホスト経由に設定しました。",
  "import.skipHashed": "{count} 件はハッシュ済み",
  "import.skipPatterns": "{count} 件はワイルドカードを含む",
  "import.skipMarkers": "{count} 件は証明書または失効済み",
  "import.skipMalformed": "{count} 件は読めません",
  "import.skipped": "{what} をスキップしました",

  /* ---- Import from other apps ---- */
  "appImport.title": "ほかのアプリからインポート",
  "appImport.desc":
    "ホスト、ポート転送、フォルダー、シリアルやリモートデスクトップの設定も一緒に取り込まれます。パスワードは取り込まれません。" +
    "各アプリはそれぞれ独自の方法で暗号化して保存しています。",
  "appImport.checking": "確認中…",
  "appImport.notFound": "見つかりません",
  "appImport.sessionCount_other": "保存済みセッション {count} 件",
  "appImport.import": "インポート",
  "appImport.chooseFile": "MobaXterm ファイルを選択…",
  "appImport.choosePortable": "ポータブル版ですか？ MobaXterm ファイルを選択…",
  "appImport.chooseFileHint":
    "ポータブル版の MobaXterm.ini、または書き出した .mxtsessions ファイル",
  "appImport.chooseFileTitle": "MobaXterm.ini または .mxtsessions ファイルを選択",
  "appImport.fileKind": "MobaXterm セッション",
  "appImport.scanFailed": "{source} のセッションを読めませんでした：{reason}",
  "appImport.sessionsOf": "{app} セッション",
  "appImport.nothingIn": "{app} に取り込めるものはありません。",
  "appImport.inFolder": "{folder} 内",
  "appImport.keyEncrypted": "パスフレーズ保護あり",
  "appImport.keyNeedsConversion": "変換が必要",
  "appImport.keyUnreadable": "読めません",
  "appImport.copyKeysDesc":
    "各鍵ファイルはキーチェーンに読み込まれ、システムのキーストアで暗号化されます。オフにすると、" +
    "取り込んだホストは SSH agent を使うようになります。",
  "appImport.chooseNextsshTitle": "NextSSH バックアップファイルを選択",
  "appImport.copyNextsshKeysDesc":
    "バックアップ内の秘密鍵はキーチェーンに書き込まれ、システムのキーストアで暗号化されます。オフにすると、パスワードがあるホストはパスワードを使い、それ以外は SSH agent を使います。",
  "appImport.nextsshFileKind": "NextSSH バックアップ",
  "appImport.nextsshHint": "バックアップファイルを選択",
  "appImport.report": "ホスト {hosts} 台をインポートしました",

  /* ---- Settings navigation ---- */
  "settings.nav.aria": "設定の分類",
  "settings.nav.general": "一般",
  "settings.nav.appearance": "外観",
  "settings.nav.terminal": "ターミナル",
  "settings.nav.assistant": "AI アシスタント",
  "settings.nav.monitoring": "監視",
  "settings.nav.logging": "ログ記録",
  "settings.nav.security": "セキュリティ",
  "settings.nav.account": "WebDAV同期",
  "settings.nav.backup": "バックアップ / インポート",
  "settings.nav.about": "情報",

  /* ---- Settings: General ---- */
  "settings.general.title": "一般",
  "settings.general.desc": "アプリ起動時の動作です。",
  "settings.general.language": "言語",
  "settings.general.languageDesc":
    "アプリ自身の文言に使う言語です。ターミナル出力やサーバーが表示する内容はそのままです。",
  "settings.general.languageChanged": "言語を {language} に切り替えました",
  "settings.general.startup": "起動時に開く",
  "settings.general.startupDesc": "このコンピューターにログインしたとき、CloudTerm を自動で開く",
  "settings.general.startupOn": "ログイン時に CloudTerm が自動で開きます",
  "settings.general.startupOff": "ログイン時に CloudTerm は自動で開きません",
  "settings.general.startupFailed": "この設定を変更できませんでした",
  "settings.general.startupUnknown": "アプリがシステム起動時に開くかどうかを読めませんでした",
  "settings.general.restore": "セッションを復元",
  "settings.general.restoreDesc":
    "アプリを閉じたときに開いていたタブを開き直し、対応するホストへ再接続する",

  /* ---- Settings: Appearance ---- */
  "settings.appearance.title": "外観",
  "settings.appearance.desc": "アプリそのものの見た目です。",
  "settings.appearance.theme": "テーマ",
  "settings.appearance.themeDesc": "好みのインターフェーステーマを選びます",
  "settings.appearance.themeCustomDesc":
    "アプリはあなた自身の配色を使っています。下から起点を選ぶことも、個別に設定することもできます。",
  "settings.appearance.theme.light": "ライト",
  "settings.appearance.theme.dark": "ダーク",
  "settings.appearance.theme.system": "システムに合わせる",
  "settings.appearance.theme.custom": "カスタム",
  "settings.appearance.themeToast.light": "ライトモード",
  "settings.appearance.themeToast.dark": "ダークモード",
  "settings.appearance.themeToast.system": "システムに合わせる",
  "settings.appearance.themeToast.custom": "カスタム",
  "settings.appearance.themeChanged": "テーマを{theme}に切り替えました",
  "settings.appearance.appColors": "アプリの配色",
  "settings.appearance.appColorsDesc":
    "起点となる配色です。アプリ内の各サーフェスはこれから導出されます。",
  "settings.appearance.appColorsChanged": "アプリの配色を {palette} に切り替えました",
  "settings.appearance.yours": "あなたの配色",
  "settings.appearance.customColors": "カスタムカラー",
  "settings.appearance.customColorsDesc":
    "ウィンドウ、パネル、コントロール、文字の色を自分で設定する",
  "settings.appearance.editColors": "色を編集",
  "settings.appearance.colorsApplied": "配色を適用しました",
  "settings.appearance.showLogo": "ロゴを表示",
  "settings.appearance.showLogoDesc":
    "タイトルバーのロゴです。オフにすると、そのスペースはタブバーに使われます。",
  "settings.appearance.showLogoAria": "タイトルバーにロゴを表示",
  "settings.appearance.logoShown": "ロゴを表示しました",
  "settings.appearance.logoHidden": "ロゴを非表示にしました",
  "settings.appearance.customLogo": "カスタムロゴ",
  "settings.appearance.customLogoSet":
    "CloudBlast のロゴの代わりに、自分の画像を使います。",
  "settings.appearance.customLogoDesc":
    "CloudBlast のロゴの代わりに自分の画像を使います。PNG、JPG、GIF、" +
    "WebP、SVG、BMP、ICO に対応し、最大 512 KB です。",
  "settings.appearance.choosing": "選択中…",
  "settings.appearance.chooseImage": "画像を選択",
  "settings.appearance.logoUnreadable": "その画像を読めませんでした",
  "settings.appearance.logoSet": "ロゴを {name} に設定しました",
  "settings.appearance.logoCleared": "CloudBlast のロゴに戻しました",
  "settings.appearance.position": "位置",
  "settings.appearance.positionDesc":
    "ロゴをタイトルバーのどちら端に置くかです。メニューボタンのそばか、ウィンドウボタン側かです。",
  "settings.appearance.positionAria": "ロゴの位置",
  "settings.appearance.logoMovedLeft": "ロゴを左へ移しました",
  "settings.appearance.logoMovedRight": "ロゴを右へ移しました",

  /* ---- Settings: Terminal ---- */
  "settings.terminal.title": "ターミナル",
  "settings.terminal.desc": "セッション内シェルの見た目と、何を残すかです。",
  "settings.terminal.font": "フォント",
  "settings.terminal.fontAria": "ターミナルのフォント",
  "settings.terminal.fontDesc":
    "このマシンに実際に入っているフォントだけが一覧されます。JetBrains Mono はアプリに同梱されています。",
  "settings.terminal.fontMissing":
    "そのフォントはこのマシンになくなったため、ターミナルは JetBrains Mono に戻しました。",
  "settings.terminal.fontBundled": "内蔵",
  "settings.terminal.fontNotInstalled": "未インストール",
  "settings.terminal.size": "サイズ",
  "settings.terminal.sizeAria": "文字サイズ",
  "settings.terminal.sizeDesc":
    "開いているすべてのセッションに効きます。各セッションは再配置され、新しいウィンドウサイズを遠端へ伝えます。",
  "settings.terminal.weight": "字の太さ",
  "settings.terminal.weightDesc":
    "太字はコントラストを保ちます。ここでの設定より常に 300 重いです。",
  "settings.terminal.weightAria": "字の太さ",
  "settings.terminal.lineHeight": "行の高さ",
  "settings.terminal.lineHeightAria": "行の高さ",
  "settings.terminal.lineHeightDesc":
    "文字サイズの倍数です。行が高いほど入る行数は減り、そのことは遠端へ伝えられます。",
  "settings.terminal.letterSpacing": "字間",
  "settings.terminal.letterSpacingAria": "字間",
  "settings.terminal.letterSpacingDesc":
    "各文字セルに足されます。負の値にすると、ターミナルには広すぎるフォントを詰められます。",
  "settings.terminal.ligatures": "合字",
  "settings.terminal.ligaturesDesc":
    "-> や != のような組み合わせを 1 つの字形として描きます。それらを描けない GPU 描画はオフになるため、" +
    "出力が非常に密なセッションではスクロールが滑らかでないことがあります。",
  "settings.terminal.ligaturesNone":
    "{font} には合字がないため、この設定を変えても見た目は変わりません。" +
    "JetBrains Mono、Cascadia Code、Fira Code には合字があります。",
  "settings.terminal.thisFont": "このフォント",
  "settings.terminal.cursor": "カーソル",
  "settings.terminal.cursorAria": "カーソルのスタイル",
  "settings.terminal.cursorDesc": "シェルが入力を待っている位置のカーソルの見た目です。",
  "settings.terminal.cursor.bar": "縦線",
  "settings.terminal.cursor.block": "ブロック",
  "settings.terminal.cursor.underline": "下線",
  "settings.terminal.blink": "カーソルを点滅",
  "settings.terminal.scrollback": "スクロールバック",
  "settings.terminal.scrollbackAria": "スクロールバックの行数",
  "settings.terminal.scrollbackDesc":
    "各セッションがウィンドウ上端より上に残す行数です。スクロールバック検索はこの全部を対象にし、" +
    "各行が使うのはこのウィンドウのメモリであり、サーバーのメモリではありません。",
  "settings.terminal.smoothScroll": "スムーズスクロール",
  "settings.terminal.smoothScrollAria": "スムーズスクロールの時間",
  "settings.terminal.smoothScrollDesc":
    "マウスホイールやトラックパッドのスクロールが止まるまでの時間です。" +
    "オフにすると、操作にすぐ追従します。",
  "settings.terminal.smoothScrollMs": "{value} ミリ秒",
  "settings.terminal.links": "リンクを開く",
  "settings.terminal.linksDesc":
    "セッションに表示された URL をクリックしてブラウザーで開けます。{modifier} との同時押しを求めるのはエディターと同じ考え方です。" +
    "URL の下の文字をクリックしたつもりで、セッションの途中にブラウザーが開かないようにするためです。",
  "settings.terminal.link.click": "クリック",
  "settings.terminal.link.modifier": "{modifier} + クリック",
  "settings.terminal.reset": "既定値に戻す",
  "settings.terminal.resetAlready": "上の項目はすべて既定値です。",
  "settings.terminal.resetDesc":
    "フォント、間隔、カーソル、スクロールバック、スムーズスクロール、リンクの開き方をリセットします。配色は変わりません。",
  "settings.terminal.resetDone": "ターミナルの体裁をリセットしました",
  "settings.terminal.colors": "ターミナルの配色",
  "settings.terminal.colorsDesc": "ターミナルの配色を選ぶか、自分で組み合わせます",
  "settings.terminal.custom": "カスタム",
  "settings.terminal.customTheme": "カスタムテーマ",
  "settings.terminal.customThemeDesc": "背景、文字、カーソル、ANSI 色を自分で設定する",
  "settings.terminal.themeChanged": "ターミナルテーマを {theme} に切り替えました",
  "settings.terminal.customApplied": "カスタムのターミナルテーマを適用しました",

  /* ---- Settings: Assistant ---- */
  "settings.assistant.title": "AI アシスタント",
  "settings.assistant.desc":
    "アシスタントはターミナルを読み、すでに開いている接続を通じてサーバー上で作業します。" +
    "保存済みのパスワードや鍵は決して見えません。",
  "settings.assistant.loading": "アシスタント設定を読み込んでいます…",
  "settings.assistant.agent": "エージェント",
  "settings.assistant.agentDesc":
    "どのコーディングエージェントが答えるかです。このマシンに入っているもの、API Gateway、または自分で動かしているモデルです。切り替えると新しい会話が始まります。",
  "settings.assistant.provider.claudeCode": "Anthropic 製。自分のアカウントを使います。",
  "settings.assistant.provider.codex": "OpenAI 製。自分のアカウントを使います。",
  "settings.assistant.provider.opencode": "オープンソース。設定したプロバイダーを使います。",
  "settings.assistant.provider.relayName": "API Gateway",
  "settings.assistant.provider.relay":
    "OpenAI 互換の API Gateway を使います。Claude Code / Codex / OpenCode のインストールは不要です。",
  "settings.assistant.provider.grok": "xAI 製。自分のアカウントを使います。",
  "settings.assistant.provider.local":
    "自分のモデル：LM Studio、Ollama、vLLM。",
  "settings.assistant.provider.unavailable": "このバージョンではまだ使えません。",
  "settings.assistant.relayBaseUrl": "API Gateway のアドレス",
  "settings.assistant.relayModel": "既定のモデル",
  "settings.assistant.relayModelManual": "手入力…",
  "settings.assistant.relayNote":
    "OpenAI 互換の API アドレスを入れてください。例：https://example.com/v1。ローカル CLI のインストールは不要です。",
  "settings.assistant.relayModelsFetch": "モデルを取得",
  "settings.assistant.relayModelsFetching": "取得中…",
  "settings.assistant.relayModelsLoaded": "{count} 個のモデルを取得しました",
  "settings.assistant.relayModelsEmpty":
    "API Gateway はモデル一覧を返しませんでした。モデル名を手入力できます。",
  "settings.assistant.relayModelsFailed": "モデルの取得に失敗しました。アドレスと鍵を確認してください。",
  "settings.assistant.accountRelay":
    "API Gateway 経由でモデルを呼び出します。アドレスと API キーを入れれば使えます。ローカルエージェントのインストールは不要です。",
  "settings.assistant.endpoint": "サーバーアドレス",
  "settings.assistant.endpointDesc":
    "ローカルモデルサーバーが待ち受けているアドレスです。OpenAI API を話すサーバーならどれでも構いません。",
  "settings.assistant.endpointNote":
    "LM Studio：http://localhost:1234/v1。Ollama：" +
    "http://localhost:11434/v1。llama.cpp：http://localhost:8080/v1。",
  "settings.assistant.endpointChecking": "そのアドレスにどのモデルがあるか尋ねています...",
  "settings.assistant.endpointFound_other": "応答あり。選べるモデルは {count} 個です。",
  "settings.assistant.endpointNone":
    "そのアドレスは何も応答しませんでした。サーバーが動いているか、API が有効かを確認してください。",
  "settings.assistant.commandMode": "コマンドの実行場所",
  "settings.assistant.commandMode.terminal": "自分のターミナルで",
  "settings.assistant.commandMode.background": "バックグラウンドで",
  "settings.assistant.commandMode.terminal.note":
    "コマンドは今見ているセッションに打ち込まれるため、" +
    "実行の様子を見られ、出力もスクロールバックに残ります。そのシェルの履歴にも入り、" +
    "アシスタントは終了コードではなく画面上の結果を読みます。",
  "settings.assistant.commandMode.background.note":
    "コマンドは見えない独立したチャネルで走ります。すっきりしており、" +
    "アシスタントは本当の終了コードときれいな出力を受け取れますが、何が起きたかはその説明を聞くしかありません。",
  "settings.assistant.approval": "実行前に確認する",
  "settings.assistant.approval.always": "すべての操作",
  "settings.assistant.approval.writes": "変更する操作だけ",
  "settings.assistant.approval.never": "しない",
  "settings.assistant.approval.always.note":
    "ファイルやターミナルの読み取りを含め、ツール呼び出しのたびに確認を待ちます。" +
    "安全ですが、長い調査はクリックの連続になります。",
  "settings.assistant.approval.writes.note":
    "読み取りは自由に進みます。システムを変える操作は止まり、" +
    "正確なコマンドと実行先のホストを見せます。",
  "settings.assistant.approval.never.note":
    "データの削除やサービスの再起動を含め、どの操作も承認を待ちません。" +
    "ホストを壊しても構わないときだけ使ってください。",
  "settings.assistant.localTools": "このコンピューター上のツールを許可する",
  "settings.assistant.localToolsDesc":
    "アシスタントがローカルファイルを読み書きし、ローカルコマンドを実行できるようにします。既定はオフです。" +
    "このパネルはサーバー管理用であり、自分のマシンはその何倍も広い範囲です。",
  "settings.assistant.allowList": "承認なしで実行してよいコマンド",
  "settings.assistant.allowListDesc":
    "1 行に 1 つ。先頭の完全な単語で照合します。パイプ、リダイレクト、セミコロン、" +
    "置換、2 行目のいずれかがあれば、先頭が何であれ必ず尋ねます。",
  "settings.assistant.allowListNote": "承認方式が「{mode}」のときだけ効きます。",
  "settings.assistant.blockList": "絶対に実行させないコマンド",
  "settings.assistant.blockListDesc":
    "1 行に 1 つ。これらのコマンドは尋ねずに拒否されます。すべての承認モードでそうで、" +
    "「しない」も含みます。アシスタントが自分のチャネルで走らせても、あなたのターミナルに打ち込んでも同じです。引数も数えます。「rm -rf」は " +
    "「rm -fr」、「rm -r -f」、「sudo /bin/rm --recursive --force」も止めます。",
  "settings.assistant.blockListEmpty": "入力欄を空にすると、どのコマンドも止めません。",
  "settings.assistant.blockListWarning":
    "これは誤操作を防ぐガードレールであり、セキュリティ制御ではありません。" +
    "シェルでは同じコマンドの書き方が多すぎて、どの一覧もすべてを覆えません。重要な操作では承認をオンのままにしてください。",
  "settings.assistant.saveList": "一覧を保存",
  "settings.assistant.restoreDefaults": "既定に戻す",
  "settings.assistant.quickPrompts": "クイック質問",
  "settings.assistant.quickPromptsDesc":
    "会話が空のとき、パネルはこれらの質問をワンクリックのボタンにします。1 行に 1 つです。" +
    "既定では何も入っていません。本当に役立つのは、毎週自分のマシンに聞く質問だからです。",
  "settings.assistant.quickPromptsPlaceholder":
    "ディスクを埋めているのは何？\n前回のデプロイはなぜ失敗した？",
  "settings.assistant.quickPromptsNote":
    "最大 12 件です。クリックしても送信はせず入力欄に入るだけなので、" +
    "先に補足できます。",
  "settings.assistant.savePrompts": "質問を保存",
  "settings.assistant.steps": "1 回あたりの手数",
  "settings.assistant.stepsDesc":
    "1 つの質問で行えるツール呼び出しの上限です。それを超えるとアシスタントは止まって報告します。" +
    "なかなか結果が出ない実行は、あなたが気づく前に自分で終わります。",
  "settings.assistant.lines": "読めるターミナルの行数",
  "settings.assistant.linesDesc":
    "1 回の読み取りで返す、セッションの直近出力の量です。上げると文脈は増えますが、" +
    "会話の予算も多く使います。",
  "settings.assistant.signIn": "ログイン方法",
  "settings.assistant.theAgent": "このエージェント",
  "settings.assistant.accountOpencode":
    "OpenCode は CLI で設定済みのプロバイダーと資格情報を使います。" +
    "「opencode auth login」で管理してください。ここに保存した鍵は OpenCode へ渡りません。",
  "settings.assistant.accountGrokApi":
    "このマシンに Grok Build が入っていないため、NoxSSH はここに保存した鍵で xAI API を直接呼び、" +
    "トークン課金になります。CLI を入れてログインすれば、自分のプランを使えます。",
  "settings.assistant.accountLocal":
    "ログインするアカウントはありません。モデルはこのコンピューター上で動くため、" +
    "アカウントもトークン課金もありません。サーバー側で鍵を求めているときだけ入れてください。",
  "settings.assistant.accountPlan":
    "このマシンでは {agent} でログイン済みで、{plan} プランを使っています。" +
    "使用量はそのプランから引かれるため、ここへ鍵を入れる必要はありません。",
  "settings.assistant.accountProvider":
    "このマシンの {agent} は {provider} を使うよう設定されており、" +
    "資格情報はそのプロバイダーが管理します。ここでの設定は不要です。",
  "settings.assistant.accountAgentKey":
    "このマシンの {agent} は API キーを使っているため、トークン課金です。",
  "settings.assistant.accountStoredKey":
    "ここに鍵が保存されており、それが使われます。入力欄を空にして保存すると削除され、" +
    "{agent} のログインに戻ります。",
  "settings.assistant.accountNone":
    "このマシンですでに {agent} にログインしているなら（たいていそうです）、何もする必要はありません。" +
    "鍵が必要なのはログインしていないときだけです。",
  "settings.assistant.apiKey": "API キー",
  "settings.assistant.keyStored": "鍵が保存されています",
  "settings.assistant.keyOptional": "サーバーが求めるときだけ必要です",
  "settings.assistant.keySaved": "鍵を保存しました。",
  "settings.assistant.keyRemoved": "鍵を削除しました。",
  "settings.assistant.keyFailed": "その鍵を保存できませんでした。",
  "settings.assistant.noSecureStore":
    "このシステムには安全な保存場所がないため、ここに鍵を保存できません。",
  "settings.assistant.tools": "できること",
  "settings.assistant.toolsDesc":
    "ツールは {count} 個で、うち {readOnly} 個は読み取り専用です。残りは上の承認設定に従います。",

  /* ---- Settings: Monitoring ---- */
  "settings.monitoring.title": "監視",
  "settings.monitoring.desc":
    "アプリを開いているあいだホストがまだ届くかを確認し、応答が止まったときに通知します。" +
    "スイッチは 2 つ必要です。このページで機能を有効にし、監視したいホストごとにそのエディターでもオンにします。",
  "settings.monitoring.unreadable":
    "アプリから監視設定を読めませんでした。CloudTerm を再起動してからこのページを開き直してください。",
  "settings.monitoring.saveFailed": "この設定を保存できませんでした",
  "settings.monitoring.checkFailed": "これらのホストを確認できませんでした",
  "settings.monitoring.master": "ホストのオフラインを監視する",
  "settings.monitoring.masterDesc":
    "全体のスイッチです。ホストは一括ではなく 1 台ずつ監視されるため、ここをオンにしただけでは何も確認しません。" +
    "監視したいホストは、それぞれのエディターの「監視」でオンにしてください。",
  "settings.monitoring.interval": "確認の間隔",
  "settings.monitoring.intervalDesc":
    "監視中の各ホストをこの間隔で確認します。確認は接続を開いてすぐ閉じるだけなので、" +
    "ホスト一覧が長くても負荷は小さく済みます。",
  "settings.monitoring.timeout": "待つ時間",
  "settings.monitoring.timeoutDesc":
    "この時間内に接続を受け入れないホストは、その確認を失敗とみなします。VPN の向こう側のマシンでは、" +
    "少し長くする価値があります。",
  "settings.monitoring.failures": "オフラインとみなすまで",
  "settings.monitoring.failuresDesc":
    "連続して失敗する必要がある回数です。Wi-Fi では 2 回以上にしてください。" +
    "たまに 1 パケット落ちてもサーバーが落ちたことにはならず、毎分そう通知されると通知の意味がなくなります。",
  "settings.monitoring.notify": "ホストが落ちたら通知する",
  "settings.monitoring.notifyDesc":
    "ホストが応答ありから応答なしになったとき、デスクトップ通知を 1 回出します。" +
    "オフにしても、ホストカードとベルの状態はそのまま残ります。ただ邪魔はしません。",
  "settings.monitoring.notifyBack": "復帰したときも通知する",
  "settings.monitoring.notifyBackDesc":
    "オフラインだったホストが再び応答し始めたとき、もう 1 通送り、どれだけオフラインだったかを伝えます。",
  "settings.monitoring.list": "監視中のもの",
  "settings.monitoring.checkNow": "今すぐ確認",
  "settings.monitoring.checking": "確認中…",
  "settings.monitoring.noneWatched": "監視はホストエディターで 1 台ずつオンにします。",
  "settings.monitoring.watched_other": "{count} 台のホスト。",
  "settings.monitoring.watchedButOff_other":
    "{count} 台のホストが設定されていますが、上のスイッチがオフのため、確認は行われていません。",
  "settings.monitoring.watchedWithOffline_other":
    "{count} 台のホストのうち、{offline} 台が応答していません。",
  "settings.monitoring.emptyList": "いま監視しているホストはありません。",
  "settings.monitoring.emptyListHow":
    "「ホスト」ページでホストを開き、「任意」の下の「監視」で「このホストを監視する」をオンにしてください。",
  "settings.monitoring.noNetwork":
    "このコンピューターにネットワークがないため、確認は行われず、ホストのオフラインも報告していません。",
  "settings.monitoring.allFailed":
    "前回の確認ですべてのホストが同時に失敗しました。たいていすべてのホストではなく、このマシン側の問題です。" +
    "その結果は破棄され、報告も出していません。",
  "settings.monitoring.lastChecked": "前回の確認は {when}。",

  /* ---- Settings: Logging ---- */
  "settings.logging.title": "ログ記録",
  "settings.logging.desc":
    "各セッションが表示した内容をファイルへ書き、どのセッションを記録し、ファイルをどれだけ残すかを決めます。",
  "settings.logging.saveFailed": "この設定を保存できませんでした",
  "settings.logging.folderFailed": "そのフォルダーは使えませんでした",
  "settings.logging.folderChanged": "以降のセッションログはそこに保存されます",
  "settings.logging.openFailed": "そのフォルダーを開けませんでした",
  "settings.logging.revealFailed": "そのログが見つかりません",
  "settings.logging.recordAll": "すべてのセッションを記録する",
  "settings.logging.recordAllDesc":
    "セッションが開くたびに、サーバーの出力をファイルへ書き込みます。" +
    "これをオンにしなくても、個々のセッションは自分のタイトルバーからいつでも記録を始められます。",
  "settings.logging.whichSessions": "記録するセッション",
  "settings.logging.whichSessionsDesc":
    "上のスイッチが記録するセッションの種類です。" +
    "セッション自身のタイトルバーから記録を始めたときは、この一覧は無視されます。",
  "settings.logging.format": "書き込む内容",
  "settings.logging.formatDesc":
    "「読みやすい」は色とカーソル制御を取り除き、grep で探しやすくします。" +
    "「そのまま」はすべてのバイトを残し、あとでターミナルで再生しやすくします。",
  "settings.logging.formatPlain": "読みやすい",
  "settings.logging.formatRaw": "そのまま",
  "settings.logging.timestamps": "各行に時刻を付ける",
  "settings.logging.timestampsDesc": "各行の先頭に、届いたときのローカル時刻を付けます。",
  "settings.logging.timestampsUnavailable":
    "そのままのログでは使えません。エスケープシーケンスの途中に時刻を入れると壊れるからです。",
  "settings.logging.retention": "残す期間",
  "settings.logging.retentionDesc":
    "古い記録は起動時とセッション開始時に削除されます。書き込み中の記録はどれだけ古くても触れません。",
  "settings.logging.forever": "無期限に残す",
  "settings.logging.days_other": "{count} 日",
  "settings.logging.cap": "フォルダーサイズを制限する",
  "settings.logging.capDesc":
    "フォルダーがこのサイズを超えると、収まるまで最も古い記録から削除します。",
  "settings.logging.noCap": "制限しない",
  "settings.logging.folder": "保存場所",
  "settings.logging.folderDesc":
    "ログには画面に出たものがすべて残ります。パスワードマネージャーを動かしたセッションやトークンを表示したセッションでは、" +
    "資格情報そのものと同じくらい機微です。そうした資格情報を置く場所へ入れてください。",
  "settings.logging.openFolder": "フォルダーを開く",
  "settings.logging.defaultFolder": "既定のフォルダーに戻す",
  "settings.logging.showInFolder": "フォルダーで表示",

  /* ---- Settings: Security ---- */
  "settings.security.title": "セキュリティ",
  "settings.security.desc": "誰がこのアプリを開けるかと、どのサーバーを信頼するかです。",

  "settings.lock.title": "起動パスワード",
  "settings.lock.badgeOn": "オン",
  "settings.lock.descOn":
    "アプリを開くたびに尋ねます。保存したパスワード、鍵、パスフレーズはこれで暗号化されるため、" +
    "これがないと保存ファイルは読めません。",
  "settings.lock.descOff":
    "アプリを開くのにパスワードを求め、保存したパスワード、鍵、パスフレーズをそれで暗号化します。",
  "settings.lock.warnOn":
    "取り戻す方法はありません。このパスワードを忘れると、保存済みの資格情報は二度と読めません。",
  "settings.lock.warnOff":
    "これを設定しないと、資格情報はシステムのキーストアだけで守られ、あなたの身分でログインした人なら誰でも読めます。",
  "settings.lock.lockNow": "今すぐロック",
  "settings.lock.setPassword": "パスワードを設定",
  "settings.lock.changePassword": "パスワードを変更",
  "settings.lock.removePassword": "パスワードを削除",
  "settings.lock.currentPassword": "現在のパスワード",
  "settings.lock.password": "パスワード",
  "settings.lock.newPassword": "新しいパスワード",
  "settings.lock.confirmPassword": "パスワードの確認",
  "settings.lock.mismatch": "2 回のパスワードが一致しません",
  "settings.lock.failed": "操作は完了しませんでした",
  "settings.lock.passwordSet": "起動パスワードを設定しました",
  "settings.lock.passwordChanged": "パスワードを変更しました",
  "settings.lock.passwordRemoved": "起動パスワードを削除しました",
  "settings.lock.acknowledge": "このパスワードは取り戻せないことを理解しています",
  "settings.lock.acknowledgeDesc":
    "保存したパスワード、鍵、パスフレーズはこれで暗号化されます。忘れると、" +
    "このアプリでも他の何でも、それらを読み戻せません。",
  "settings.lock.confirmTitle": "今すぐアプリをロックしますか？",
  "settings.lock.confirmMessage":
    "開いているセッションはすべて切断され、戻るにはパスワードが必要です。",
  "settings.lock.confirmAction": "ロック",

  "settings.knownHosts.title": "既知のホスト",
  "settings.knownHosts.desc":
    "あなたが信頼したサーバー鍵です。1 つ忘れると、次の接続で改めて尋ねられます。" +
    "サーバーが本当に作り直されたなら、それが必要です。",
  "settings.knownHosts.unknownType": "不明",
  "settings.knownHosts.copy": "指紋をコピー",
  "settings.knownHosts.copied": "指紋をコピーしました",
  "settings.knownHosts.forget": "忘れる",
  "settings.knownHosts.forgetKey": "この鍵を忘れる",
  "settings.knownHosts.keyCount_other": "{count} 個の鍵",
  "settings.knownHosts.empty": "まだどのホスト鍵も信頼していません",
  "settings.knownHosts.emptyNote":
    "あるサーバーへ初めて接続すると、その鍵がここに記録されます。",
  "settings.knownHosts.confirmTitle": "このホスト鍵を忘れますか？",
  "settings.knownHosts.confirmMessage":
    "次に接続するとき、{host} は新しいホストとして扱われ、その鍵を改めて確認します。",
  "settings.knownHosts.forgotHost": "{host} を忘れました",
  "settings.knownHosts.forgotKey": "{host} の {type} 鍵を忘れました",

  /* ---- Settings: Account (WebDAV sync) ---- */
  "settings.account.title": "WebDAV同期",
  "settings.account.webdavUrl": "WebDAV アドレス",
  "settings.account.webdavUrlHint":
    "サーバーアドレスだけを入れてください。例：https://dav.jianguoyun.com/dav/。バックアップの保存先として NoxSSH/ ディレクトリが自動で付きます。",
  "settings.account.username": "ユーザー名",
  "settings.account.webdavPassword": "WebDAV パスワード",
  "settings.account.webdavPasswordHint":
    "HTTP Basic 認証用のパスワードです（安全に保存されます）。",
  "settings.account.syncPassphrase": "同期パスフレーズ",
  "settings.account.syncPassphraseHint":
    "アップロード前に同期データを暗号化します。ほかのデバイスで復元するときも同じパスフレーズが必要です。",
  "settings.account.saveUrlUser": "アドレスとユーザー名を保存",
  "settings.account.saveSecrets": "パスフレーズを保存",
  "settings.account.test": "接続をテスト",
  "settings.account.testing": "テスト中...",
  "settings.account.testOk": "接続に成功しました",
  "settings.account.enableSync": "WebDAV 同期を有効にする",
  "settings.account.enableSyncDesc":
    "オンにすると、このマシンの変更は約 8 秒後に自動でアップロードされます。5 分ごと、およびロック解除や復帰時にサーバーからダウンロードします。アップロード前にサーバー側により新しい同期データがあれば、先にマージしてから上げます。",
  "settings.account.saveNowHint":
    "自動アップロードを待たず、今すぐこのマシンの現在データをサーバーへ上げます。",
  "settings.account.restoreNowHint":
    "次回の自動ダウンロードを待たず、今すぐサーバーから同期データをダウンロードしてこのマシンを上書きします。",
  "settings.account.syncOn": "WebDAV 同期は有効です",
  "settings.account.syncOff": "WebDAV 同期はオフです",
  "settings.account.configSaved": "設定を保存しました",
  "settings.account.secretsSaved": "資格情報を更新しました",
  "settings.account.backedUp": "WebDAV へアップロードしました",
  "settings.account.saveNow": "今すぐアップロード",
  "settings.account.saving": "アップロード中…",
  "settings.account.savedAgo": "{when} にアップロード済み",
  "settings.account.notSavedYet": "まだアップロードしていません",
  "settings.account.restoreNow": "今すぐダウンロード",
  "settings.account.restoring": "ダウンロード中…",
  "settings.account.restored": "WebDAV からダウンロードしました",
  "settings.account.notRestoredYet": "まだダウンロードしていません",
  "settings.account.restoredAgo": "{when} にダウンロード済み",
  "settings.account.webdavPrivacyNote":
    "データはこのマシンを離れる前に同期パスフレーズで暗号化されます。WebDAV パスワードは認証だけに使います。",
  "settings.account.backupSection": "履歴バックアップ",
  "settings.account.backupEnabled": "履歴バックアップを有効にする",
  "settings.account.backupEnabledDesc":
    "設定した間隔で、サーバー上にタイムスタンプ付きの独立した暗号化バックアップを作ります。現在の同期データとは別です。",
  "settings.account.backupFrequency": "バックアップの間隔",
  "settings.account.backupFrequencyManual": "手動のみ",
  "settings.account.backupFrequencyHourly": "毎時",
  "settings.account.backupFrequencyDaily": "毎日",
  "settings.account.backupFrequencyWeekly": "毎週",
  "settings.account.maxBackups": "最大保持数",
  "settings.account.maxBackupsSuffix": "件",
  "settings.account.backupNow": "今すぐバックアップ",
  "settings.account.backingUp": "バックアップ中…",
  "settings.account.backupsTitle": "利用できる履歴",
  "settings.account.noBackups": "履歴バックアップはまだありません",
  "settings.account.restoreVersion": "この版を復元",
  "settings.account.restoringVersion": "復元中…",
  "settings.account.backupCreated": "バックアップを作成しました",
  "settings.account.backupRestored": "履歴バックアップから復元しました",
  "settings.account.lastBackup": "前回のバックアップ",
  "settings.account.backupOnNow": "履歴バックアップをオンにしました",
  "settings.account.backupOffNow": "履歴バックアップをオフにしました",
  "settings.account.revision": "版",
  "settings.account.justNow": "たった今",
  "settings.account.minutesAgo": "{count} 分前",
  "settings.account.hoursAgo": "{count} 時間前",
  "settings.account.daysAgo": "{count} 日前",
  "settings.account.proxyCount_other": "{count} 個のプロキシ",
  "settings.account.deletingVersion": "削除中…",
  "settings.account.backupDeleted": "バックアップを削除しました",
  "settings.account.resetLocalTitle": "このマシンのデータを空にする",
  "settings.account.resetLocalDesc":
    "このマシン上のホスト、鍵、スニペット、プロキシ、既知のホスト、アシスタント設定、WebDAV 同期設定を削除し、初期状態に戻します。サーバー上の既存の同期データや履歴バックアップは変えません。",
  "settings.account.resetLocal": "このマシンのデータを空にする",
  "settings.account.resettingLocal": "空にしています…",
  "settings.account.resetLocalConfirmTitle": "このマシンのデータを空にしますか？",
  "settings.account.resetLocalConfirmMessage":
    "このマシン上のホスト、鍵、スニペット、プロキシ、既知のホスト、アシスタント設定、および WebDAV のアドレス、アカウント、パスフレーズが削除されます。サーバー上の同期データと履歴バックアップは影響を受けません。",
  "settings.account.resetLocalConfirm": "このマシンを空にする",
  "settings.account.localResetDone": "このマシンのデータを空にしました",

  /* ---- Settings: Backup ---- */
  "settings.backup.title": "バックアップ / インポート",
  "settings.backup.desc": "既存の設定を取り込むか、コピーを書き出します。",
  "settings.backup.exportTitle": "バックアップを書き出す",
  "settings.backup.exportDesc":
    "すべてのホスト、フォルダー、SSH 鍵、スニペット、ポート転送、信頼済みのホスト鍵を" +
    "1 つの暗号化ファイルへ書き、ここで設定するパスフレーズで守ります。",
  "settings.backup.exportNote":
    "このパスフレーズは起動パスワードとは別なので、このマシンを知らないコンピューターでも開けます。",
  "settings.backup.create": "バックアップを作成",
  "settings.backup.passphrase": "バックアップのパスフレーズ",
  "settings.backup.confirmPassphrase": "パスフレーズの確認",
  "settings.backup.tooShort": "少なくとも {count} 文字必要です",
  "settings.backup.mismatch": "2 回のパスフレーズが一致しません",
  "settings.backup.acknowledge": "このファイルに保存済みの資格情報が含まれることを理解しています",
  "settings.backup.acknowledgeDesc":
    "ファイルとこのパスフレーズの両方を持っている人は、中の保存済みパスワード、" +
    "秘密鍵、パスフレーズをすべて読めます。そうした資格情報を置く場所へ入れてください。",
  "settings.backup.chooseLocation": "保存先を選択…",
  "settings.backup.exportFailed": "バックアップを書き込めませんでした",
  "settings.backup.exported": "バックアップを保存しました：{hosts}、{keys}、{snippets}",
  "settings.backup.restoreTitle": "バックアップを復元",
  "settings.backup.restoreDesc":
    ".cbbackup ファイルを読み、中身を取り込みます。何かが変わる前に、" +
    "何が入っているかを先に見せます。",
  "settings.backup.restoreNote":
    "既定ではここにあるものは動かさないので、2 回復元しても安全です。",
  "settings.backup.chooseFile": "ファイルを選択…",
  "settings.backup.openTitle": "暗号化バックアップを開く",
  "settings.backup.fileKind": "CloudBlast バックアップ",
  "settings.backup.pickerFailed": "ファイル選択を開けませんでした",
  "settings.backup.file": "ファイル",
  "settings.backup.open": "バックアップを開く",
  "settings.backup.opening": "開いています…",
  "settings.backup.openFailed": "そのバックアップを開けませんでした",
  "settings.backup.from": "{when} のバックアップ",
  "settings.backup.unknownDate": "日付不明",
  "settings.backup.appVersion": "アプリ {version}",
  "settings.backup.emptyFile": "このバックアップは空です。",
  "settings.backup.folders": "フォルダー",
  "settings.backup.keys": "SSH 鍵",
  "settings.backup.newCount": "{count} 件は新規です",
  "settings.backup.existingReplaced": "{count} 件は既にあり、置き換えられます",
  "settings.backup.existingSkipped": "{count} 件は既にあり、スキップされます",
  "settings.backup.trustedKeys": "信頼済みの鍵",
  "settings.backup.hostWord_other": "台のホスト",
  "settings.backup.overwrite": "ここにある項目を置き換える",
  "settings.backup.overwriteDesc":
    "名前ではなく記録の id で照合します。オフなら足りないものだけ足します。" +
    "オンならこのマシンをバックアップに合わせ、それらの記録へのローカル変更を捨てます。",
  "settings.backup.overwriteWarning": "対応する記録のローカル変更は失われます。",
  "settings.backup.restore": "復元",
  "settings.backup.restoring": "復元中…",
  "settings.backup.restoreFailed": "復元は完了しませんでした",
  "settings.backup.restored_other": "{count} 件の新しい項目を復元しました",
  "settings.backup.restoredAndReplaced_other":
    "{count} 件の新しい項目を復元し、{replaced} 件を置き換えました",
  "settings.backup.duplicateKeys_other":
    "いま {count} 台のホストが、同じ種類の鍵を複数信頼しています。" +
    "「セキュリティ」の「既知のホスト」を確認してください。",

  /* ---- Settings: About ---- */
  "settings.about.title": "情報",
  "settings.about.version": "バージョン {version}",
  "settings.about.updates": "更新",
  "settings.about.checking": "更新を確認しています…",
  "settings.about.checkingShort": "確認中…",
  "settings.about.checkNow": "更新を確認",
  "settings.about.disabled": "このインストールでは更新確認がオフです。",
  "settings.about.ready": "バージョン {version} のインストール準備ができました。再起動すると完了します。",
  "settings.about.downloading": "更新をダウンロードしています…",
  "settings.about.downloadingVersion": "バージョン {version} をダウンロードしています…",
  "settings.about.available": "バージョン {version} が公開されています。",
  "settings.about.availableToDownload": "バージョン {version} をダウンロードできます。",
  "settings.about.upToDate": "最新です。前回の確認は {when}。",
  "settings.about.neverChecked": "まだ確認していません。",
  "settings.about.restartToUpdate": "再起動して更新",
  "settings.about.download": "{version} をダウンロード",
  "settings.about.noChecksLeft": "この 1 時間の確認回数を使い切りました。",
  "settings.about.noChecksUntil": "この 1 時間の確認回数を使い切りました。{when} まで待ってください。",
  "settings.about.checksLeft_other":
    "この 1 時間はあと {count} 回確認できます。上限は {limit} 回です。",
  "settings.about.noteInstall":
    "更新はバックグラウンドでダウンロードされ、アプリを終了したときにインストールされます。" +
    "更新確認は GitHub に最新の公開版を尋ねるだけで、あなたやこのマシンについての情報は送りません。",
  "settings.about.noteNotify":
    "更新は自動ではインストールされません。ダウンロードはブラウザーで開き、システムが検査しやすくします。" +
    "更新確認は GitHub に最新の公開版を尋ねるだけで、あなたやこのマシンについての情報は送りません。",

  /* ---- More shared words ---- */
  "common.add": "追加",
  "common.copy": "コピー",
  "common.delete": "削除",
  "common.deleteNamed": "{name} を削除",
  "common.edit": "編集",
  "common.rename": "名前を変更",

  /* ---- Hosts ---- */
  "hosts.rootLabel": "すべてのホスト",
  "hosts.unnamed": "名前のないホスト",
  "hosts.noPort": "ポートなし",
  "hosts.connected": "接続済み",
  "hosts.viaProxy": "プロキシ経由",
  "hosts.lastConnected": "{when}",
  "hosts.tunnelCount_other": "{count} 本のトンネル",
  "hosts.itemCount_other": "{count} 件",
  "hosts.selectedCount": "{count} 件を選択",
  "hosts.folderEmpty": "空",
  "hosts.folderActions": "フォルダー操作",
  "hosts.syncedBadge": "同期済み",
  "hosts.syncedAccount": "CloudBlast アカウントから同期",
  "hosts.syncedProject":
    "CloudBlast アカウント内のプロジェクトです。同期はその名前と位置を保ちます",
  "hosts.upOneLevel": "1 つ上へ",
  "hosts.dragHint": "カードをフォルダーへドラッグして整理 · 枠をドラッグすると複数選択できます",
  "hosts.dragHintFiltered": "カード上で枠をドラッグすると複数選択できます",

  "hosts.open": "開く",
  "hosts.editHost": "ホストを編集",
  "hosts.connectVia": "{protocol} で接続",
  "hosts.openIpmi": "IPMI を開く",
  "hosts.notSetUp": "まだ設定していません",
  "hosts.moveToFolder": "フォルダーへ移動…",
  "hosts.keepsContents": "中身は残します",
  "hosts.move": "移動",
  "hosts.tag": "タグ",
  "hosts.tags": "タグ…",
  "hosts.moveMany": "{what}を移動…",
  "hosts.groupIntoFolder": "フォルダーにまとめる…",
  "hosts.clearSelection": "選択を解除",

  "hosts.deleteHostTitle": "このホストを削除しますか？",
  "hosts.deleteHostMessage":
    "「{name}」とその保存済み資格情報が削除されます。すでに開いているセッションは接続したままです。",
  "hosts.deleteHost": "ホストを削除",
  "hosts.deleteFolderTitle": "このフォルダーを削除しますか？",
  "hosts.deleteFolderMessage":
    "「{name}」は削除されます。中身は削除されず、1 つ上へ上がります。",
  "hosts.deleteFolder": "フォルダーを削除",
  "hosts.deleted": "「{name}」を削除しました",
  "hosts.deleteManyTitle": "{what}を削除しますか？",
  "hosts.deleteMany": "{what}を削除",
  "hosts.deletedMany": "{what}を削除しました",
  "hosts.deleteManyHostsNote":
    "ホストはその保存済み資格情報と一緒に削除されます。すでに開いているセッションは接続したままです。",
  "hosts.deleteManyFoldersNote":
    "フォルダーは削除されますが、中身は削除されず 1 つ上へ上がります。",
  "hosts.deleteFailed": "削除できませんでした：{reason}",

  "hosts.moved": "{what}を移動しました",
  "hosts.movedSome": "{of} 件中 {count} 件を移動しました。残りはそこへ移せません",
  "hosts.movedTo": "{what}を {where} へ移動しました",
  "hosts.movedSomeTo": "{of} 件中 {count} 件を {where} へ移動しました",
  "hosts.movedInto": "{what}を「{name}」へ移しました",
  "hosts.nothingToMove": "動かせるものはありません。すでにそこにあります",
  "hosts.folderInsideItself": "フォルダーを自分自身の中へは移せません。",
  "hosts.moveTitle": "{count} 件を移動",
  "hosts.moveSubtitle": "移し先のフォルダーを選びます。",
  "hosts.findFolder": "フォルダーを探す…",
  "hosts.noFolderMatches": "「{query}」に一致するフォルダーはありません。",
  "hosts.alreadyHere": "すでにここです",
  "hosts.insideSelection": "選択の中にあります",

  "hosts.editFolder": "フォルダーを編集",
  "hosts.saveFolder": "フォルダーを保存",
  "hosts.createFolder": "フォルダーを作成",
  "hosts.creating": "作成中…",
  "hosts.folderName": "フォルダー名",
  "hosts.folderNamePlaceholder": "例：AWS サーバー",
  "hosts.folderSubtitle":
    "フォルダーはホストをグループ化します。フォルダーを削除しても中身は消えません。",
  "hosts.folderCreateFailed": "そのフォルダーを作成できませんでした",
  "hosts.folderCreateFailedWhy": "そのフォルダーを作成できませんでした：{reason}",
  "hosts.groupTitle": "選択したもので新しいフォルダーを作る",
  "hosts.groupSubtitle": "{what}はその中へ移され、{parent} の下に置かれます。",

  "hosts.sort": "並べ替え",
  "hosts.sortLabel": "並べ替え：{sort}",
  "hosts.sortNameAsc": "名前 A-Z",
  "hosts.sortNameDesc": "名前 Z-A",
  "hosts.sortRecent": "最近使ったもの",
  "hosts.sortManual": "手動",
  "hosts.filterByTag": "タグで絞り込む",
  "hosts.filteredByTags_other": "{count} 個のタグで絞り込み",
  "hosts.filterBy": "「{tag}」で絞り込む",
  "hosts.stopFilteringBy": "「{tag}」での絞り込みをやめる",
  "hosts.searchTags": "タグを検索",
  "hosts.searchTagsPlaceholder": "{count} 個のタグを検索…",
  "hosts.noTagMatches": "「{query}」に一致するタグはありません",
  "hosts.tagMode.all": "すべて",
  "hosts.tagMode.any": "いずれか",
  "hosts.tagModeAllHint": "選んだタグをすべて持つホスト",
  "hosts.tagModeAnyHint": "選んだタグを少なくとも 1 つ持つホスト",

  "hosts.tagTitle": "ホストにタグを付ける",
  "hosts.tagSubtitle":
    "{what}を選んでいます。半選択のタグは一部のホストにだけ付いており、あなたが変えない限りそのままです。",
  "hosts.applying": "適用中…",
  "hosts.newTag": "新しいタグ",
  "hosts.newTagPlaceholder": "新しいタグ…",
  "hosts.noTagsYet": "タグはまだありません。上に入力して始めましょう。",
  "hosts.tagWillAdd": "追加されます",
  "hosts.tagWillRemove": "外されます",
  "hosts.tagOnAll": "すべてに付いている",
  "hosts.tagOnSome": "{total} 台中 {on} 台に付いている",

  /* ---- Protocols ---- */
  "protocol.serial": "シリアル",
  "protocol.desktop": "リモートデスクトップ",
  "protocol.ssh.summary": "暗号化されたシェルと、その上のすべて",
  "protocol.ssh.detail":
    "ファイル、ポート転送、リモートデスクトップはいずれも SSH 接続上のチャネルなので、ここだけで提供されます。",
  "protocol.telnet.summary": "SSH のない機器へつなぐ普通のソケット",
  "protocol.telnet.detail":
    "パスワードを含め、すべてが平文で送られます。コンソールサーバー、PDU、" +
    "SSH デーモンを一度も入れていないスイッチ向けです。",
  "protocol.serial.summary": "このマシン上の 1 本のコンソール線",
  "protocol.serial.detail":
    "ネットワークは一切通りません。設定は機器と完全に一致させる必要があります。ボーレートが違うとエラーではなく" +
    "文字化けだけが出ます。",
  "protocol.desktop.summary": "背後にシェルのない RDP または VNC",
  "protocol.desktop.detail":
    "リモートデスクトップを直接開き、SSH はダイヤルしません。通常 SSH サーバーのない Windows マシン向けです。",
  "protocol.ipmi.summary": "背後に何もないサービスプロセッサ",
  "protocol.ipmi.detail":
    "BMC 自身の Web 画面を直接開き、本体へはダイヤルしません。このアプリにセッションのないホストの手前にある" +
    "iDRAC、iLO、Supermicro ボード向けです。",

  /* ---- Serial ---- */
  "serial.port": "シリアルポート",
  "serial.selectPort": "ポートを選択…",
  "serial.rescan": "ポートを再スキャン",
  "serial.noPorts": "シリアルポートが見つかりません。アダプターを挿してから再スキャンしてください。",
  "serial.portMissing":
    "{path} はいま接続されていません。このホストには残してあるので、ケーブルが戻ればまた使えます。",
  "serial.baudRate": "ボーレート",
  "serial.dataBits": "データビット",
  "serial.stopBits": "ストップビット",
  "serial.parity": "パリティ",
  "serial.parityNone": "なし",
  "serial.parityEven": "偶数",
  "serial.parityOdd": "奇数",
  "serial.parityMark": "マーク",
  "serial.paritySpace": "スペース",
  "serial.flowControl": "フロー制御",
  "serial.flowNone": "なし",
  "serial.flowHardware": "ハードウェア（RTS/CTS）",
  "serial.flowSoftware": "ソフトウェア（XON/XOFF）",
  "serial.enterSends": "Enter キーが送るもの",
  "serial.enterSendsHint":
    "この問いに答えられるプロトコルはありません。設定を間違えた機器は死んだように見えます。プロンプトが戻ってこないからです。",
  "serial.newlineCrHint": "ネットワーク機器、ほとんどのコンソール",
  "serial.newlineLfHint": "Linux の getty",
  "serial.newlineCrLfHint": "一部の組み込みモニター",
  "serial.localEcho": "入力した内容をエコーする",
  "serial.localEchoHint":
    "エコーしない機器ではオンにしてください。そうしないと入力してもペインが空白のままで、" +
    "静かではなくポートが壊れたように見えます。",
  "serial.dtr": "開いたときに DTR を立てる",
  "serial.dtrHint":
    "既定はオンで、ほとんどの機器がそれを期待します。基板が DTR でリセットする配線ならオフにしてください。" +
    "そうしないとこのポートを開くたびに再起動します。",
  "serial.rts": "開いたときに RTS を立てる",
  "serial.rtsHint": "既定はオンです。一部のアダプターは RTS をリセットや起動ピンへつなぎます。",
  "serial.rtsIgnored": "ハードウェアフロー制御がオンのときは無視されます。そのときは RTS はドライバーの管轄です。",
  "serial.noWindowSize":
    "シリアル線はウィンドウサイズも端末種別も伝えないため、ペインがどれだけ大きくても機器は 80×24 として扱います。",

  /* ---- Port forwarding ---- */
  "tunnel.heading": "ポート転送",
  "tunnel.headingNote": "トンネルはこのセッションの接続の上で動き、セッションが閉じると止まります。",
  "tunnel.local": "ローカル",
  "tunnel.remote": "リモート",
  "tunnel.dynamic": "ダイナミック",
  "tunnel.local.summary": "このマシンから遠端のサービスへアクセスする",
  "tunnel.local.detail":
    "このマシンでポートを開きます。そこに来る通信はサーバーから出て、サーバーが目的地へダイヤルします。",
  "tunnel.remote.summary": "ローカルサービスをサーバーへ出す",
  "tunnel.remote.detail": "サーバーでポートを開きます。それが受けた接続はこのマシンからダイヤルされます。",
  "tunnel.dynamic.summary": "サーバー経由の SOCKS5 プロキシ",
  "tunnel.dynamic.detail":
    "このマシンで SOCKS5 プロキシを開きます。各接続が自分で目的地を指定し、サーバーがダイヤルします。",
  "tunnel.newTitle": "新しいポート転送",
  "tunnel.editTitle": "ポート転送を編集",
  "tunnel.add": "転送を追加",
  "tunnel.added": "転送を追加しました",
  "tunnel.updated": "転送を更新しました",
  "tunnel.removed": "転送を削除しました",
  "tunnel.removeTitle": "このポート転送を削除しますか？",
  "tunnel.removeMessage": "{tunnel} は停止され、{host} から削除されます。",
  "tunnel.label": "ラベル",
  "tunnel.labelHint": "任意です。アドレスの代わりに表示されます",
  "tunnel.labelPlaceholder": "例：本番データベース",
  "tunnel.listenAddress": "待ち受けアドレス",
  "tunnel.listenPort": "待ち受けポート",
  "tunnel.bindAddress": "サーバー上のバインドアドレス",
  "tunnel.bindAddressHint": "ループバック以外では “GatewayPorts yes” が必要です",
  "tunnel.remotePort": "リモートポート",
  "tunnel.autoPort": "0 = 自動",
  "tunnel.destHost": "宛先ホスト",
  "tunnel.destHostLocalHint": "このマシンで解決されます",
  "tunnel.destHostRemoteHint": "サーバーで解決されるため、その内部名も使えます",
  "tunnel.destPort": "宛先ポート",
  "tunnel.autoStart": "接続と一緒に開始する",
  "tunnel.autoStartHint": "このホストが接続するたびに始まります。再接続後も同じです。",
  "tunnel.autoBadge": "自動",
  "tunnel.exposedWarning":
    "このマシンへ届くネットワーク上の誰でも、この転送を使えます。意図して共有するのでなければ、" +
    "127.0.0.1 を使ってください。",
  "tunnel.badRemotePort": "リモートポートは 0 から 65535 のあいだである必要があります",
  "tunnel.badListenPort": "待ち受けポートは 1 から 65535 のあいだである必要があります",
  "tunnel.destHostRequired": "宛先ホストは必須です",
  "tunnel.badDestPort": "宛先ポートは 1 から 65535 のあいだである必要があります",
  "tunnel.anywhere": "任意の宛先",
  "tunnel.serverWord": "サーバー",
  "tunnel.usageLocal": "{where} へ接続",
  "tunnel.usageRemote": "サーバー上：{where}",
  "tunnel.usageDynamic": "SOCKS5 プロキシは {where}",
  "tunnel.stateActive": "稼働中",
  "tunnel.stateStarting": "開始中…",
  "tunnel.stateStopped": "停止",
  "tunnel.stateFailed": "失敗",
  "tunnel.start": "開始",
  "tunnel.stop": "停止",
  "tunnel.startAll": "すべて開始",
  "tunnel.stopAll": "すべて停止",
  "tunnel.connections": "接続数",
  "tunnel.copyAddress": "アドレスをコピー",
  "tunnel.addressCopied": "アドレスをコピーしました",
  "tunnel.lastError": "前回のエラー：{error}",
  "tunnel.sessionDown": "セッションは未接続です。再接続すると転送は再び始まります。",
  "tunnel.empty": "ポート転送はまだありません",
  "tunnel.emptyNote":
    "ポートを転送すれば、このサーバー経由でデータベースや内部ダッシュボードへ届きます。" +
    "SOCKS プロキシを開いて、そこから Web を見ることもできます。",
  "tunnel.editorEmpty":
    "ポートを転送すれば、このホスト経由でデータベースや内部サービスへ届きます。" +
    "SOCKS プロキシを開いて、そこから Web を見ることもできます。",

  /* ---- Assistant panel ---- */
  "assistant.title": "AI アシスタント",
  "assistant.welcome": "サーバーの手入れを一緒にしましょう",
  "assistant.welcomeNote":
    "このターミナルを読み、独立したチャネルでコマンドを実行し、保存済みのすべてのホストで働けます。",
  "assistant.createQuickPrompts": "クイック質問を作る",
  "assistant.newConversation": "新しい会話",
  "assistant.chats": "会話",
  "assistant.chatHistory": "会話履歴",
  "assistant.working": "処理中",
  "assistant.send": "送信",
  "assistant.stop": "停止",
  "assistant.askAbout": "{about}について尋ねる",
  "assistant.costHint": "この会話の見積もり費用。トークン課金です",

  "assistant.currentSession": "現在のセッション",
  "assistant.nothingConnected": "接続中のセッションはありません",
  "assistant.noSessionOpen": "開いているセッションはありません",
  "assistant.yourServers": "あなたのサーバー",
  "assistant.anyHost": "任意のホスト",
  "assistant.closedSession": "閉じたセッション",
  "assistant.savedHost": "保存済みのホスト",
  "assistant.savedHosts": "保存済みのホスト",
  "assistant.openSessions": "開いているセッション",
  "assistant.allHostsHint": "保存済みのすべてのホストと開いているセッション",
  "assistant.serverCount": "{count} 台のサーバー",
  "assistant.sessionsOpen_other": "{count} 個のセッションが開いています",
  "assistant.notConnected": "未接続",
  "assistant.searchScope": "サーバーを検索",
  "assistant.searchScopeAria": "セッションとホストを検索",

  "assistant.model": "モデル",
  "assistant.modelAndEffort": "モデルと思考の強さ",
  "assistant.readingModels": "モデル一覧を読み込んでいます…",
  "assistant.noModels": "モデルは報告されていません。もう一度試してください",
  "assistant.notInRuntimeList": "このランタイムの一覧にありません",
  "assistant.agentDefault": "{agent} の既定",
  "assistant.agentDefaultHint": "インストールした {agent} が使うものをそのまま使います",
  "assistant.effort": "思考の強さ",
  "assistant.effortLow": "低",
  "assistant.effortMedium": "中",
  "assistant.effortHigh": "高",
  "assistant.effortXHigh": "非常に高い",
  "assistant.effortMax": "最高",
  "assistant.effortUltra": "超高",

  "assistant.approvalsLabel": "承認方式：{mode}",
  "assistant.approvalAlways": "毎回尋ねる",
  "assistant.approvalAlwaysHint": "ツール呼び出しのたびに確認を待ちます",
  "assistant.approvalWrites": "変更の前に尋ねる",
  "assistant.approvalWritesHint": "読み取りは自由に進みます",
  "assistant.approvalNever": "手放しモード",
  "assistant.approvalNeverHint": "削除を含め、何も止まりません",

  "assistant.didListHosts": "ホストを一覧しました",
  "assistant.didListSessions": "セッションを一覧しました",
  "assistant.didReadTerminal": "ターミナルを読みました",
  "assistant.didRun": "実行しました",
  "assistant.didType": "入力しました",
  "assistant.didList": "一覧しました",
  "assistant.didRead": "読みました",
  "assistant.didWrite": "書きました",
  "assistant.didConnect": "接続しました",
  "assistant.didDisconnect": "セッションを閉じました",
  "assistant.lastLines": "最後の {count} 行",
  "assistant.recentOutput": "直近の出力",
  "assistant.matching": '"{query}" に一致',

  "assistant.askRunCommand": "コマンドを実行する",
  "assistant.askSendInput": "ターミナルへ入力する",
  "assistant.askWriteFile": "ファイルを上書きする",
  "assistant.askConnectHost": "接続を確立する",
  "assistant.askDisconnect": "セッションを閉じる",
  "assistant.askReadTerminal": "ターミナルを読む",
  "assistant.askReadFile": "ファイルを読む",
  "assistant.askListDirectory": "ディレクトリを一覧する",
  "assistant.askListHosts": "保存済みホストを一覧する",
  "assistant.askListSessions": "開いているセッションを一覧する",
  "assistant.askRunLocally": "ローカルで {tool} を実行する",
  "assistant.onHost": "{host} 上",
  "assistant.allow": "許可",
  "assistant.decline": "拒否",
  "assistant.somethingElse": "別のやり方に…",
  "assistant.insteadPlaceholder": "代わりに何をすべきですか？",
  "assistant.copyCommand": "コマンドをコピー",
  "assistant.localWarning": "これはサーバーではなく、あなた自身のコンピューターで実行されます。",
  "assistant.allowed": "許可しました",
  "assistant.declined": "拒否しました",
  "assistant.timedOut": "タイムアウトしました",

  /* ---------------------------------------------------------------- *
   * Connection overlay (host key, extra auth, retry)
   * ---------------------------------------------------------------- */
  "session.additionalAuth": "追加の認証が必要です",
  "session.closePane": "ペインを閉じる",
  "session.connectingTo": "{title} に接続しています",
  "session.continue": "続ける",
  "session.copied": "コピーしました",
  "session.copyFingerprint": "指紋をコピー",
  "session.couldNotConnect": "接続できませんでした",
  "session.disconnect": "切断",
  "session.hostKeyChanged": "ホスト鍵が変わりました",
  "session.hostKeyChangedDesc":
    "このサーバーが出した鍵は、以前このアドレスで信頼した鍵と一致しません。",
  "session.hostKeyChangedWarn":
    "サーバーの再インストールや鍵の差し替えでもこうなります。中間者攻撃でもこうなります。どちらなのか確認するまで続けないでください。",
  "session.hostKeyUnknown": "未知のホスト鍵",
  "session.hostKeyUnknownDesc":
    "このサーバーは以前見たことがありません。今回の接続で見えた指紋ではなく、サーバー本体から得た指紋で照合してください。",
  "session.replaceStoredKey": "保存済みの鍵を置き換える",
  "session.response": "応答",
  "session.retryAttempt": "（{attempt} / {max} 回目）",
  "session.retryIn": "{seconds} 秒後に再試行",
  "session.retryNow": "今すぐ再試行",
  "session.statusConnected": "接続済み",
  "session.statusConnecting": "接続中…",
  "session.statusDisconnected": "切断済み",
  "session.statusFailed": "切断済み。再接続できません",
  "session.statusFailedShort": "再接続できません",
  "session.statusReconnecting": "再接続中…",
  "session.statusRetrying": "{seconds} 秒後に再接続（{attempt} / {max} 回目）",
  "session.statusRetryingShort": "{seconds} 秒後に再試行",
  "session.trustAndConnect": "信頼して接続",
  "session.tryAgain": "もう一度試す",
  "session.unknownKeyType": "不明",
};

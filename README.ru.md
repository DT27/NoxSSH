<p align="center">
  <img src="appicon.png" alt="NoxSSH" width="128">
</p>

<h1 align="center">NoxSSH</h1>

<p align="center">
  <strong>Современный безопасный мультипротокольный клиент удалённых подключений с приватной синхронизацией WebDAV</strong>
</p>

<p align="center">
  SSH · SFTP · Telnet · Последовательный порт · RDP · VNC<br/>
  Разделение панелей · Передача файлов · Проброс портов · Приватная синхронизация WebDAV
</p>

<p align="center">
  <a href="https://github.com/DT27/NoxSSH/releases/latest"><img alt="Последняя версия" src="https://img.shields.io/github/v/release/DT27/NoxSSH?style=for-the-badge&label=Release&color=2ea44f"></a>
  &nbsp;
  <img alt="Платформы" src="https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue?style=for-the-badge&logo=electron">
  &nbsp;
  <a href="LICENSE"><img alt="Лицензия" src="https://img.shields.io/badge/License-fair--code-green?style=for-the-badge"></a>
</p>

<p align="center">
  <a href="./README.md">简体中文</a> ·
  <a href="./README.en.md">English</a> ·
  <a href="./README.ja.md">日本語</a> ·
  <a href="./README.ko.md">한국어</a> ·
  <a href="./README.es.md">Español</a> ·
  <strong>Русский</strong>
</p>

---

<img src="NoxSSH_Main.png" alt="Главное окно NoxSSH" width="100%">

NoxSSH предназначен для разработчиков и системных администраторов, которые регулярно
управляют серверами, сетевым оборудованием и удалёнными рабочими столами. Приложение
объединяет терминалы, управление файлами, проброс портов и удалённые рабочие столы,
а также синхронизирует настройки между устройствами через WebDAV.

## Основные преимущества

- **Все подключения в одном приложении:** управление сеансами SSH, SFTP, Telnet, последовательного порта, RDP и VNC.
- **Эффективное терминальное пространство:** вкладки, гибкое разделение панелей, широковещательный ввод, восстановление сеансов, поиск и запись.
- **Синхронизация WebDAV:** хосты, ключи, сниппеты, прокси, известные хосты и настройки терминала шифруются локально перед загрузкой.
- **Независимая история:** создание версионных копий по расписанию или вручную; отдельную копию можно восстановить или удалить, не изменяя текущий снимок.
- **Простая миграция:** импорт данных из OpenSSH, PuTTY, KiTTY, MobaXterm и NextSSH.
- **Минимум сетевой активности по умолчанию:** телеметрии нет, автоматическая проверка обновлений отключена до явного включения; ручная проверка доступна всегда.

NoxSSH основан на [CloudTerm](https://github.com/BradPerbs/cloudterm) и заменяет облачную синхронизацию через учётную запись на WebDAV.

---

## Содержание

- [Возможности](#features)
- [Скриншоты](#screenshots)
- [Начало работы](#getting-started)
- [Участие в проекте](#community)
- [Технологии](#tech-stack)
- [Лицензия](#license)

---

<a name="features"></a>

## Возможности

### Терминал

- **Гибкое разделение панелей** по горизонтали и вертикали, увеличение панели и полноэкранный режим
- **Вкладки и группы** с собственными именами и цветами, восстанавливаемые при следующем запуске
- **Светлые и тёмные темы терминала** с настраиваемыми шрифтами и цветами
- **Поиск по буферу и кликабельные ссылки**, включая регулярные выражения
- **Широковещательный ввод** для одновременного управления несколькими сеансами
- **Запись сеансов и скриншоты** для диагностики и документирования

### Подключения

- **SSH, Telnet и последовательные подключения** в одном окне
- **Промежуточные хосты** для подключения через бастионы
- **Прокси SOCKS5, SOCKS4 и HTTP**, общие для терминалов, SFTP, проброса портов и удалённых рабочих столов
- **Пароли, ключи, SSH Agent, сертификаты** и защищённые TPM ключи Windows Hello
- **Интерактивная аутентификация и 2FA**
- **Автоматическое переподключение** после разрыва сети или выхода системы из сна
- **Команды после подключения**, автоматически выполняемые после каждого успешного соединения

### Файлы и сеть

- **Полноценный SFTP-менеджер**: рекурсивная передача, докачка, разрешение конфликтов, перетаскивание
- **Правка удалённых файлов** в своём редакторе, загрузка при каждом сохранении
- **Проброс портов**: локальный, удалённый и динамический SOCKS5, со счётчиками трафика в реальном времени
- **Удалённые рабочие столы**: RDP и VNC прямо в панели, через SSH-туннель

### Данные и миграция

- **Зашифрованная синхронизация WebDAV:** данные шифруются локально фразой синхронизации перед загрузкой. **Фраза синхронизации хранится только на устройстве; при её утрате удалённые данные невозможно расшифровать. Пароль WebDAV используется только для аутентификации подключения.**
- **Исторические копии** можно создавать, восстанавливать и удалять по отдельности, не перезаписывая текущий снимок синхронизации
- **Локальные зашифрованные копии** позволяют экспортировать всю конфигурацию и импортировать её на другом устройстве
- **Импорт из нескольких источников:** OpenSSH, PuTTY, KiTTY, MobaXterm и NextSSH

<a name="operating-systems"></a>

### Определение операционной системы

Операционная система определяется при подключении, а её значок и версия отображаются на карточке хоста.

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

### Безопасность

- **Зашифрованное хранилище** для всех учётных данных, при желании за паролем на
  запуск
- **Проверка ключей хостов** при каждом подключении и на каждом переходе
- **Синхронизация WebDAV**, шифруется на этом компьютере фразой синхронизации до отправки; исторические копии можно восстановить или удалить по одной
- **Зашифрованные резервные копии**, переносящие всю конфигурацию на другую машину
- **Журнал активности** по каждому подключению и каждому изменению

---

<a name="screenshots"></a>

## Скриншоты

### Синхронизация WebDAV и история копий

<img src="NoxSSH_WebDAV.png" alt="Синхронизация WebDAV в NoxSSH" width="100%">

<img src="NoxSSH_WebDAV_backup.png" alt="Исторические копии WebDAV в NoxSSH" width="100%">

### Разделение панелей и SFTP

<img src="NoxSSH_SplitPane.png" alt="Разделение панелей и SFTP" width="100%">

### Windows RDP

<img src="NoxSSH_RDP.png" alt="Windows RDP" width="100%">

### Темы и цвета

<img src="NoxSSH_Customizeable.png" alt="Настройки внешнего вида" width="100%">

---

<a name="getting-started"></a>

## Начало работы

<a name="download"></a>

### Скачать

Скачайте подходящий пакет на странице [последнего релиза](https://github.com/DT27/NoxSSH/releases/latest):

| ОС | Архитектура | Имя файла |
| -- | ----------- | --------- |
| Windows | x64 | `NoxSSH-Setup-v<версия>-x64.exe` (установщик, рекомендуется) или `NoxSSH-v<версия>-x64.exe` (портативная версия) |
| macOS | Apple silicon / Intel | `NoxSSH-v<версия>-arm64.dmg` или `NoxSSH-v<версия>-x64.dmg` |
| Linux | x64 | `NoxSSH-v<версия>-x64.AppImage` |

Или просмотрите [все релизы на GitHub](https://github.com/DT27/NoxSSH/releases).

### Сборка из исходного кода

Требуются Node.js 20 или новее и npm.

```bash
git clone https://github.com/DT27/NoxSSH.git
cd NoxSSH
npm install
npm run dev
```

Сборка пакета для текущей платформы в `dist/`:

```bash
npm run build
```

### Горячие клавиши

|                      |                        |                |                        |
| -------------------- | ---------------------- | -------------- | ---------------------- |
| `Ctrl+Shift+F`       | Поиск по буферу        | `Alt+Shift+=`  | Разделить вправо       |
| `Ctrl+Shift+K`       | Палитра сниппетов      | `Alt+Shift+-`  | Разделить вниз         |
| `Ctrl+Shift+B`       | Широковещательный ввод | `Alt+Shift+Z`  | Увеличить панель       |
| `Ctrl+Shift+C` / `V` | Копировать и вставить  | `Ctrl+Shift+W` | Закрыть панель         |
| `Alt+Стрелки`        | Переход между панелями |                |                        |

<a name="community"></a>

## Участие в проекте

- Сообщайте об ошибках и предлагайте функции в [Issues](https://github.com/DT27/NoxSSH/issues).
- Отправляйте исправления и новые функции через [Pull Requests](https://github.com/DT27/NoxSSH/pulls).
- Перед отправкой изменений выполните `npm test` и `npm run build:renderer`.

<a name="contributors"></a>

## Участники

Спасибо всем, кто поддерживает и улучшает NoxSSH:

<a href="https://github.com/DT27/NoxSSH/graphs/contributors">
  <img alt="Участники NoxSSH" src="https://contrib.rocks/image?repo=DT27/NoxSSH" />
</a>

Также благодарим всех участников исходного проекта CloudTerm.

<a name="tech-stack"></a>

## Технологии

Electron · React · xterm.js · ssh2 · IronRDP (WebAssembly) · noVNC · Tailwind ·
Vite

`src/main/` это главный процесс Electron, по одному модулю на возможность.
`src/renderer/` это интерфейс на React: `components/` по функциям, `hooks/` для
состояния, `lib/` для чистых функций.

<a name="license"></a>

## Лицензия

**NoxSSH** — форк [CloudTerm](https://github.com/BradPerbs/cloudterm).

Этот проект распространяется по исходной [Лицензии CloudTerm](LICENSE) (fair-code).

- Исходный код открыт и его можно читать.
- Программу можно бесплатно использовать, изменять и передавать (включая публикацию форков) для личных целей или внутри компании.
- Продажа программы, включение любой её части в платный продукт или услугу, предоставление в виде платного хостинга или иное коммерческое распространение **требуют отдельной коммерческой лицензии** от CloudBlast.

При распространении любой копии или существенной части необходимо сохранить исходную лицензию и уведомление об авторских правах.

Вы можете точно указать, что эта работа производна от CloudTerm.
Нельзя называть этот проект «CloudTerm» или представлять его как исходящий от CloudBlast.

Полный текст: [LICENSE](LICENSE) | https://faircode.io

Исходный проект: https://github.com/BradPerbs/cloudterm (CloudBlast)

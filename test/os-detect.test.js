/**
 * The os/distro vocabulary shared by live SSH detection and CloudBlast sync.
 *
 * Both paths matter equally: a host synced from the panel and the same host
 * after connecting must agree, or the icon changes under the user for no
 * visible reason.
 */
const path = require('path');
const assert = require('assert');

const {
    classifyShellOutput,
    classifySystemOutput,
    classifyTemplateName,
} = require(path.join(__dirname, '..', 'src', 'main', 'os-detect.js'));

let passed = 0;
const check = (label, fn) => {
    try {
        fn();
        console.log(`  ok   ${label}`);
        passed++;
    } catch (error) {
        console.log(`  FAIL ${label}`);
        console.log(`       ${error.message}`);
        process.exitCode = 1;
    }
};

console.log('\nos detection: shell output');

check('reads a real os-release', () => {
    const output = 'NAME="Ubuntu"\nID=ubuntu\nVERSION_ID="22.04"\n---UNAME---\nLinux web 5.15.0 x86_64';
    assert.deepStrictEqual(classifyShellOutput(output), { os: 'linux', distro: 'ubuntu' });
});

check('prefers the derivative over its base', () => {
    assert.strictEqual(classifyShellOutput('ID=kubuntu\nID_LIKE=ubuntu debian').distro, 'kubuntu');
    assert.strictEqual(classifyShellOutput('ID=manjaro\nID_LIKE=arch').distro, 'manjaro');
});

check('recognises Unraid before its Slackware base', () => {
    const output = [
        '---UNRAID---',
        'version="7.1.4"',
        '---OS-RELEASE---',
        'NAME="Slackware"',
        'ID=slackware',
        'VERSION_ID=15.0',
    ].join('\n');
    assert.strictEqual(classifyShellOutput(output).distro, 'unraid');
    assert.strictEqual(classifySystemOutput(output).osVersion, '7.1.4');
    assert.strictEqual(classifyShellOutput('NAME="Slackware"\nID=slackware').distro, 'slackware');
});

check('recognises the non-Linux families', () => {
    assert.strictEqual(classifyShellOutput('Darwin Kernel Version 23.0').os, 'macos');
    assert.strictEqual(classifyShellOutput('FreeBSD host 14.0-RELEASE').os, 'freebsd');
    assert.strictEqual(classifyShellOutput('OpenBSD host 7.4').os, 'openbsd');
});

check('carries no distro for a non-Linux OS', () => {
    assert.strictEqual(classifyShellOutput('Darwin ... arch ...').distro, '');
});

check('falls back to plain linux when nothing matches', () => {
    assert.deepStrictEqual(classifyShellOutput('Linux box 6.1.0 x86_64'), { os: 'linux', distro: '' });
});

check('survives empty and missing output', () => {
    assert.deepStrictEqual(classifyShellOutput(''), { os: 'linux', distro: '' });
    assert.deepStrictEqual(classifyShellOutput(undefined), { os: 'linux', distro: '' });
});

check('reads Linux and macOS versions from their own system metadata', () => {
    const ubuntu = 'ID=ubuntu\nVERSION_ID="24.04"\n---UNAME---\nLinux web 6.8.0';
    assert.deepStrictEqual(classifySystemOutput(ubuntu), {
        os: 'linux',
        distro: 'ubuntu',
        osVersion: '24.04',
    });

    const macos = '---SYSTEM-VERSION---\n14.5\n---UNAME---\nDarwin mac 23.5.0';
    assert.deepStrictEqual(classifySystemOutput(macos), {
        os: 'macos',
        distro: '',
        osVersion: '14.5',
    });
});

check('extracts the Windows product version rather than the surrounding label', () => {
    const output = [
        '---SYSTEM-VERSION---',
        'Microsoft Windows [Version 10.0.20348.2402]',
        '---UNAME---',
        'Microsoft Windows',
    ].join('\n');
    assert.strictEqual(classifySystemOutput(output).osVersion, '10.0.20348.2402');
});

console.log('\nos detection: CloudBlast template names');

check('maps the common templates', () => {
    assert.deepStrictEqual(classifyTemplateName('Ubuntu 22.04'), { os: 'linux', distro: 'ubuntu' });
    assert.deepStrictEqual(classifyTemplateName('Debian 12'), { os: 'linux', distro: 'debian' });
    assert.deepStrictEqual(classifyTemplateName('AlmaLinux 9'), { os: 'linux', distro: 'alma' });
    assert.deepStrictEqual(classifyTemplateName('Rocky Linux 9'), { os: 'linux', distro: 'rocky' });
    assert.deepStrictEqual(classifyTemplateName('CentOS 7'), { os: 'linux', distro: 'centos' });
    assert.deepStrictEqual(classifyTemplateName('Fedora 40'), { os: 'linux', distro: 'fedora' });
    assert.deepStrictEqual(classifyTemplateName('Alpine Linux 3.19'), { os: 'linux', distro: 'alpine' });
    assert.deepStrictEqual(classifyTemplateName('Unraid 7.1'), { os: 'linux', distro: 'unraid' });
});

check('maps Windows templates', () => {
    assert.deepStrictEqual(classifyTemplateName('Windows Server 2022'), { os: 'windows', distro: '' });
});

check('uses the version field when the name alone is bare', () => {
    assert.deepStrictEqual(classifyTemplateName('Ubuntu', '24.04'), { os: 'linux', distro: 'ubuntu' });
});

check('says nothing rather than guessing for an unidentifiable template', () => {
    assert.deepStrictEqual(classifyTemplateName('Custom image'), { os: '', distro: '' });
    assert.deepStrictEqual(classifyTemplateName(''), { os: '', distro: '' });
    assert.deepStrictEqual(classifyTemplateName(null), { os: '', distro: '' });
});

check('still reports linux when a template names no distribution', () => {
    assert.deepStrictEqual(classifyTemplateName('Generic Linux'), { os: 'linux', distro: '' });
});

check('agrees with shell detection on the same distribution', () => {
    for (const [template, shell] of [
        ['Ubuntu 22.04', 'ID=ubuntu'],
        ['Debian 12', 'ID=debian'],
        ['Rocky Linux 9', 'ID=rocky'],
        ['Alpine Linux 3.19', 'ID=alpine'],
    ]) {
        assert.deepStrictEqual(
            classifyTemplateName(template),
            classifyShellOutput(shell),
            `${template} and ${shell} disagree`,
        );
    }
});

console.log(`\n${passed} checks passed${process.exitCode ? ', with failures above' : ''}\n`);

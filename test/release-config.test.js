const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const pkg = require(path.join(root, 'package.json'));
const { installerName } = require(path.join(root, 'scripts', 'winget-manifest.js'));

function expand(template, values) {
    return template.replace(/\$\{(\w+)\}/g, (placeholder, key) => values[key] || placeholder);
}

const values = {
    version: pkg.version,
    arch: 'x64',
    ext: 'exe',
    productName: pkg.build.productName,
};

const setup = expand(pkg.build.nsis.artifactName, values);
const portable = expand(pkg.build.portable.artifactName, values);
const mac = expand(pkg.build.mac.artifactName, { ...values, arch: 'arm64', ext: 'dmg' });
const linux = expand(pkg.build.linux.artifactName, { ...values, ext: 'AppImage' });

assert.strictEqual(setup, `NoxSSH-Setup-v${pkg.version}-x64.exe`);
assert.strictEqual(portable, `NoxSSH-v${pkg.version}-x64.exe`);
assert.strictEqual(mac, `NoxSSH-v${pkg.version}-arm64.dmg`);
assert.strictEqual(linux, `NoxSSH-v${pkg.version}-x64.AppImage`);
assert.strictEqual(installerName(pkg.version), setup);

const workflow = fs.readFileSync(path.join(root, '.github', 'workflows', 'release.yml'), 'utf8');
const regexSource = workflow.match(/installers-regex:\s*'([^']+)'/)?.[1];

assert.ok(regexSource, 'release workflow has no winget installer regex');

const wingetInstaller = new RegExp(regexSource);
assert.ok(wingetInstaller.test(setup), 'winget regex does not match the versioned installer');
assert.ok(!wingetInstaller.test(portable), 'winget regex also matches the portable build');

console.log('release config: versioned artifact names verified');

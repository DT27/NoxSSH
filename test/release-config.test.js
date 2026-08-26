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

const dayIcon = 'build/AppIcons/icons-day/desktop-1024x1024.png';
const nightIcon = 'build/AppIcons/icons-night/desktop-1024x1024.png';

for (const platform of ['win', 'mac', 'linux']) {
    assert.strictEqual(pkg.build[platform].icon, dayIcon, `${platform} does not use the day package icon`);
}

for (const source of [dayIcon, nightIcon]) {
    assert.ok(fs.existsSync(path.join(root, source)), `missing icon source: ${source}`);
}

function copiedIconSources(entries) {
    return new Set(
        entries
            .filter((entry) => String(entry.to || '').startsWith('app-icons/'))
            .map((entry) => entry.from)
    );
}

const runtimeIconSources = copiedIconSources(pkg.build.extraResources);
assert.ok(runtimeIconSources.has(dayIcon), 'runtime resources omit the day icon');
assert.ok(runtimeIconSources.has(nightIcon), 'runtime resources omit the night icon');

assert.strictEqual(pkg.build.beforeBuild, './scripts/before-build.js');
assert.ok(fs.existsSync(path.join(root, 'scripts', 'before-build.js')), 'missing beforeBuild hook');
assert.ok(!/\s--win\b/.test(pkg.scripts['build:electron']), 'default electron build is pinned to Windows');
assert.ok(/\s--win\b/.test(pkg.scripts['build:electron:win']), 'Windows electron build is missing --win');
assert.ok(workflow.includes('scripts/before-build.js'), 'release workflow does not mention the beforeBuild hook');
assert.ok(!workflow.includes('rm -rf node_modules/cpu-features'), 'release workflow still deletes cpu-features by hand');

const beforeBuild = require(path.join(root, 'scripts', 'before-build.js'));
const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'noxssh-before-build-'));
const cpuFeatures = path.join(tmp, 'node_modules', 'cpu-features');
fs.mkdirSync(cpuFeatures, { recursive: true });
fs.writeFileSync(path.join(cpuFeatures, 'package.json'), '{"name":"cpu-features"}');
assert.strictEqual(beforeBuild({ appDir: tmp }), true, 'beforeBuild must return true so electron-builder still packs node_modules');
assert.ok(!fs.existsSync(cpuFeatures), 'beforeBuild left cpu-features in place');
fs.rmSync(tmp, { recursive: true, force: true });

console.log('release config: artifact names and adaptive icons verified');

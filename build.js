/* eslint-disable no-console, import/no-extraneous-dependencies */
const {
  promises: {
    readdir, writeFile, mkdir, unlink,
  },
  createWriteStream,
} = require('fs');
const { join, dirname } = require('path');
const archiver = require('archiver');

const manifest = require('./src/manifest.json');
const pkg = require('./package.json');

const lsr = async (path) => {
  const files = [];
  const entries = await readdir(path, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    if (entry.isFile()) {
      files.push(join(path, entry.name));
    } else if (entry.isDirectory()) {
      const children = await lsr(join(path, entry.name));
      children.forEach((child) => {
        files.push(child);
      });
    }
  }));
  return files;
};

const compress = async (root, target) => {
  await unlink(target).catch(() => null);
  const archive = archiver('zip');
  await mkdir(dirname(target), { recursive: true });
  const output = createWriteStream(target);
  return new Promise((resolve, reject) => {
    output.on('close', () => {
      resolve(archive.pointer());
    });
    archive.on('error', (err) => {
      reject(err);
    });
    archive.pipe(output);
    archive.directory(root, false);
    archive.finalize();
  });
};

(async () => {
  manifest.version = pkg.version;
  manifest.web_accessible_resources = (await lsr('./src')).filter((a) => (
    a !== 'src/manifest.json' && a !== 'src/extension.js'
  )).map((a) => a.replace(/^src\//, ''));
  console.log(`Web-accessible:\n\t${manifest.web_accessible_resources.join('\n\t')}`);
  await writeFile('./src/manifest.json', `${JSON.stringify(manifest, null, 2)}\n`);
  console.log('Updated manifest.json');
  console.log('Compressing...');
  await compress('./src', `dist/${pkg.name}.zip`);
})();

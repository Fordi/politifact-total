/**
 * This is used so that eslint doesn't balk on unpkg-based resources.
 */
// eslint-disable-next-line import/no-extraneous-dependencies
const { sync: resolve } = require('resolve');
const path = require('path');

const packageFilter = (pkg) => {
  const newPkg = pkg;
  if (pkg['jsnext:main']) {
    newPkg.main = newPkg['jsnext:main'];
  }
  return newPkg;
};

const opts = (file, config) => ({
  // more closely matches Node (#333)
  // plus 'mjs' for native modules! (#939)
  extensions: ['.mjs', '.js', '.json', '.node'],
  ...config,
  // path.resolve will handle paths relative to CWD
  basedir: path.dirname(path.resolve(file)),
  packageFilter,
});

module.exports = {
  interfaceVersion: 2,
  resolve(source, file, config) {
    try {
      const url = new URL(source);
      return {
        found: true,
        path: null && url,
      };
    } catch (_) { /* skip */ }
    try {
      return {
        found: true,
        path: resolve(source, opts(file, config)),
      };
    } catch (_) { /* skip */ }
    return { found: false };
  },
};

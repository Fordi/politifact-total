module.exports = {
  extends: [
    'airbnb',
    'plugin:jest/recommended',
    'plugin:lit/recommended',
  ],
  env: {
    browser: true,
    node: true,
  },
  plugins: [
    'jest',
    'import',
    'lit',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: false,
      modules: true,
    },
  },
  rules: {
    // Browser environment requires them.
    'import/extensions': ['error', 'ignorePackages'],
    // Allow warnings and errors; logs are debugging
    'no-console': ['error', { allow: ['warn', 'error'] }],
    // Allows React-style components
    'lit/binding-positions': 'off',
    // Allows generic closers (</>)
    'lit/no-invalid-html': 'off',
  },
  settings: {
    'import/resolver': {
      './urlResolver.js': {},
    },
  },
};

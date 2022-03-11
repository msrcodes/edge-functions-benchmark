module.exports = {
  extends: ['./node_modules/gts/', 'plugin:@next/next/recommended'],
  rules: {
    'node/no-unpublished-import': [
      'error',
      {
        allowModules: ['next'],
      },
    ],
  },
};

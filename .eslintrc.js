module.exports = {
    "env": {
        "commonjs": true,
        "es6": true
    },
    "extends": "airbnb-base",
    "globals": {
        "wx": "wx"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
      'func-names': 'warn',
      'no-console': 'warn',
      'no-unused-vars': 'error',
      'quotes': 'warn',
      'spaced-comment': 'warn',
      'comma-dangle': 'warn',
      'key-spacing': 'warn',
      'space-before-function-paren': 'warn',
      'no-plusplus': 'off',
      'semi': 'warn',
      'no-extra-semi': 'warn',
      'eol-last': 'warn',
      'vars-on-top': 'warn',
      'linebreak-style': 'off',
      'max-len': 'off',
      'no-restricted-syntax': 'off',
      'import/order': 'warn'
    }
};
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: ['babel'],
  env: {
    es6: true,
    jest: true
  },
  extends: ['standard'],
  rules: {
    'max-len': ['error', {
      code: 100,
      ignoreStrings: true,
      ignoreTemplateLiterals: true
    }],
    'no-unused-expressions': 'off',
    'babel/no-unused-expressions': 'error'
  }
}

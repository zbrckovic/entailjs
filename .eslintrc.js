module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended'],
    env: {
        es6: true,
        jest: true
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'object-curly-spacing': ['error', 'always'],
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                'multiline': {
                    'delimiter': 'none',
                    'requireLast': false
                },
                'singleline': {
                    'delimiter': 'comma',
                    'requireLast': false
                }
            }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-extra-semi': 'off',
        '@typescript-eslint/no-extra-semi': ['error'],
        'quotes': 'off',
        '@typescript-eslint/quotes': ['error', 'single', { 'avoidEscape': true }],
        'semi': 'off',
        '@typescript-eslint/semi': ['error', 'never'],
        'indent': 'off',
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/no-non-null-assertion': 'off'
    }
}

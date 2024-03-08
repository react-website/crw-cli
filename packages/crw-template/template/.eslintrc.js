const { alias = {} } = require('./crw.config')()

module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
        allowImportExportEverywhere: true,
        ecmaFeatures: {
            jsx: true,
            globalReturn: true,
        },
    },
    plugins: ['react', 'react-hooks'],
    extends: ['eslint:recommended', 'eslint-config-skyer'],
    rules: {},
    settings: {
        'import/resolver': {
            webpack: {
                config: {
                    resolve: {
                        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
                        alias,
                    },
                },
            },
        },
    },
    env: {
        node: true,
        browser: true,
        es6: true,
    },
}

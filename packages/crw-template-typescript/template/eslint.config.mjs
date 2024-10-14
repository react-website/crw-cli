import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        rules: {
            'react/no-unknown-property': ['error', { ignore: ['styleName'] }],
            '@typescript-eslint/no-explicit-any': 'off',
            // 句尾分号可以省略
            'semi': ['error', 'never'],
            // 使用单引号
            'quotes': ['error', 'single'],
            // 代码使用4个空格的缩进风格
            'indent': ['error', 4, { 'SwitchCase': 1 }],
            // 关闭拖尾逗号
            'comma-dangle': 'off',
            // 要求使用let或const而不是var
            'no-var': 'error',
            // 禁止未使用过的变量包括全局变量和函数中的最后一个参数必须使用
            'no-unused-vars': [
                'error',
                {
                    'vars': 'all',
                    'args': 'after-used'
                }
            ],
            // 箭头函数的箭头前后都要有空格
            'arrow-spacing': [2, { 'before': true, 'after': true }],
            'array-bracket-spacing': ['error', 'never'],
            'object-curly-spacing': ['error','always'],
            // 关闭强制在花括号内使用一致的换行符
            'object-curly-newline': 'off',
            'new-cap': ['error', { 'properties': false, 'capIsNew': false }],
            'no-useless-escape': 'off',
            // 可以行尾空白
            'no-trailing-spaces': 'off',
            // 关闭换行符转换
            'linebreak-style': 'off',
            // 禁止使用指定语法
            'no-restricted-syntax': ['error', 'WithStatement'],
            // 关闭语句块之前的空格保持一致
            'space-before-blocks': 0,
            // jsx代码使用4个空格的缩进风格
            'react/jsx-indent': ['error', 4],
            // jsx属性使用4个空格的缩进风格
            'react/jsx-indent-props': ['error', 4],
            // 组件内部换行
            'react/jsx-one-expression-per-line': 'off',
            // 组件属性可以传any,array,object
            'react/forbid-prop-types': 'off',
            // 禁止空多行
            'no-multiple-empty-lines': ['error', { max: 1 }],
            'key-spacing': [0, { 'beforeColon': false, 'afterColon': true }]
        }
    }
]

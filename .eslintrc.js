module.exports = {
    extends: [
        'eslint-config-alloy/react',
        'eslint-config-alloy/typescript',
    ],
    plugins: [
        'react-hooks',
    ],
    globals: {},
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        '@typescript-eslint/indent': 'off',
        'react/jsx-indent-props': [
            'error',
            4,
        ],
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/typedef': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        'comma-dangle': ['error', 'always-multiline'],
        'react/jsx-indent': [
            'error',
            4,
        ],
        'react-hooks/exhaustive-deps': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        'eol-last': 2,
        semi: ['error', 'always'],
        quotes: [2, 'single'],
        'jsx-quotes': ['error', 'prefer-double'],
        'complexity': 'off',
        'max-nested-callbacks': 'off',
    },
};

const esLintRC = {
    parser: '@babel/eslint-parser',
    extends: ['airbnb'],
    env: {
        browser: true,
        node: true,
    },
    rules: {
        indent: ['error', 4],
        'import/no-extraneous-dependencies': 'off',
        'no-restricted-syntax': 'off',
        'max-len': 'off',
        'no-param-reassign': 'off',
        'consistent-return': 'off',
        'no-extend-native': 'off',
    },
};

module.exports = esLintRC;

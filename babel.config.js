const babelConfig = {
    presets: [[
        '@babel/preset-env',
        {
            loose: false,
            modules: false,
            useBuiltIns: 'usage',
            corejs: {
                version: 3,
                proposal: true,
            },
        },
    ], [
        '@babel/preset-react',
        {
            runtime: 'automatic',
        },
    ]],
    plugins: [[
        '@babel/plugin-proposal-decorators',
        {
            legacy: true,
        },
    ], [
        '@babel/plugin-proposal-class-properties',
    ], [
        '@babel/plugin-syntax-dynamic-import',
    ]],
};

module.exports = babelConfig;

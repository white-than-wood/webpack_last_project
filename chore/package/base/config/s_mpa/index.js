const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sMpa = (templateParameters) => {
    const entry = {};
    const htmlWebpackPlugin = [];

    const paths = glob.sync(path.resolve(process.cwd(), './src/**/index.ejs'));
    const entrySymbol = /src[/|\\]?(.*)[/|\\]index/;

    for (const val of paths) {
        const entryArr = entrySymbol.exec(val) || [];
        const entryPoint = entryArr[1] || 'index';
        const entryKeyArr = entryPoint.split('/');
        const entryKeyArrLength = entryKeyArr.length;
        const entryKey = entryKeyArr.join('_');
        const entryValue = entryArr[0] || 'src/index';
        const templatePublicPath = !entryArr[1] ? './' : '../'.repeat(entryKeyArrLength);
        const templatePath = `./${!entryArr[1] ? '' : `${entryKey}/`}index.html`;

        entry[entryKey] = `./${entryValue}.js`;
        htmlWebpackPlugin.push(new HtmlWebpackPlugin({
            publicPath: templatePublicPath,
            path: templatePath,
            template: paths,
            chunks: ['commons', entryKey],
            minify: true,
            inject: 'body',
            templateParameters: {
                ...templateParameters,
                vendors: `${templatePublicPath}vendors/main.js`,
            },
        }));
    }

    return {
        entry,
        htmlWebpackPlugin,
    };
};

module.exports = sMpa;

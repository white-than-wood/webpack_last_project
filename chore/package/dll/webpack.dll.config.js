const webpack = require('webpack');
const path = require('path');

const DLL_DIR = path.resolve(process.cwd(), './build/vendors');
const MANIFEST_DIR = path.resolve(DLL_DIR, './manifest.json');

const dllConfig = {
    mode: 'production',
    entry: [
        'react',
        'react-dom',
    ],
    output: {
        publicPath: '',
        filename: '[name].js',
        path: DLL_DIR,
        chunkFilename: '[name].js',
        library: {
            name: '[name]_[fullhash]',
            type: 'umd',
        },
    },
    stats: {
        preset: 'minimal',
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                },
            }],
        }],
    },
    plugins: [
        new webpack.DllPlugin({
            context: process.cwd(),
            name: '[name]_[fullhash]',
            path: MANIFEST_DIR,
        }),
    ],
};

module.exports = dllConfig;

const webpack = require('webpack');
const path = require('path');
const open = require('open');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');

const { sMpa } = require('./config');

const OUTPUT_DIR = path.resolve(process.cwd(), './build');
const STATIC_DIR = OUTPUT_DIR;
const NEXT_LOADER_DIR = path.resolve(process.cwd(), './chore/loaders/next.js');
const MANIFEST_DIR = path.resolve(OUTPUT_DIR, './vendors/manifest.json');

const PORT = 9999;

module.exports = ({ env, mobile }) => {
    /**
     * 模板变量配置
     * @type {{mobile}}
     */
    const templateParameters = {
        mobile,
    };

    /**
     * S/MPA 配置
     */
    const {
        entry,
        htmlWebpackPlugin,
    } = sMpa(templateParameters);

    /**
     * rem loader 配置
     * @type {{loader: string, options: {remPrecision: number, remUnit: number}}|{loader: string}}
     */
    const remConfig = (mobile === 'rem') ? {
        loader: 'px2rem-loader',
        options: {
            remUnit: 75,
            remPrecision: 8,
        },
    } : {
        loader: NEXT_LOADER_DIR,
    };

    /**
     * vm postcss-loader 参数配置
     */
    const vmConfig = (mobile === 'vm') ? {
        postcssOptions: {
            'postcss-px-to-viewport': {
                unitToConvert: 'px',
                viewportWidth: 750,
                viewportUnit: 'vw',
                unitPrecision: 8,
            },
        },
    } : {};

    const baseConfig = {
        entry,
        output: {
            publicPath: '',
            path: OUTPUT_DIR,
            filename: 'js/[name].[fullhash].js',
            chunkFilename: 'js/[name].[fullhash].js',
        },
        mode: env,
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        optimization: {
            minimizer: [
                new CSSMinimizerWebpackPlugin(),
                new ImageMinimizerWebpackPlugin({
                    minimizer: {
                        implementation: ImageMinimizerWebpackPlugin.imageminMinify,
                        options: {
                            plugins: [
                                ['gifsicle', { interlaced: true }],
                                ['jpegtran', { progressive: true }],
                                ['optipng', { optimizationLevel: 5 }],
                                [
                                    'svgo',
                                    {
                                        plugins: [
                                            {
                                                name: 'preset-default',
                                                params: {
                                                    overrides: {
                                                        removeViewBox: false,
                                                        addAttributesToSVGElement: {
                                                            params: {
                                                                attributes: [
                                                                    { xmlns: 'http://www.w3.org/2000/svg' },
                                                                ],
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                ],
                            ],
                        },
                    },
                }),
                '...',
            ],
            splitChunks: {
                chunks: 'all',
                minChunks: 2,
                cacheGroups: {
                    commons: {
                        name: 'commons',
                        minSize: 5 * 1024,
                        priority: 10,
                    },
                },
            },
        },
        stats: {
            preset: 'minimal',
        },
        devServer: {
            host: 'localhost',
            port: PORT,
            historyApiFallback: true,
            static: STATIC_DIR,
            compress: true,
            hot: true,
            open: {
                app: {
                    name: open.apps.chrome,
                },
            },
        },
        module: {
            rules: [{
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                }],
            }, {
                test: /\.css$/,
                use: [MiniCSSExtractPlugin.loader, {
                    loader: 'css-loader',
                    importLoaders: 2,
                }, remConfig, {
                    loader: 'postcss-loader',
                    options: vmConfig,
                }],
            }, {
                test: /\.less$/,
                use: [MiniCSSExtractPlugin.loader, {
                    loader: 'css-loader',
                    importLoaders: 3,
                }, remConfig, {
                    loader: 'postcss-loader',
                    options: vmConfig,
                }, {
                    loader: 'less-loader',
                }],
            }, {
                test: /\.(jpg|jpeg|png|bmp|gif)$/,
                type: 'asset',
                generator: {
                    publicPath: './',
                    filename: 'asset/[name].[contenthash:6][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024,
                    },
                },
            }, {
                test: /\.(woff|woff2|otf|otc)$/,
                generator: {
                    publicPath: '../',
                    filename: 'asset/[name].[contenthash:6][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024,
                    },
                },
            }],
        },
        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [
                    '**/*',
                    '!vendors/**/*',
                ],
            }),
            new MiniCSSExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
            new ESLintWebpackPlugin(),
            new webpack.DllReferencePlugin({
                manifest: MANIFEST_DIR,
            }),
            ...htmlWebpackPlugin,
        ],
    };
    return baseConfig;
};

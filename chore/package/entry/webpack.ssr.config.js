const merge = require('webpack-merge');

const baseConfig = require('../base/webpack.base.config');

module.exports = (env) => {
    const ssrConfig = {
        target: 'node',
    };
    return merge(baseConfig(env), ssrConfig);
};

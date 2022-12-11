const merge = require('webpack-merge');

const baseConfig = require('../base/webpack.base.config');

module.exports = (env) => {
    const webConfig = {
        target: 'web',
    };
    return merge(baseConfig(env), webConfig);
};

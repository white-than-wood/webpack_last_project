const fs = require('fs');
const { resolve } = require('path');

const type = {
    spa: {
        value: './chore/package/entry/webpack.config.js',
    },
    mpa: {
        value() {
            return this.spa.value;
        },
    },
    ssr: {
        value: './chore/package/entry/webpack.ssr.config.js',
    },
    mobile: {
        value() {
            return this.spa.value;
        },
    },
};

const env = {
    development: {
        value: 'webpack-dev-server',
        options: '--config',
        env: {
            value: '--env',
            options: 'env=development',
        },
    },
    production: {
        value: 'webpack',
        options: '--config',
        env: {
            value: '--env',
            options: 'env=production',
        },
    },
};

const options = {
    vm: {
        options: '--env',
        value: 'mobile=vm',
    },
    rem: {
        options: '--env',
        value: 'mobile=rem',
    },
};

const step = {
    command: [],
    commonPath(path, buildPath = []) {
        if (fs.existsSync(path)) {
            if (buildPath.length > 0) {
                path = [path, buildPath.pop()].join('/');
                fs.mkdirSync(path, { recursive: true });
                return this.commonPath(path, buildPath);
            }
            return true;
        }
        const pathArr = path.split(/\//);
        buildPath.push(pathArr.pop());
        return this.commonPath(pathArr.join('/'), buildPath);
    },
    commonFile(path, filename, command) {
        if (this.commonPath(path)) {
            if (!fs.existsSync(resolve(path, filename))) {
                this.command.push(command);
            }
            return this;
        }
        return this;
    },
    env(mode, typeEnum, optionsEnum) {
        const envConfig = env[mode];
        let resultArr = [envConfig.value, `${envConfig.options}=${this.type(typeEnum)}`, envConfig.env.value, envConfig.env.options];
        resultArr = optionsEnum ? resultArr.concat(optionsEnum ? [...this.options(optionsEnum)] : []) : resultArr;
        this.command.push(resultArr.join(' '));
        return this;
    },
    type(typeEnum) {
        const typeValue = type[typeEnum].value;
        return typeof typeValue === 'function' ? typeValue.call(type) : typeValue;
    },
    options(optionsEnum) {
        const typeOptions = options[optionsEnum];
        return [typeOptions.options, typeOptions.value];
    },
    exec() {
        return this.command.join(' && ');
    },
};

module.exports = {
    step,
    env,
    options,
    type,
};

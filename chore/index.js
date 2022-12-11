const inquirer = require('inquirer');
const shelljs = require('shelljs');
const path = require('path');

const { prompt, builder } = require('./utils');
const {
    step, env, options, type,
} = require('./config');

const promptModule = prompt(inquirer.createPromptModule());

const envPrompt = () => promptModule({
    name: 'env',
    message: '请您选择要构建打包所属的环境:',
    choices: Object.keys(env),
});

const typePrompt = () => promptModule({
    name: 'type',
    message: '请您选择要构建打包所属的项目类型:',
    choices: Object.keys(type),
});

const optionsPrompt = () => promptModule({
    name: 'options',
    message: '请您选择要构建打包移动端项目分辨率适配的方式:',
    choices: Object.keys(options),
});

builder.run(function* taskRun() {
    const { env: envName } = yield envPrompt();
    const { type: typeName } = yield typePrompt();
    const { options: optionsName = '' } = (type === 'mobile') ? yield optionsPrompt() : {};
    return step.commonFile(path.resolve(process.cwd(), './build/vendors'), 'manifest.json', 'yarn run dll').env(envName, typeName, optionsName).exec();
}).then((value) => {
    shelljs(value);
}).catch((err) => {
    // eslint-disable-next-line
    console.error(err);
});

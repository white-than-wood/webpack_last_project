const czConfig = {
    types: [{
        name: '🎉 build(初始化打包)',
        value: ':tada: build'
    }, {
        name: '📦️chore(构建/依赖/工具)',
        value: ':package: chore'
    }, {
        name: '✨  feat(新功能)',
        value: ':sparkles: feat'
    }, {
        name: '🐛 fix(修复Bug)',
        value: ':bug: fix'
    }, {
        name: '💄 style(代码样式美化)',
        value: ':lipstick: style'
    }, {
        name: '📝 docs(变更文档)',
        value: ':memo: docs'
    }, {
        name: '🚀 perf(性能优化)',
        value: ':rocket: perf'
    }, {
        name: '✅  test(测试)',
        value: ':white_check_mark: test'
    }, {
        name: '💥 refactor(重构)',
        value: ':boom: refactor'
    }, {
        name: '👷 ci(CI related changes)',
        value: ':construction_worker: ci'
    }, {
        name: '⏪️ revert(回退)',
        value: ':rewind: revert'
    }, {
        name: '🏗️wip(建设进程中)',
        value: ':building_construction: wip'
    }],
    messages: {
        type: '请您选择本次提交的类型:(必选)',
        scope: '请您选择本次提交的修改范围:',
        subject: '请您简要描述一下本次提交:(必填,首字母不可大写;不能以\'.\'为结尾)',
        body: '请您对本次提交作详细描述:',
        breaking: '请您对本次提交的 Breaking Changes 作详细描述:(必须以 Breaking Changes 为开头)',
        footer: '请您对本次提交所要删除的对应 issue 作详细描述:',
        confirmCommit: '确定以上对本次提交的选择吗?(y/yes)'
    },
    scopes: [{name: 'hooks           【hooks】'}, {name: 'components      【组件】'}, {name: 'business        【业务逻辑】'}],
    customScopesName: 'custom          【自定义】',
    emptyScopesName: 'empty           【空】',
    allowCustomScopes: true,
    allowEmptyScopes: true,
    allowBreakingChanges: [':sparkles: feat', ':bug: fix', ':boom: refactor'],
    subjectLimit: 140
};

module.exports = czConfig;
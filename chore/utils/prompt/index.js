Function.prototype.bindAssign = function bindAssign(context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('The call must be a function');
    }
    const self = this;

    function F() {
    }

    const fBind = function fBind(...assignArgs) {
        return self.apply(this instanceof fBind ? this : context, [[Object.assign(...args, ...assignArgs)]]);
    };
    Object.setPrototypeOf(F.prototype, this.prototype);
    Object.setPrototypeOf(fBind.prototype, F.prototype);
    return fBind;
};

const createPrompt = (fn) => fn.bindAssign(null, {
    type: 'list',
    filter(value) {
        return value.toLowerCase();
    },
});

module.exports = createPrompt;

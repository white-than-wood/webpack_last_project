const Thunk = (fn) => (...args) => (callback) => fn(...args, callback);

const run = (taskRun) => new Promise((resolve, reject) => {
    const task = taskRun();
    function next(err, data) {
        if (err) reject(task.throw(err));
        const { done, value } = task.next(data);
        if (done) return resolve(value);
        const promise = Promise.resolve(value);
        promise.then((resolveValue) => {
            next(null, resolveValue);
        }, (reason) => {
            next(reason);
        });
    }
    next();
});

module.exports = {
    thunk: Thunk,
    run,
};

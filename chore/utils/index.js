const createPrompt = require('./prompt');
const generator = require('./generator');

module.exports = {
    prompt: createPrompt,
    builder: generator,
};

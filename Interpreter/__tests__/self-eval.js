const assert = require('assert');

module.exports = eva => {
	//Simple
	assert.strictEqual(eva.eval(1), 1);
	assert.strictEqual(eva.eval('"Hello"'), 'Hello');
}
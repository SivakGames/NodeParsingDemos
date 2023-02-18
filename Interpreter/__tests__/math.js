const assert = require('assert');

module.exports = eva => {
	//Math
	assert.strictEqual(eva.eval(['+', ['+', 3, 2], 5]), 10);
	assert.strictEqual(eva.eval(['+', ['*', 3, 2], 5]), 11);
	assert.strictEqual(eva.eval(['%', 8, 3]), 2);
	assert.strictEqual(eva.eval(['-', 17]), -17);
	assert.strictEqual(eva.eval(['-', ['-', 18]]), 18);
}
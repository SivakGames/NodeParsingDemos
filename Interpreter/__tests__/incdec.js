const assert = require('assert');

module.exports = eva => {

	assert.strictEqual(eva.eval(
		['begin', 
			['var','x',10],
			['+=','x', 7],
		],
	), 17);
}

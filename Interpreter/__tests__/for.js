const assert = require('assert');

module.exports = eva => {

	eva.eval(
		['begin', 
			['for',
				['var', 'x', 0],
				['<', 'x', 5],
				['++', 'x'],
				['print', 'x']],
		],
	);
}
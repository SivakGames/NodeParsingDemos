const assert = require('assert');

module.exports = eva => {

	assert.strictEqual(eva.eval(
		['begin',
			['module', 'Math',
				['begin', 
					['def', 'abs', ['value'],
						['if', ['<', 'value', 0],
							['-', 'value'],
							'value'
						],
					],
					['def', 'square', ['x'],
						['*', 'x', 'x'],
					],
				],
			],
			[['prop', 'Math', 'abs'], ['-', 10]]
		]
	), 10);

	assert.strictEqual(eva.eval(
		['begin',
			['module', 'Math',
				['begin',
					['var', 'MAX_VALUE', 10000],
				],
			],
			['prop', 'Math', 'MAX_VALUE']
		]
	), 10000);


	
}

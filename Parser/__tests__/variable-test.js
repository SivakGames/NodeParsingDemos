module.exports = test =>
{

	//Variable declaration with initializer
	test(`let x = 42;`, {
		type: "Program",
		body: [
			{
				type: "VariableStatement",
				declarations: [
					{
						type: "VariableDeclaration",
						id: {
							type: 'Identifier',
							name: 'x',
						},
						init: {
							type: 'NumericLiteral',
							value: 42,
						},
					},
				],
			}
		],
	});


	//Variable declaration with no initializer
	test(`let x;`, {
		type: "Program",
		body: [
			{
				type: "VariableStatement",
				declarations: [
					{
						type: "VariableDeclaration",
						id: {
							type: 'Identifier',
							name: 'x',
						},
						init: null,
					},
				],
			}
		],
	});


	//Multiple variable declaration with no initializer
	test(`let x, y;`, {
		type: "Program",
		body: [
			{
				type: "VariableStatement",
				declarations: [
					{
						type: "VariableDeclaration",
						id: {
							type: 'Identifier',
							name: 'x',
						},
						init: null,
					},
					{
						type: "VariableDeclaration",
						id: {
							type: 'Identifier',
							name: 'y',
						},
						init: null,
					},
				],
			}
		],
	});

	//Multiple variable declaration with 1 initializer
	test(`let x, y = 42;`, {
		type: "Program",
		body: [
			{
				type: "VariableStatement",
				declarations: [
					{
						type: "VariableDeclaration",
						id: {
							type: 'Identifier',
							name: 'x',
						},
						init: null,
					},
					{
						type: "VariableDeclaration",
						id: {
							type: 'Identifier',
							name: 'y',
						},
						init: {
							type: 'NumericLiteral',
							value: 42,
						}
					},
				],
			}
		],
	});

}
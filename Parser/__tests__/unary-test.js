module.exports = test =>
{

	//Variable declaration with initializer
	test(`-x;`, {
		type: "Program",
		body: [
			{
				type: "ExpressionStatement",
				expression: {
					type: "UnaryExpression",
					operator: "-",
					argument: {
						type: 'Identifier',
						name: 'x',
					},
				},
			},
		],
	});


	

}
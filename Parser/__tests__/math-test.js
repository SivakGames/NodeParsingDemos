module.exports = test =>
{

	//Simple binary
	test(`2 + 3;`, {
		type: "Program",
		body: [
			{
				type: "ExpressionStatement",
				expression: {
					type: "BinaryExpression",
					operator: '+',
					left: {
						type: 'NumericLiteral',
						value: 2
					},
					right: {
						type: 'NumericLiteral',
						value: 3
					}
				}
			}
		],
	});

	//Chained binary
	// Left: 3 + 2
	// Right: 2
	test(`3 + 2 - 2;`, {
		type: "Program",
		body: [
			{
				type: "ExpressionStatement",
				expression: {
					type: "BinaryExpression",
					operator: '-',
					left: {
						type: 'BinaryExpression',
						operator: '+',
						left: {
							type: 'NumericLiteral',
							value: 3,
						},
						right: {
							type: 'NumericLiteral',
							value: 2
						}
					},
					right: {
						type: 'NumericLiteral',
						value: 2
					}
				}
			}
		],
	});

	//Chained binary with multiplication
	test(`2 + 2 * 2;`, {
		type: "Program",
		body: [
			{
				type: "ExpressionStatement",
				expression: {
					type: "BinaryExpression",
					operator: '+',
					left: {
						type: 'NumericLiteral',
						value: 2
					},
					right: {
						type: 'BinaryExpression',
						operator: '*',
						left: {
							type: 'NumericLiteral',
							value: 2,
						},
						right: {
							type: 'NumericLiteral',
							value: 2
						}
					},
				}
			}
		],
	});

	//With parens
	test(`(2 + 2) * 2;`, {
		type: "Program",
		body: [
			{
				type: "ExpressionStatement",
				expression: {
					type: "BinaryExpression",
					operator: '*',
					left: {
						type: 'BinaryExpression',
						operator: '+',
						left: {
							type: 'NumericLiteral',
							value: 2,
						},
						right: {
							type: 'NumericLiteral',
							value: 2
						}
					}, 
					right: {
						type: 'NumericLiteral',
						value: 2
					},
				}
			}
		],
	});

}
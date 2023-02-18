module.exports = test =>
{
	test(` { 412; 'gaga'; }`, {
		type: "Program",
		body: [
			{
				type: "BlockStatement",
				body: [
					{
						type: "ExpressionStatement",
						expression: {
							type: "NumericLiteral",
							value: 412,
						}
					},
					{
						type: "ExpressionStatement",
						expression: {
							type: "StringLiteral",
							value: 'gaga',
						}
					},
				],
				
			}
		],
	});

	//Empty block
	test(` { }`, {
		type: "Program",
		body: [
			{
				type: "BlockStatement",
				body: [],
			}
		],
	});


	//Nested block
	test(` { 413; {'gaga2';} }`, {
		type: "Program",
		body: [
			{
				type: "BlockStatement",
				body: [
					{
						type: "ExpressionStatement",
						expression: {
							type: "NumericLiteral",
							value: 413,
						}
					},
					{
						type: "BlockStatement",
						body: [
							{	
								type: "ExpressionStatement",
								expression: {
									type: "StringLiteral",
									value: 'gaga2',
								}
							},
						],
					},
				],
			}
		],
	});
}
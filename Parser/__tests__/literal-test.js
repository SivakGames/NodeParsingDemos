module.exports = test => {

	//NumericLiteral
	test(`42;`, {
		type: "Program",
		body: [
			{
				type: "ExpressionStatement",
				expression: {
					type: "NumericLiteral",
					value: 42,
				}
			}
		],
	});

	//StringLiteral
	test(`"42a";`, {
		type: "Program",
		body: [
			{
				type: "ExpressionStatement",
				expression: {
					type: "StringLiteral",
					value: '42a',
				}
			}
		],
	});

}
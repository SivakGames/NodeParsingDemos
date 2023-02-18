module.exports = test =>
{

	test(`class Point {
		def constructor(x, y) {
			this.x = x;
		}
	}`, {
		type: "Program",
		body: [
			{
				type: 'ClassDeclaration',
				id: {
					type: "Identifier",
					name: 'Point',
				},
				superClass: null,
				body: {
					type: 'BlockStatement',
					body: [
						{
							type: 'FunctionDeclaration',
							name: {
								type: 'Identifier',
								name: 'constructor',
							},
							params: [
								{
									type: 'Identifier',
									name: 'x',
								},
								{
									type: 'Identifier',
									name: 'y',
								},
							],
							body: {
								type: 'BlockStatement',
								body: [
									{
										type: 'ExpressionStatement',
										expression: {
											type: 'AssignmentExpression',
											left: {
												type: 'MemberExpression',
												computed: false,
												object: {
													type: 'ThisExpression',
												},
												property: {
													type: 'Identifier',
													name: 'x',
												}
											},
											operator: '=',
											right: {
												type: 'Identifier',
												name: 'x',
											}
										}
									}
								]
							}
						}
					]
				}
			}
		],
	});

	test(`new Point3D(10,20,30);`, {
		type: "Program",
		body: [
			{
				type: 'ExpressionStatement',
				expression: {
					type: 'NewExpression',
					callee: {
						type: 'Identifier',
						name: 'Point3D',
					},
					arguments: [
						{
							type: 'NumericLiteral',
							value: 10,
						},
						{
							type: 'NumericLiteral',
							value: 20,
						},
						{
							type: 'NumericLiteral',
							value: 30,
						},
					]
				},
			}
		],
	});

}
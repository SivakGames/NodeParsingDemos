module.exports = test =>
{

	//Empty block
	test(`;`, {
		type: "Program",
		body: [
			{
				type: "EmptyStatement",
			}
		],
	});

}
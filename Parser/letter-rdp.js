'use strict';

const { Parser } = require('./src/demo1');


function main(argv) {
	const [_node, _path, mode, exp] = argv;

	const parser = new Parser();

	let ast = null;

	ast = parser.parse(exp);

	console.log(JSON.stringify(ast, null, 2));
}

main(process.argv);
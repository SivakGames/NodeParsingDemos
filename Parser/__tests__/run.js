const { Parser } = require("../src/demo1")
const assert = require('assert')

//List of tests
const tests = [
	require('./assignment-test'),
	require('./block-test'),
	require('./empty-test'),
	require('./for-test'),
	require('./if-test'),
	require('./literal-test'),
	require('./logical-test'),
	require('./math-test'),
	require('./relational-test'),
	require('./variable-test'),
	require('./unary-test'),
	require('./while-test'),
	require('./function-declaration-test'),
	require('./member-test'),
	require('./call-test'),
	require('./class-test'),
]


const parser = new Parser();

//For manual tests
function exec() {
	const program = `
	
	class Point {
		def constructor(x, y) {
			this.x = x;
			this.y = y;
		}

		def calc() {
			return this.x + this.y;
		}
	}

	class Point3D extends Point {
		def constructor(x, y, z) {
			super(x, y);
			this.z = z;
		}

		def calc() {
			return super() + this.z;
		}
	}

	let p = new Point3D(10,20,30);

	p.calc();
`;
	
	const ast = parser.parse(program)
	
	console.log(JSON.stringify(ast,null,2));
}

//Manual test
exec();


//Test function
function test(program, expected) {
	const ast = parser.parse(program);
	assert.deepEqual(ast, expected)
}

tests.forEach(testRun => testRun(test))

console.log("\x1b[32mAll assertions passed\x1b[0m")
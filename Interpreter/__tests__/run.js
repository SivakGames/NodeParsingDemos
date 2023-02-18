const Eva = require('../Eva')

const tests = [
	require("./self-eval"),
	require("./math"),
	require("./variables"),
	require("./blocks"),
	require("./if"),
	require("./while"),
	require("./for"),
	require("./functions"),
	require("./user-functions"),
	require("./lambda-function"),
	require("./switch"),
	require("./incdec"),
	require("./class"),
	require("./module"),
]

//=================================================
//Tests

const eva = new Eva();

tests.forEach(test => test(eva))

eva.eval(['print', '"hello"', '"world"'])

console.log("\x1b[32mAll assertions passed!\x1b[0m")
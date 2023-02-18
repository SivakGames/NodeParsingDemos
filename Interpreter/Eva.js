const Environment = require('./Environment')
const Transformer = require('./Transformer')

/**
 * Eva Interpreter
 */

class Eva {

	/**
	 * Creates eva instance with global environment
	 */
	constructor(global = GlobalEnvironment) {
		this.global = global;
		this._transformer = new Transformer();
	}


	/**
	 * Evaluates an expression in the given environment
	 */

	eval(exp, env = this.global) {

		//----------------------------------------
		//Self-evaluating

		if(this._isNumber(exp)) {
			return exp;
		}
		if(this._isString(exp)) {
			return exp.slice(1,-1);
		}


		

		//----------------------------------------
		//Block: sequence of expressions
		if(exp[0] === 'begin') {
			const blockEnv = new Environment({}, env);
			return this._evalBlock(exp, blockEnv);
		}


		//----------------------------------------
		//Variable declaration

		if (exp[0] === 'var')
		{	const [_, name, value] = exp;
			return env.define(name, this.eval(value, env));
		}

		//----------------------------------------
		//Variable update

		if (exp[0] === 'set')
		{	const [_, ref, value] = exp;


			// Property assignment

			if(ref[0] === 'prop') {
				const [_tag, instance, propName] = ref;
				const instanceEnv = this.eval(instance, env);
				return instanceEnv.define(
					propName,
					this.eval(value, env),
				);
			}

			// Simple assignment

			return env.assign(ref, this.eval(value, env));
		}

		//----------------------------------------
		//Variable access

		if (this._isVariableName(exp))
		{	
			return env.lookup(exp);
		}

		//----------------------------------------
		//if expression

		if (exp[0] === 'if')
		{	
			const [_tag, condition, consequent, alternate] = exp;
			if(this.eval(condition, env)) {
				return this.eval(consequent, env);
			}
			return this.eval(alternate, env);
		}

		//----------------------------------------
		//while expression

		if (exp[0] === 'while')
		{
			const [_tag, condition, body] = exp;
			let result;
			while(this.eval(condition, env)) {
				result = this.eval(body, env);
			}
			
			return result;
		}

		//----------------------------------------
		// Function declarations

		if (exp[0] === 'def')
		{
			const varExp = this._transformer.transformDefToLambda(exp);
			return this.eval(varExp, env);
		}

		//----------------------------------------
		// Switch expression

		if (exp[0] === 'switch')
		{
			const ifExp = this._transformer.transformSwitchToIf(exp);
			return this.eval(ifExp, env);
		}

		//----------------------------------------
		// For loop

		if (exp[0] === 'for')
		{
			const whileExp = this._transformer.transformForToWhile(exp);
			return this.eval(whileExp, env);
		}

		//----------------------------------------
		// ++

		if (exp[0] === '++')
		{
			const setExp = this._transformer.transformIncToSet(exp);
			return this.eval(setExp, env);
		}

		//----------------------------------------
		// ++

		if (exp[0] === '+=')
		{
			const setExp = this._transformer.transformIncValToSet(exp);
			return this.eval(setExp, env);
		}

		//----------------------------------------
		// Lambda Function 

		if (exp[0] === 'lambda')
		{
			const [_tag, params, body] = exp;
			return {
				params, body, env,
			}
		}

		//----------------------------------------
		// Class declaration

		if (exp[0] === 'class')
		{
			const [_tag, name, parent, body] = exp;
			const parentEnv = this.eval(parent, env) || env;
			const classEnv = new Environment({}, parentEnv)

			this._evalBody(body, classEnv);
			return env.define(name, classEnv);
		}

		//----------------------------------------
		// Super expression

		if (exp[0] === 'super')
		{
			const [_tag, className] = exp;
			console.log('reached', className)
			return this.eval(className, env).parent;
		}

		if (exp[0] === 'new')
		{

			const classEnv = this.eval(exp[1], env);
			const instanceEnv = new Environment({}, classEnv)

			const args = exp
				.slice(2)
				.map(arg => this.eval(arg, env));

			this._callUserDefinedFunction(
				classEnv.lookup('constructor'),
				[instanceEnv, ...args]
			);

			return instanceEnv
		}

		//----------------------------------------
		// property access

		if (exp[0] === 'prop')
		{
			const [_tag, instance, name] = exp;
			const instanceEnv = this.eval(instance, env);

			return instanceEnv.lookup(name);
		}

		//----------------------------------------
		// Module declaration

		if (exp[0] === 'module')
		{
			const [_tag, name, body] = exp;
			const moduleEnv = new Environment({}, env)

			this._evalBody(body, moduleEnv);

			return env.define(name, moduleEnv);
		}

		//----------------------------------------
		// Function calls

		if(Array.isArray(exp)) {
			const fn = this.eval(exp[0], env);
			const args = exp
				.slice(1)
				.map(arg => this.eval(arg, env));
			
			//Native functions
			if(typeof fn === 'function') {
				return fn(...args);
			}

			//User-def functions

			return this._callUserDefinedFunction(fn, args)
			
		}


		//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
		throw `${JSON.stringify(exp)} \x1b[1;31mUnimplemented!!!\x1b[0m`
	}

	//---------------------------------------------------


	_callUserDefinedFunction(fn, args) {
		const activationRecord = {};

		fn.params.forEach((param, index) =>
		{	activationRecord[param] = args[index];
		});

		const activationEnv = new Environment(
			activationRecord, 
			fn.env
		);

		return this._evalBody(fn.body, activationEnv);
	}

	_evalBody(body, env)
	{
		if(body[0] === 'begin') {
			return this._evalBlock(body,env)
		}
		return this.eval(body, env);
	}

	//----------------------------------------
	//Evaluate block exp.
	_evalBlock(block, env) {
		let result;

		const [tag, ...expressions] = block;

		expressions.forEach(exp => {
			result = this.eval(exp, env);
		})


		return result;
	}

	_isNumber(exp)
	{
		return typeof exp === 'number';
	}

	_isString(exp)
	{
		return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
	}

	_isVariableName(exp)
	{
		return typeof exp === 'string' && /^[+\-*/%<>=0-9A-Za-z_]*$/.test(exp);
	}

}

const GlobalEnvironment = new Environment({
	null: null,
	true: true,
	false: false,
	VERSION: '0.1',

	'+'(op1, op2) {	return op1 + op2; },
	'-'(op1, op2 = null) {
		if (op2 == null) { return -op1; }
		return op1 - op2;
	},
	'*'(op1, op2) { return op1 * op2; },
	'/'(op1, op2) { return op1 / op2; },
	'%'(op1, op2) { return op1 % op2; },

	//----------------------------------------
	//Comparison operations
	'>'(op1,op2) { return op1>op2 },
	'>='(op1,op2) { return op1>=op2 },
	'<'(op1,op2) { return op1<op2 },
	'<='(op1,op2) { return op1<=op2 },
	'='(op1,op2) { return op1===op2 },

	print(...args) {
		console.log(...args);
	},



})



module.exports = Eva
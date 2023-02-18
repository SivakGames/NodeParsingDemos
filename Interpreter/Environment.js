/**
 * 
 */
class Environment {

	constructor(record = {}, parent = null) {
		this.record = record;
		this.parent = parent;
	}

	/**
	 * Creates a variable with the given name and value
	 */
	define(name, value) {
		this.record[name] = value;
		return value;
	}

	/**
	 * Update existing var
	 */
	assign(name, value)
	{
		this.resolve(name).record[name] = value;
		return value;
	}

	/**
	 * Creates a variable with the given name and value
	 */
	lookup(name) {
		return this.resolve(name).record[name];
	}


	resolve(name) {
		if(this.record.hasOwnProperty(name)) {
			return this;
		}

		if(this.parent == null) {
			throw new ReferenceError(`Variable '${name}' ain't defined!!!`)
		}

		return this.parent.resolve(name);
	}
}

module.exports = Environment
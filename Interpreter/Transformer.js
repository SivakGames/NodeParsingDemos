class Transformer {

	transformDefToLambda(defExp) {
		const [_tag, name, params, body] = defExp;

		return ['var', name, ['lambda', params, body]]
	}

	transformSwitchToIf(switchExp) {
		const [_tag, ...cases] = switchExp;

		const ifExp = ['if', null, null, null]

		let current = ifExp;

		for (let i = 0; i < cases.length - 1; i++) {
			const [currentCond, currentBlock] = cases[i];
			current[1] = currentCond;
			current[2] = currentBlock;

			const next = cases[i + 1];
			const [nextCond, nextBlock] = next;

			current[3] = nextCond === 'else'
				? nextBlock
				: ['if'];

			current = current[3];

		}

		return ifExp;
	}

	transformForToWhile(forExp) {
		const [_tag, init, cond, modifier, body] = forExp


		return ['begin', init, ['while', cond, ['begin', body, modifier]]];
		
	}

	/**
     * ++ operator
	 */
	transformIncToSet(incExp) {
		const [_tag, exp] = incExp;
		return ['set', exp, ['+', exp, 1]];
	}

	/**
     * += operator
	 */
	transformIncValToSet(incValExp) {
		const [_tag, exp, val] = incValExp;
		return ['set', exp, ['+', exp, val]];
	}

}

module.exports = Transformer;
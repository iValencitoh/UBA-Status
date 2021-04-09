const request = require('../functions/request');
const contains = require('../functions/contains');

module.exports = {
	name: 'Status',
	commands: ['status'],
	cooldown: 10,
	minArgs: 1,
	maxArgs: 2,
	execute: (msg, args, text) => {
		if (contains(text, ['campus'])) {
			if (contains(text, ['xxi', '21'])) {
				request('www.ubaxxicampusvirtual.uba.ar', msg); // UBA XXI (Campus)
				return;
			}
			if (contains(text, ['cbc', 'ccb'])) {
				request('cbccampusvirtual.uba.ar', msg); // CBC (Campus)
				return;
			}
		}

		if (contains(text, ['siu', 'guarani'])) {
			request('guarani.uba.ar', msg); // SIU Guaraní
			return;
		} else if (contains(text, ['xxi', '21'])) {
			request('ubaxxi.uba.ar', msg); // UBA XXI
			return;
		} else if (contains(text, ['cbc', 'ccb'])) {
			request('www.cbc.uba.ar', msg); // CBC
			return;
		} else if (contains(text, ['uba'])) {
			request('uba.ar', msg); // UBA
			return;
		}

		msg.react('⚠️');
	},
};

const request = require('../functions/request');
const contains = require('../functions/contains');

module.exports = {
	name: 'Status',
	commands: ['status'],
	cooldown: 10,
	minArgs: 0,
	maxArgs: 2,
	execute: (msg, args, text, client) => {
		if (!text) {
			msg.react('✅');
			msg.channel.send(
				`${msg.author}, las posibles variables/combinaciones serían, por ejemplo: \`<xxi/campus 21/xxi campus/cbc/campus cbc/guarani/siu/ccb/uba>\` entre otras.`
			);
			return;
		}

		if (contains(text, ['campus'])) {
			if (contains(text, ['xxi', '21'])) {
				request('www.ubaxxicampusvirtual.uba.ar', msg, client); // UBA XXI (Campus)
				return;
			}
			if (contains(text, ['cbc', 'ccb'])) {
				request('cbccampusvirtual.uba.ar', msg, client); // CBC (Campus)
				return;
			}
		}

		if (contains(text, ['siu', 'guarani'])) {
			request('guarani.uba.ar', msg, client); // SIU Guaraní
			return;
		}
		if (contains(text, ['xxi', '21'])) {
			request('ubaxxi.uba.ar', msg, client); // UBA XXI
			return;
		}
		if (contains(text, ['cbc', 'ccb'])) {
			request('www.cbc.uba.ar', msg, client); // CBC
			return;
		}
		if (contains(text, ['uba'])) {
			request('uba.ar', msg, client); // UBA
			return;
		}

		msg.react('⚠️');
	},
};

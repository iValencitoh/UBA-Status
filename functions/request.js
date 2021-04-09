const https = require('./https');
const embeds = require('./embeds');

module.exports = async function request(site, msg) {
	if (msg.guild) {
		msg.react('🔄');
	}
	const pending = await msg.channel.send(
		`${msg.author}, esperando respuesta del servidor...`
	);
	const reqTime = Date.now();
	const res = await https(site);
	if (msg.guild) {
		msg.reactions.cache
			.get('🔄')
			.remove()
			.catch((err) =>
				console.error(`Failed to remove reactions: ${err}`)
			);
	}

	if (!res.err) {
		msg.react('✅');
		embeds(false, site, res, msg, pending, reqTime);
	} else {
		msg.react('🔌');
		embeds(true, site, res, msg, pending, reqTime);
	}
};

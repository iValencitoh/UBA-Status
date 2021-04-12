const https = require('./https');
const embeds = require('./embeds-command');

module.exports = async function request(site, msg, client) {
	msg.react('🔄');
	const pending = await msg.channel.send(
		`${msg.author}, esperando respuesta del servidor...`
	);
	const reqTime = Date.now();
	const res = await https(site);
	msg.reactions.resolve('🔄').users.remove(client.user.id);

	if (res.err) {
		msg.react('🔌');
		embeds(true, site, res, msg, pending, reqTime);
		return;
	}

	msg.react('✅');
	embeds(false, site, res, msg, pending, reqTime);
};

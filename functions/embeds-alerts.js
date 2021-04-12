const Discord = require('discord.js');
const channel = require('../util/channel.js');
const { client } = require('../index');

module.exports = async function embeds(err, site, res, reqTime) {
	try {
		for (const guild of client.guilds.cache) {
			const guildId = guild[0];
			const channelId = channel(guildId);

			const ms = Date.now() - reqTime;
			const successfulEmbed = new Discord.MessageEmbed()
				.setColor('#00aa0e')
				.setTitle(`UBA Status`)
				.setDescription(
					`La página web **${site}** se encuentra en línea nuevamente.`
				)
				.addFields(
					{
						name: 'Tiempo de respuesta:',
						value: `*${ms}ms*`,
						inline: true,
					},
					{
						name: 'Código de estado:',
						value: `*${res.res ? res.res.statusCode : null}*`,
						inline: true,
					}
				);

			const errorEmbed = new Discord.MessageEmbed()
				.setColor('#bc0000')
				.setTitle(`UBA Status`)
				.setDescription(
					`La página web **${site}** se encuentra fuera de línea en este momento.`
				)
				.addFields(
					{
						name: 'Tiempo esperado:',
						value: `*${ms}ms*`,
						inline: true,
					},
					{
						name: 'Mensaje de error:',
						value: `*${res.err ? res.err.code : null}*`,
						inline: true,
					}
				);

			let channelSend = client.channels.cache.get(channelId);
			if (channelSend) {
				if (err) {
					channelSend.send(errorEmbed);
					return;
				}

				channelSend.send(successfulEmbed);
			}
		}
	} catch {
		console.log(
			'* An unknown error occurred while sending the status message.'
		);
	}
};

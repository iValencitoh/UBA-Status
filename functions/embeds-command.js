const Discord = require('discord.js');

module.exports = async function embeds(err, site, res, msg, pending, reqTime) {
	const ms = Date.now() - reqTime;
	const successfulEmbed = new Discord.MessageEmbed()
		.setColor('#00aa0e')
		.setTitle(`UBA Status`)
		.setAuthor(
			msg.author.username,
			msg.author.displayAvatarURL({ size: 1024, dynamic: true })
		)
		.setDescription('La página web se encuentra en línea.')
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
		)
		.setFooter(site);

	const errorEmbed = new Discord.MessageEmbed()
		.setColor('#bc0000')
		.setTitle(`UBA Status`)
		.setAuthor(
			msg.author.username,
			msg.author.displayAvatarURL({ size: 1024, dynamic: true })
		)
		.setDescription('La página web se encuentra fuera de línea.')
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
		)
		.setFooter(site);

	if (!err) {
		pending.edit(msg.author, successfulEmbed);
		return;
	}

	pending.edit(msg.author, errorEmbed);
};

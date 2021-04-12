const Discord = require('discord.js');

module.exports = {
	name: 'Help',
	commands: ['help', 'ayuda', 'info'],
	cooldown: 1,
	execute: (msg, args, text) => {
		msg.react('✅');

		const randomColor = () => {
			let n = (Math.random() * 0xfffff * 1000000).toString(16);
			return '#' + n.slice(0, 6);
		};

		const helpEmbed = new Discord.MessageEmbed()
			.setColor(randomColor())
			.setTitle('Sección de información')
			.setAuthor(
				msg.author.username,
				msg.author.displayAvatarURL({ size: 1024, dynamic: true })
			)
			.setDescription(
				'Acá podes visualizar todos los comandos de bot disponibles.'
			)
			.addFields(
				{
					name: 'Ver el estado de un sitio de la UBA',
					value:
						'-status `(Introducí el comando sin ninguna variable para más información)`',
					inline: false,
				},
				{
					name: 'Asignar un canal para los anuncios',
					value: '-channel <#canal>',
					inline: false,
				},
				{
					name: 'Mostrar información sobre la lista de comandos',
					value: '-ayuda',
					inline: false,
				}
			);

		msg.channel.send(helpEmbed);
	},
};

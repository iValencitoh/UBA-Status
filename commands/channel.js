const mongo = require('../util/mongo');
const channelSchema = require('../util/schema/channel-schema');
const { setChannel } = require('../util/channel');

module.exports = {
	name: 'Select Channel',
	commands: ['channel'],
	perms: 'ADMINISTRATOR',
	serverOnly: true,
	cooldown: 10,
	minArgs: 1,
	maxArgs: 1,
	execute: async (msg, args, text) => {
		guildLangId = msg.guild ? msg.guild.id : undefined;

		const channelId = args[0].replace(/<|#|>/g, ``);

		setChannel(msg.guild, channelId);

		await mongo().then(async (mongoose) => {
			try {
				await channelSchema.findOneAndUpdate(
					{
						_id: msg.guild.id,
					},
					{
						_id: msg.guild.id,
						channel: channelId,
					},
					{
						upsert: true,
					}
				);

				msg.react('✅');
				msg.channel.send(
					`${msg.author}, canal de anuncios asignado exitosamente.`
				);
			} finally {
				mongoose.connection.close();
			}
		});
	},
};

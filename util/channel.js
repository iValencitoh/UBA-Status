const mongo = require('./mongo');
const channelSchema = require('./schema/channel-schema');

const guildChannels = {};

const loadChannels = async (client) => {
	await mongo().then(async (mongoose) => {
		try {
			for (const guild of client.guilds.cache) {
				const guildId = guild[0];

				const result = await channelSchema.findOne({
					_id: guildId,
				});

				guildChannels[guildId] = result ? result.channel : undefined;
			}
		} finally {
			//mongoose.connection.close();
			console.log('* Channels loaded successfully.');
		}
	});
};

const setChannel = (guild, channel) => {
	guildChannels[guild.id] = channel;
};

module.exports = (guildId) => {
	if (guildId === null || !guildChannels[guildId]) {
		const channedId = null;
		return channedId;
	} else {
		const channedId = guildChannels[guildId];
		return channedId;
	}
};

module.exports.loadChannels = loadChannels;
module.exports.setChannel = setChannel;

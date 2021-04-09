module.exports = {
	name: 'Ping',
	commands: ['ping'],
	cooldown: 1,
	execute: (msg, args, text) => {
		msg.react('✅');
		msg.reply('Pong!');
	},
};

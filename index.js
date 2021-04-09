require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const Constants = require('./node_modules/discord.js/src/util/Constants.js');
const loadCommands = require('./commands/handler/loader.js');
const {
	status,
	statusAction,
	statusMessage,
	mobile,
} = require('./config/settings.json');
console.clear();

// (In config) statusAction: 1 (Playing), 2 (Listening to), 3 (Watching).

if (mobile) {
	Constants.DefaultOptions.ws.properties.$browser = 'Discord Android';
}

client.on('ready', () => {
	const commandsLength = fs.readdirSync(`${__dirname}/commands/`).length;
	client.setMaxListeners(commandsLength);
	console.log(`* Logged in as ${client.user.tag}`);
	if (status) {
		client.user.setActivity(statusMessage, {
			type: statusAction,
		});
	}

	loadCommands(client);
});

client.login(process.env.TOKEN);

module.exports.client = client;

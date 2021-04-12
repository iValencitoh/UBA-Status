const { prefix } = require('../../config/settings.json');

const validPerms = [
	'CREATE_INSTANT_INVITE',
	'KICK_MEMBERS',
	'BAN_MEMBERS',
	'ADMINISTRATOR',
	'MANAGE_CHANNELS',
	'MANAGE_GUILD',
	'ADD_REACTIONS',
	'VIEW_AUDIT_LOG',
	'PRIORITY_SPEAKER',
	'STREAM',
	'VIEW_CHANNEL',
	'SEND_MESSAGES',
	'SEND_TTS_MESSAGES',
	'MANAGE_MESSAGES',
	'EMBED_LINKS',
	'ATTACH_FILES',
	'READ_MESSAGE_HISTORY',
	'MENTION_EVERYONE',
	'USE_EXTERNAL_EMOJIS',
	'VIEW_GUILD_INSIGHTS',
	'CONNECT',
	'SPEAK',
	'MUTE_MEMBERS',
	'DEAFEN_MEMBERS',
	'MOVE_MEMBERS',
	'USE_VAD',
	'CHANGE_NICKNAME',
	'MANAGE_NICKNAMES',
	'MANAGE_ROLES',
	'MANAGE_WEBHOOKS',
	'MANAGE_EMOJIS',
];

function validatePerms(perms) {
	for (const perm of perms) {
		if (!validPerms.includes(perm)) {
			console.log(`\n* Unknown permission: "${perm}".\n`);
			process.exit();
		}
	}
}

let recentlyRan = [];

module.exports = (client, commandOptions) => {
	let {
		name,
		commands,
		perms = [],
		serverOnly = false,
		cooldown = -1,
		minArgs = 0,
		maxArgs = null,
		execute,
	} = commandOptions;

	// If the command and aliases are strings, change them to an array
	if (typeof commands === 'string') {
		commands = [commands];
	}

	// Same as above but with the perms
	if (perms.length) {
		if (typeof perms === 'string') {
			perms = [perms];
		}

		validatePerms(perms);
	}

	// Print information about the cmd
	console.log(`* Registering command ${name}`);

	// Listen for messages
	client.on('message', (msg) => {
		const { content, author, member } = msg;

		// It's a bot?
		if (author.bot) {
			return;
		}

		for (const alias of commands) {
			const command = `${prefix}${alias.toLowerCase()}`;

			// A command has been executed?
			if (
				!content.toLowerCase().startsWith(`${command} `) &&
				content.toLowerCase() !== command
			) {
				return;
			}

			if (serverOnly && !msg.guild) {
				msg.react('⛔');
				return;
			}

			if (msg.guild) {
				// Verify that the user has the required permission(s)
				for (const perm of perms) {
					if (!member.hasPermission(perm)) {
						msg.react('⛔');
						return;
					}
				}
			}

			// Make sure the user hasn't run this command too quickly
			let cooldownString = `${author.id}-${commands[0]}`;
			if (cooldown > 0 && recentlyRan.includes(cooldownString)) {
				msg.react('⚠️');
				return;
			}

			// Split on any number of spaces
			const args = content.split(/[ ]+/);

			// Remove the command which is the first index
			args.shift();

			// Verify if we have the correct number of arguments
			if (
				args.length < minArgs ||
				(maxArgs !== null && args.length > maxArgs)
			) {
				msg.react('⚠️');
				return;
			}

			// Add the user to the recentlyRan array (cooldown)
			if (cooldown > 0) {
				recentlyRan.push(cooldownString);

				setTimeout(() => {
					recentlyRan = recentlyRan.filter((string) => {
						return string !== cooldownString;
					});
				}, 1000 * cooldown);
			}

			// Execute the custom command code [vars: msg, args, text, client]
			execute(msg, args, args.join(' '), client);
			return;
		}
	});
};

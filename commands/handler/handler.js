const { prefix } = require('../../config/settings.json');

let recentlyRan = [];

module.exports = (client, commandOptions) => {
	let {
		name,
		commands,
		cooldown = -1,
		minArgs = 0,
		maxArgs = null,
		execute,
	} = commandOptions;

	// If the command and aliases are strings, change them to an array
	if (typeof commands === 'string') {
		commands = [commands];
	}

	// Print information about the registered cmd
	console.log(`* Registering command ${name}`);

	// Listen for messages
	client.on('message', (msg) => {
		const { content, author } = msg;

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

const path = require('path');
const fs = require('fs');
const commandHandler = require(`./handler.js`);
module.exports = (client) => {
	const loadCommands = (dir) => {
		// Read the files in the commands folder
		const files = fs.readdirSync(path.join(__dirname, dir));
		// For every single file found (folders included)
		for (const file of files) {
			const stat = fs.lstatSync(path.join(__dirname, dir, file)); // Getting files information
			// It's a folder?
			if (stat.isDirectory()) {
				// Go back and read the contents of the folder.
				loadCommands(path.join(dir, file));
			} else if (file !== 'handler.js' && file !== 'loader.js') {
				// If it's not a folder and/or the cmd handler/loader, we can try to read them
				const option = require(path.join(__dirname, dir, file));
				if (client) {
					commandHandler(client, option); // Load the command.
				}
			}
		}
	};

	loadCommands('../../commands/');
	return;
};

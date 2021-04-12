const path = require('path');
const fs = require('fs');
module.exports = () => {
	const loadTasks = (dir) => {
		// Read the files in the tasks folder
		const files = fs.readdirSync(path.join(__dirname, dir));
		// For every single file found (folders included)
		for (const file of files) {
			const stat = fs.lstatSync(path.join(__dirname, dir, file)); // Getting files information
			// It's a folder?
			if (stat.isDirectory()) {
				// Go back and read the contents of the folder.
				loadTasks(path.join(dir, file));
			} else if (file !== 'loader.js') {
				// If it's not a folder and/or the tasks loader, we can try to read them
				require(path.join(__dirname, dir, file));
			}
		}
	};

	loadTasks('./');
	return;
};

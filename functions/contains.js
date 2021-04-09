module.exports = function contains(string, array) {
	for (let i = 0; i < array.length; i++) {
		const str = array[i];
		if (string.includes(str)) {
			return true;
		}
	}
	return false;
};

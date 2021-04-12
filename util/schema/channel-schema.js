const mongoose = require('mongoose');

const reqString = {
	type: String,
	require: true,
};

const channelSchema = mongoose.Schema({
	_id: reqString,
	channel: reqString,
});

module.exports = mongoose.model('channels', channelSchema);

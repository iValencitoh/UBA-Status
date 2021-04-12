require('dotenv').config();
const mongoose = require('mongoose');

module.exports = async () => {
	mongoose.set('useFindAndModify', false);
	await mongoose.connect(process.env.MONGO, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	return mongoose;
};

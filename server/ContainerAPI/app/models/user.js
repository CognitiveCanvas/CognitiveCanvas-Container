var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	_id: String,
	email: String,
	firstName: String,
	lastName: String,
	isLoggedIn: Boolean,
	webstrateClientId: String,
	maps: [String]
});

var UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
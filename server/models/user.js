var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	id: String,
	token: String,
	email: String
});

var UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	id: String,
	token: String,
	email: String
});

var UserModel = mongoose.model('User', userSchema);

var newUser = new UserModel({firstName: 'Steve', lastName: 'Do', id: '12344'});

module.exports = UserModel;
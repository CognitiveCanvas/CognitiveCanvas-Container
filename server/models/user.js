var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	id: String
});

var UserModel = mongoose.model('User', userSchema);

var newUser = new UserModel({firstName: 'Steve', lastName: 'Do', id: '12344'});

UserModel.find({'firstName': 'Steve'}, "lastName", function(err, user) {
	if (err) return handleError(err);
	console.log(user);
})
module.exports = UserModel
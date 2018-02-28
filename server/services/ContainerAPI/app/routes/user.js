const models = require('@ContainerManager/app/setup');

module.exports = (app) => {
  var UserModel = require('../models/user');
  app.route('/register')
     .post((req, res) => {
        // register new google user
        var user = req.body;
        var newUser = new UserModel({
            firstName: user.firstName,
            lastName: user.lastName,
            token: user.token,
            email: user.email
        });
        UserModel.findOne({'email' : newUser.email}, function(err, foundUser) {
            if (err) return handleError(err);
            // Save user if not found
            if (foundUser === null) {
                newUser.save(function (err) {
                    if (err) return handleError(err);
                    // saved!
                });
            }
        });
    });
}
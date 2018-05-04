const models = require('@ContainerManager/app/setup');

module.exports = (app) => {
    var UserModel = require('../models/user');
    app.post('/register', function(req, res) {
        // register new google user
        var user = req.body;
        var newUser = new UserModel(user);
        UserModel.findOne({'email' : newUser.email}, function(err, foundUser) {
            if (err) return handleError(err);
            // Update user if found
            if (foundUser) {
                newUser.save(function (err) {
                    if (err) return handleError(err);
                    // saved
                })
                res.send(true); // user found and update
            } else {
                res.send(false); // user not found
            }
        });
    })
}
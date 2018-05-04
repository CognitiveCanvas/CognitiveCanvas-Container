const mongoose = require('mongoose');
const models = require('@ContainerManager/app/setup');

const api = {}

api.syncUser = (req, res) => {
    console.log("email", req.body.email)
    let email = req.body.email;

    models.User.findOne({'email' : email}, 'firstName, lastName, maps', function(err, user) {
        if (err) return handleError(err);
        
        let response;

        if (user) {
            response = {
                authorized: true,
                user: user
            }
        }
        else {
            response = {
                authorized: false,
                user: null
            }
        }

        res.send(response)
    })
}

module.exports = api;
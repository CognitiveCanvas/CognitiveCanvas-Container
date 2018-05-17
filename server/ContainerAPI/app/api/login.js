const mongoose = require('mongoose');
const models = require('@ContainerManager/app/setup');

const api = {}

api.login = (req, res) => {
    let email = req.body;

    console.log("email", email)
    // Might need to update other table instead of user
    models.User.findOneAndUpdate({'email' : email}, {
        "isLoggedIn": true
    })

    res.send("success")
}

module.exports = api;
const mongoose = require('mongoose');
const models = require('@ContainerManager/app/setup');

const api = {}

api.actionLog = (req, res) => {
    let log = req.body;
    // Create a new log
    models.Action.create(log, function(err, newLog) {
        if (err) {
            console.log(err);
            return handleError(err);
            res.status(501).send(err);
        }
        res.send("success")
    });
}

module.exports = api;
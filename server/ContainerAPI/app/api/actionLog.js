const mongoose = require('mongoose');
const models = require('@ContainerManager/app/setup');

const api = {}

api.actionLog = (req, res) => {
    let log_list = req.body;
    // Create a new action log
    if (log_list.length > 0) {
        // convert string to ObjectId
        console.log('Action logged', log_list);
        models.Action.create(log_list, function(err, newLog) {
            if (err) {
                console.log(err);
                return handleError(err);
                res.status(501).send(err);
            }
            res.send("Action Logged")
        });
    }
}

module.exports = api;
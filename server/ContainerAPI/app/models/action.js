var mongoose = require('mongoose');

var actionSchema = new mongoose.Schema({
    map_id: String,
    interaction: String,
    event_type: Number,
    timestamp: Date,
    level: String,
    // content: {
    // },
});

var ActionModel = mongoose.model('Action', actionSchema);

module.exports = ActionModel;
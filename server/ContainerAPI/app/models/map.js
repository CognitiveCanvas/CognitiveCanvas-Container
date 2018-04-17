var mongoose = require('mongoose');

var mapSchema = new mongoose.Schema({
	name: String,
	created_at: Date,
	last_edited: Date,
	permissions: [String],
	visibility: Number
});

var MapModel = mongoose.model('Map', mapSchema);

module.exports = MapModel;
var mongoose = require('mongoose');

var mapSchema = new mongoose.Schema({
	name: String,
	url: String,
	versions: [String],
	createAt: Date,
	lastEditAt: Date,
	visibility: Number
});

var MapModel = mongoose.model('Map', mapSchema);

module.exports = MapModel;
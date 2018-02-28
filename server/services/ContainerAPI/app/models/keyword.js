var mongoose = require('mongoose');

var keywordSchema = new mongoose.Schema({
  keyword: String,
  url_ids: [Number]
});

var KeywordModel = mongoose.model('Keyword', keywordSchema);
var contentMode = require('./content');

module.exports = KeywordModel;
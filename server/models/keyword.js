var mongoose = require('mongoose');

var keywordSchema = new mongoose.Schema({
  keyword: String,
  content: [String]
});

var keywordModel = mongoose.model('Keyword', keywordSchema);

module.exports = keywordModel;
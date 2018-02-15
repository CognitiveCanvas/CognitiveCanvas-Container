var mongoose = require('mongoose');

var keywordSchema = new mongoose.Schema({
  keyword: String,
  url_ids: [Number]
});

var keywordModel = mongoose.model('Keyword', keywordSchema);
var contentMode = require('./content');

keywordModel.findOne({'keyword': 'tnfa'}, 'url_ids', function(err, keyword) {
  if (err) return handleError(err);

  contentMode.find({ "content_id": { $in:
                        keyword.url_ids
                    }},
                    'title url',
                    function(err, content) {
                      console.log(content);
                    });
})

module.exports = keywordModel;
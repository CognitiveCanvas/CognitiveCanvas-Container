var keywordModel = require('../models/keyword');
var contentModel = require('../models/content');

exports.url_list = function(req, res) {
  let keyword = req.query.search;

  keywordModel.findOne({'keyword': keyword}, 'url_ids', function(err, keyword) {
    if (err || keyword === null) return handleError(err);

    contentModel.find({ "content_id": { $in:
        keyword.url_ids
        }},
        'title url type',
        function(err, content) {
          if (err) return handleError(err);
          res.send(content);
        }
    );
  });
};
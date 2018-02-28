const mongoose = require('mongoose');
const models = require('@ContainerManager/app/setup');

const api = {}

// FIXIT: Polish the API
api.queryContentsByLabel = (Keyword, Content, req, res) => {

  let keyword = req.query.label;
  // TODO: add error in response

  models.Keyword.findOne({'keyword': keyword}, 'url_ids', function(err, keyword) {
    if (err) return handleError(err);

    models.Content.find({ "content_id": { $in:
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

module.exports = api;

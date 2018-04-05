const models = require('@ContainerManager/app/setup');

module.exports = (app) => {
  const api = app.ContainerAPI.app.api.queryContent;

  app.route('/api/queryContent')
     .get((req, res) => {
      api.queryContentsByLabel(models.KeywordModel, models.ContentModel, req, res);
    });

  app.route('/api/test')
     .get((req, res) => {
      res.send("sadfasdfadf");
  });
}
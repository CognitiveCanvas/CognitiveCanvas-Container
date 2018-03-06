const models = require('@ContainerManager/app/setup');

module.exports = (app) => {
  const api = app.ContainerAPI.app.api.queryContent;

  app.route('/')
     .get((req, res) => res.send('Budget Manager API'));

  app.route('/queryContent')
     .get((req, res) => {
      api.queryContentsByLabel(models.KeywordModel, models.ContentModel, req, res);
    });
}
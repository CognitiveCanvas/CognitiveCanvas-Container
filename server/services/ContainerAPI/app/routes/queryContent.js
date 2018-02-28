const models = require('@ContainerManager/app/api/queryContent');

module.exports = (app) => {
  const api = app.ContainerAPI.app.api.queryContent;

  app.route('/')
     .get((req, res) => res.send('Budget Manager API'));

  app.route('/queryContent')
     .get((req, res) => {
      (api.queryContentsByLabel)
      res.send("successful")
    });
}
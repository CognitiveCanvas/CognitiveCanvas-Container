module.exports = (app) => {
    const api = app.ContainerAPI.app.api.map;

    app.route('/api/createMap')
       .post((req, res) => {
           api.createMap(req, res);
       });
  
    app.route('/api/updateMapTitle')
       .post ((req, res) => {
            api.updateMapTitle(req, res);
       });
}
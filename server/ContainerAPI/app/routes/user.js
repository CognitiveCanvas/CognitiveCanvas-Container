module.exports = (app) => {
    const api = app.ContainerAPI.app.api.user;

    app.route('/api/syncUser')
       .post((req, res) => {
           api.syncUser(req, res);
       });
}
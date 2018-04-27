module.exports = (app) => {
    const api = app.ContainerAPI.app.api.login;

    app.route('/api/login')
       .post((req, res) => {
           api.login(req, res);
       });
}
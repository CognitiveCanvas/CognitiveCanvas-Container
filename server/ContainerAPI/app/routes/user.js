module.exports = (app) => {
    const api = app.ContainerAPI.app.api.user;

    app.route('/api/syncUser')
       .get((req, res) => {
        console.log("route email", req.query)
           api.syncUser(req, res);
       });
}
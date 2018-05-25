module.exports = (app) => {
    const api = app.ContainerAPI.app.api.actionLog;

    app.route('/api/actionLog')
       .post((req, res) => {
           api.actionLog(req, res);
       });
}
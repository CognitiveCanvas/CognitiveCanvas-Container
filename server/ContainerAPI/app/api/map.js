const mongoose = require('mongoose');
const models = require('@ContainerManager/app/setup');

const api = {}

api.createMap = (req, res) => {
  
  // get name, url from requirement
  let mapAttrs = {};

  mapAttrs["name"] = req.body.name;
  mapAttrs["url"] = req.body.url;
  mapAttrs["versions"] = [];
  mapAttrs["createAt"] = new Date();
  mapAttrs["lastEditAt"] = new Date();
  mapAttrs["visibility"] = 1;

  console.log("map attrs", mapAttrs)
  models.Map.create(req.body, function(err, newMap) {
    if (err) {
      console.log(err);
      return handleError(err);
      res.status(501).send(err);
    }

    res.status(201).send();
  })
}

module.exports = api;
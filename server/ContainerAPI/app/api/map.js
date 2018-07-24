const mongoose = require('mongoose'); 
const models = require('@ContainerManager/app/setup');
var ObjectId = require('mongoose').Types.ObjectId;

const api = {}

api.createMap = (req, res) => {
  // email id to find user in db
  let userId = new ObjectId(req.body.userID);
  // get name, url from requirement
  let mapAttrs = {};

  mapAttrs["name"] = req.body.name;
  mapAttrs["url"] = req.body.url;
  mapAttrs["versions"] = [];
  mapAttrs["createAt"] = new Date();
  mapAttrs["lastEditAt"] = new Date();
  mapAttrs["visibility"] = 1;

  console.log("map attrs", mapAttrs);
  models.Map.create(req.body, function(err, newMap) {
    if (err) {
      console.log(err);
      return handleError(err);
      res.status(501).send(err);
    }
    // Find and update user maps
    models.User.findByIdAndUpdate(
      userId,
      {$push: {"maps": newMap._id}},
      function (err, user) {
        if (err || user == null) {
          console.log(err);
          res.status(501).send(err);
          return;
        }
        console.log(user);
        res.status(201).send();
    });
  })
}

api.updateMapTitle = (req, res) => {
  // Find and update user maps
  models.Map.findOneAndUpdate({'url' : req.body.url}, 
                              { $set : {'name' : req.body.newName}},
                            function(err, map) {
                              if (err || map == null) {
                                console.log(err);
                                res.status(501).send(err);
                                return;
                              }
                              console.log(map); // with original name
                              res.status(201).send();
  });
  
}

api.invisibleMap = (req, res) => {
  // Find and update user maps
  models.Map.findOneAndUpdate({'url' : req.body.url}, 
                              { $set : {'visibility' : 0}},
                            function(err, map) {
                              if (err || map == null) {
                                console.log(err);
                                res.status(501).send(err);
                                return;
                              }
                              console.log(map); // with original name
                              res.status(201).send();
  });
  
}

module.exports = api;
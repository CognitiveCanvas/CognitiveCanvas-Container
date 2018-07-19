const mongoose = require('mongoose');
const models = require('@ContainerManager/app/setup');

const api = {}

api.syncUser = (req, res) => {
    let email = req.query.email;

    models.User.findOne({'email' : email}, 'firstName lastName maps', function(err, user) {
        
        let response;
        
        if (user) {
            var mapIds = user.maps.map(id => new mongoose.Types.ObjectId(id))

            var mapProp; 
            models.Map.find({
                '_id': { $in: mapIds}
            }, (err, maps) => {
                // No longer put deleted map (visibility == 0) in res
                mapProp = maps.filter(map => map.visibility !== 0)
            })
            .then(function() {
                response = {
                    authorized: true,
                    user: user,
                    maps: mapProp
                }
                res.send(response)
            })
        }
        else {
            response = {
                authorized: false,
                user: null
            }

            res.send(response)
        }
    })
}

module.exports = api;
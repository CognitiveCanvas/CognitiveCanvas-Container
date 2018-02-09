var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = {};

module.exports = function(DB_ADDRESS) {

  // Return database object prematurely if it has already been initialized.
  if (Object.keys(db).length > 0 && typeof DB_ADDRESS === 'undefined')  {
    return db;
  }

  mongoose.connect(DB_ADDRESS, function(err) {
    if (err)
      throw err;

    db.user = new Schema({
      firstName: String,
      lastName: String,
      id: String
    }, { collection: 'user'});
  });

  mongoose.Promise = global.Promise;
  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
  return db;
};
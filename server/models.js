var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = {};

module.exports = function(DB_ADDRESS) {

  // Return database object prematurely if it has already been initialized.
  if (Object.keys(models).length > 0 && typeof DB_ADDRESS === 'undefined')  {
    return models;
  }

  mongoose.connect(DB_ADDRESS, function(err) {
    if (err)
      throw err;

    var userSchema = new Schema({
      firstName: String,
      lastName: String,
      id: String
    });

    var fileSchema = new Schema({
      name: String,
      date: Date,
      description: String,
      path: String
    });

    models.user = mongoose.model("User", userSchema);
    models.file = mongoose.model("File", fileSchema);
  });

  mongoose.Promise = global.Promise;
  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

  return models;
};
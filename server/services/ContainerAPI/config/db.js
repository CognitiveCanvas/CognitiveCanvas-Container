var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = (config) => {
  let DB_ADDRESS = config.database;
  var db = mongoose.connection;
  
  mongoose.Promise = Promise;
  mongoose.connect(DB_ADDRESS, {
    promiseLibrary: global.Promise
  });

  db.on('connected', function() {
    console.log("Mongoose connected to " + DB_ADDRESS);
  });

  db.on('error', function() {
    console.log("Mongoose failed to connect to " + DB_ADDRESS);
  });

  db.on('disconnected', function (err) {
    console.log("Mongoose disconnected");
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
}

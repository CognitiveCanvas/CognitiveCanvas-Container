var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DB_ADDRESS = 'mongodb://localhost:27017/CognitiveCanvas';
var models = {};

mongoose.connect(DB_ADDRESS);
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('connected', function() {
  console.log("Mongoose connected to " + DB_ADDRESS);
});

db.on('error', function() {
  console.log("Mongoose connected to " + DB_ADDRESS);
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

require('./models/user');


var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();

var index = router.get('/', function(req, res, next) {
              res.render('index', { title: 'Express' });
            });

var users = router.get('/user', function(req, res, next) {
              res.send('respond with a resource');
            });


var app = express();
var db = require('./db');

// view engine setup
app.set('views', path.join(__dirname, '../client/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/client', express.static(path.join(__dirname, '../client')));

var keyword = require('./routes/keyword');

app.use('/', index);
app.use('/users', users);
app.use('/searchKeyword', keyword);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {
  app: app
};
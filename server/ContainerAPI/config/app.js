const express       = require('express'),
      path          = require('path'),
      morgan        = require('morgan'),
      cookieParser  = require('cookie-parser'),
      bodyParser    = require('body-parser'),
      consign       = require('consign'),
      cors          = require('cors'),
      app           = express(),
      config        = require('./index.js'),
      router        = express.Router(),
      db            = require('./db.js')(config);

app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.set('view engine', 'html');

//var keyword = require('../ContainerAPI/app/routes/keyword');

//app.use('/searchKeyword', keyword);

// catch 404 and forward to error handler
/*
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
*/

consign()
      .include('ContainerAPI/app/setup')
      .then('ContainerAPI/app/api')
      .then('ContainerAPI/app/routes')
      .into(app);

module.exports = app;
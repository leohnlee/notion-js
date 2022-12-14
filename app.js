var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 정적 파일 연동!!! -------------------------------
app.use(express.static(path.join(__dirname, 'public')));
// ------------------------------------------

// 라우터 연동!!-------------------------------
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var jbRouter = require('./routes/jb');
// ------------------------------------------

// 라우터 사용!!-------------------------------
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/jb', jbRouter);
// ------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;

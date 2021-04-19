var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var utilizadoresRouter = require('./routes/utilizador');
var promotoresRouter=require('./routes/promotor');
var adminRouter=require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


let mongoose=require("mongoose");
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost/eventos",{useNewUrlParser:true})
.then(function(){console.log("Conecçao com a Base de Dados estabelecida com sucesso!!")})
.catch(function(err){console.error(err)});



app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/promotor', promotoresRouter);
app.use('/utilizador', utilizadoresRouter);

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

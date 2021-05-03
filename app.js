require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const {  ensureAuthenticated } = require('./config/auth');
const Check_Admin=require("./config/check_admin");
var app = express();
var swaggerUi=require("swagger-ui-express");
var swaggerDocument=require("./swagger.json");



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);




// Passport Config
require('./config/passport')(passport);


console.log('${MONGO_DB_NOME}');
let mongoose=require("mongoose");
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://'+process.env.HOST+'/'+process.env.NOME_BASE_DE_DADOS,{useNewUrlParser:true})
.then(Check_Admin())
.catch(function(err){console.error(err)});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// Express session
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

var indexRouter = require('./routes/index');
var utilizadoresRouter = require('./routes/utilizador');
var promotoresRouter=require('./routes/promotor');
var adminRouter=require('./routes/admin');

app.use('/', indexRouter);
app.use('/admin', ensureAuthenticated,adminRouter);
app.use('/promotor', ensureAuthenticated,promotoresRouter);
app.use('/utilizador', ensureAuthenticated,utilizadoresRouter);



app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument));
//app.use/"api/v1",indexRouter);
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

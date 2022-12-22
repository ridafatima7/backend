var createError = require('http-errors');
var mongoose=require('mongoose');
// const {user}=require("./models/user");
var express = require('express');
const authRouter=require('./routes/auth_routers')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
var cors=require('cors');
const string='mongodb+srv://ridafatima:151214%40bar@cluster0.etq7ux9.mongodb.net/disasterinformationcell';
mongoose.connect(string).then((result)=>app.listen(4000))
.catch((error)=> console.log((error)));
// const { user } = require('./models/user');
// const { default: mongoose } = require('mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth',authRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);



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

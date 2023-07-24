var createError = require('http-errors');

var mongoose=require('mongoose');
// const {user}=require("./models/user");
// const sessions=require('express-session');
const {Information}=require("./models/InformationManagement");
const InformationRouter=require('./routes/InformationManagement')
const ReliefInfoRouter=require('./routes/ReliefManagement')
const ContactRouter=require('./routes/ContactUs')
var express = require('express');
const authRouter=require('./routes/auth_routers')
const donationRouter=require('./routes/donations')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ngoRouter=require('./routes/NGOs')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

const multer = require('multer');

const string='mongodb+srv://ridafatima:151214%40bar@cluster0.etq7ux9.mongodb.net/disasterinformationcell';
mongoose.connect(string).then((result)=>app.listen(4000))
.catch((error)=> console.log((error)));
// const { user } = require('./models/user');
// const { default: mongoose } = require('mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use(cors());
app.use(logger('dev'));
app.use(express.json());

var cors=require('cors');
app.use(cors({ credentials: true, origin: true }))

app.options('*', cors());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

const session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
app.use(cookieParser('secret', {
  cookie: {
    httpOnly: false,
    path: '/',
    domain: 'localhost',
    expires: new Date(Date.now() + 900000),
    maxAge: 900000,
    secure: false
  }
}));
app.use(session({
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  secret: "secret"
}))

// define the storage for the files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/'); // Specify the destination directory
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + extension); // Specify the file name
    },
  });
  
  const upload = multer({ storage });

// const expiry_time=1000*60*60*6;
// app.use(sessions ({
//   secret:'Sargodha ',
//   saveUninitiazlized:true,
//   cookie:{maxAge:expiry_time},
//   resave:false
  
// }))

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth',authRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Information', InformationRouter);
app.use('/NGOs', ngoRouter);
app.use('/ContactUs', ContactRouter);
app.use('/donations', donationRouter)
app.use('/Relief_Information', ReliefInfoRouter);

// app.get('/register',(req, res)=>{
//    const first_user=new user({name:req.body.name,email:req.body.email,password:req.body.password});
//   first_user.save();
//   res.send(first_user);
// });
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

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
// passport = require('passport'),
var errorhandler = require('errorhandler');
var mongoose = require('mongoose');

var isProduction = process.env.NODE_ENV ? process.env.NODE_ENV : '';
var usersRouter = require('./routes/users');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (isProduction) {
   
  mongoose.connect(process.env.MONGODB_URI);
}else{
  mongoose.connect('mongodb://ryamseyryam:Asdfg123@ds247270.mlab.com:47270/pimpster')
  .then(function(){
    console.log("connection established on mlab");
  })
  // mongoose.connect('mongodb://localhost:27017/pimpster').then(function(){
  //   console.log("connection to localhost");
  // });
}


app.use('/index', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error("not found");
  err.status = 404;
  next(err);
});

// development error handllers
if(!isProduction) {
  app.use(function(req, res, next) {
    // console.log(err.stack);
    console.log("errrsjdfklsdkljl")
      res.status(err.status || 500);
      res.json({
          'errors':{
              message:err.message,
              error:{}
          }
      });
  });
}


//production errors
app.use(function(req, res, next) {
  res.status(err.status || 500);
  res.json({
      'errors':{
          message:err.message,
          error:{}
      }
  });
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
return res.json({err: err});
  // render the error page
  // return res.status.(err.status || 500);


});

module.exports = app;

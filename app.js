var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/userrouter/index');
var usersRouter = require('./routes/adminrouter/adminrout');

var app = express();


var session = require('express-session');
app.use(session({
  name : 'app.sid',
  secret: "1234567890QWERTY",
  resave: true,
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/Adminst', usersRouter);

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

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://rajondemo:NhV17jjarIbpk2v4@cluster0.s63fi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/test', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

    

	.then(data=>{
		console.log("connecting successfully");
	})
	.catch(error=> {
		console.log(error);
	})


module.exports = app;

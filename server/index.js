var mongoose = require('mongoose');
require('../models').connect(require('../config/dbUrl').url);	//connect db
var jwt = require('jsonwebtoken');

var port = process.env.PORT || 3000;
var path = require('path');
var express = require('express');
var app = express();

var passport = require('passport');

var flash = require('connect-flash');
var morgan = require('morgan');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.use(passport.initialize());
//use express session before passport session to ensure that the login session is restored in the correct order.
app.use(session({ 
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(passport.session());
require('../config/passport')(passport);
// app.use(express.cookieParser('keyboard cat'));
app.use(flash());

app.use('/', express.static(path.join(__dirname, '../')));

// app.use(function(req, res, next){
// 	var token = req.sessionStorage.token;
// 	// var token = req.headers['authorization'];
// 	if(!token) return next();
// 	token = token.replace('Bearer', '');

// 	jwt.verify(token, require('../config/jwt.js').jwtSecret, function(err, user){
// 		if(err){
// 			return res.status(401).json({
// 				success: false,
// 				message: 'Please register Sign In using a valid email address.'
// 			});
// 		} else {
// 			req.user = user;
// 			next();
// 		}
// 	});
// });

const authRouter = require('./routes/auth');
const taskRouter = require('./routes/task');
const projectRouter = require('./routes/project');
app.use('/auth', authRouter);
app.use('/tasks', taskRouter);
app.use('/projects', projectRouter);

app.get('*', function (req, res){
  res.sendFile(path.resolve(__dirname,'../index.html'))
})



var server = app.listen(port, ()=>{console.log('listening at port ' + port)});

var io = require('socket.io').listen(server);

io.on('connection', function(socket){
	socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});



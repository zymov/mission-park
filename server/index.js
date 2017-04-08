var mongoose = require('mongoose');
require('../models').connect(require('../config/dbUrl').url);	//connect db
var User = require('mongoose').model('User');
var jwt = require('jsonwebtoken');
var jwtSecret = require('../config/jwt').jwtSecret;
var chat = require('./chatroom');

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
  res.sendFile(path.resolve(__dirname,'../index.html'));
})


const server = app.listen(port, ()=>{console.log('listening at port ' + port)});

const io = require('socket.io').listen(server);

let userlist = {};

io.sockets.on('connection', function(_socket){

  const socket = _socket;

  socket.on('join room', function(obj){
    console.log('join room');
    let room = obj.room;
    chat.joinRoom(socket, room);

    let decoded = jwt.verify(obj.userToken, jwtSecret);
    User.findById(decoded.sub, function(err, user){
      if(err){
        console.log(err);
        io.sockets.to(room).emit('get user error');
      }

      if(!userlist[room]) {
        userlist[room] = {};
      }
      if(~JSON.stringify(userlist[room]).indexOf(user._id)){
        io.sockets.to(room).emit('user reconnected', { user: user, userlist: userlist[room] });
      } else {
        userlist[room][socket.id] = user;
        io.sockets.to(room).emit('add user', { user: user, userlist: userlist[room] });
      }
    });

    io.sockets.to(room).emit('message', { msg: obj.room }); // io.sockets refers to all sockets connected, so it could emit event to all clients

    
  });

  socket.on('disconnect', function(){
    console.log('disconnect');

  });

});




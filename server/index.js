var mongoose = require('mongoose');
require('../models').connect(require('../config/dbUrl').url);	//connect db
var User = require('mongoose').model('User');
var jwt = require('jsonwebtoken');
var jwtSecret = require('../config/jwt').jwtSecret;
// var chat = require('./chatroom');

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
let currentRoom = {};
io.sockets.on('connection', function(_socket){    //write a express middleware ?

  const socket = _socket;
  console.log('\x1b[33m', 'socket client id: ',socket.client.id);

  socket.on('join room', function(obj){
    console.log('\x1b[33m', 'join room, current socket id is: ', socket.id);
    let { room, userToken } = obj;

    //component rerender or update, trigger 'componentDidMount', will not join room again.
    if(currentRoom[socket.id] == room){            
      console.log('\x1b[33m', 'not join room');
      return;
    }
    currentRoom[socket.id] = room;
    let rooms = io.sockets.adapter.sids[socket.id];
    for(let room in rooms){
      socket.leave(room);
    }

    socket.join(room);

    console.log('\x1b[33m','clients in room ', room, ': ', io.sockets.adapter.rooms[room]);

    let decoded = jwt.verify(userToken, jwtSecret);
    User.findById(decoded.sub, function(err, user){     // any better way to maintain the userlist?
      if(err){
        console.log(err);
        io.sockets.to(room).emit('get user error');
      }

      if(!userlist[room]) {
        userlist[room] = {};
      }

      //if user is already in the userlist of current room, don't change userlist
      if(~JSON.stringify(userlist[room]).indexOf(user._id)){
        io.sockets.to(room).emit('user reconnect', { user: user, userlist: userlist[room] });
        return;
      } else {
        //remove user from userlist of previous room
        for(let key in userlist){
          if(key != room && ~JSON.stringify(userlist[key]).indexOf(user._id)){
            delete userlist[key][user._id];
            io.sockets.to(key).emit('user leave', {user: user, userlist: userlist[key]});
            break;
          }
        }

        userlist[room][user.id] = user;
        io.sockets.to(room).emit('add user', { user: user, userlist: userlist[room] });

      }
    });

    // io.sockets refers to all sockets connected, so it could emit event to all clients
    io.sockets.to(room).emit('message', { msg: room }); 

    socket.on('send message', function(data){
      socket.broadcast.to(room).emit('new message', {message: data.message, timestamp: data.timestamp});
    });

    
  });




  socket.on('disconnect', function(){
    console.log('\x1b[33m', 'leave room, disconnect, socket id is:', socket.id);

    

  });

});




var User = require('mongoose').model('User');
var ChatMessageHistory = require('mongoose').model('ChatMessageHistory');
var jwt = require('jsonwebtoken');
var jwtSecret = require('../../config/jwt').jwtSecret;

module.exports = function(io){
  let userlist = {};
  let currentRoom = {};
  io.sockets.on('connection', function(_socket){    //write a express middleware ?

    const socket = _socket;
    // console.log('\x1b[33m', 'socket client id: ',socket.client.id);

    socket.on('join room', function(obj){
      // console.log('\x1b[33m', 'join room, current socket id is: ', socket.id);
      let { room, userToken } = obj;

      //component rerender or update, trigger 'componentDidMount', will not join room again.
      if(currentRoom[socket.id] == room){            
        // console.log('\x1b[33m', 'not join room');
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
      let userId = decoded.sub, username = decoded.name;
      // User.findById(decoded.sub, function(err, user){     // any better way to maintain the userlist?
        // if(err){
        //   console.log(err);
        //   io.sockets.to(room).emit('get user error');
        // }

      if(!userlist[room]) {
        userlist[room] = {};
      }

        //if user is already in the userlist of current room, don't change userlist
      if(~JSON.stringify(userlist[room]).indexOf(userId)){
        io.sockets.to(room).emit('user reconnect', { user: decoded, userlist: userlist[room] });
        return;
      } else {
        //remove user from userlist of previous room
        for(let key in userlist){
          if(key != room && ~JSON.stringify(userlist[key]).indexOf(userId)){
            delete userlist[key][userId];
            io.sockets.to(key).emit('user leave', {user: decoded, userlist: userlist[key]});
            break;
          }
        }

        userlist[room][userId] = decoded;
        io.sockets.to(room).emit('add user', { user: decoded, userlist: userlist[room] });

      }
      // });



      
      socket.on('leave', function(){
        delete userlist[room][userId];
        socket.broadcast.to(room).emit('user leave', {user: decoded, userlist: userlist[room]});
      });

    });

    // io.sockets refers to all sockets connected, so it could emit event to all clients
    socket.on('send message', function(data){

      let his = new ChatMessageHistory();
      his.roomId = data.room;
      his.senderId = data.senderId;
      his.senderName = data.senderName;
      his.timestamp = data.timestamp;
      his.message = data.message;
      his.save(function(err){
        if(err){
          console.log(err);
          io.sockets.emit('save message error');
        }
        return;
      });

      socket.broadcast.to(data.room).emit('new message', {message: data.message, senderId: data.senderId, senderName: data.senderName, timestamp: data.timestamp});
    });

    socket.on('leave', function(data){
      let decoded = jwt.verify(data.token, jwtSecret);
      for(let key in userlist){
        if(~JSON.stringify(userlist[key]).indexOf(decoded.sub)){
          delete userlist[key][decoded.sub];
          io.sockets.to(key).emit('user leave', {user: decoded, userlist: userlist[key]});
          break;
        }
      }
    });


    socket.on('disconnect', function(){
      console.log('\x1b[33m', 'leave room, disconnect, socket id is:', socket.id);

      

    });

  });
};
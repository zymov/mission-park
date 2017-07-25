var User = require('mongoose').model('User');
var ChatMessageHistory = require('mongoose').model('ChatMessageHistory');
var jwt = require('jsonwebtoken');
var jwtSecret = require('../../config/jwt').jwtSecret;
var fs = require('fs');

module.exports = function(io){
  let userlist = {};
  let currentRoom = {};
  io.sockets.on('connection', function(_socket){    //write a express middleware ?

    const socket = _socket;

    socket.on('join room', function(obj){
      let { room, userToken } = obj;

      //component rerender or update, trigger 'componentDidMount', will not join room again.
      if(currentRoom[socket.id] == room){            
        return;
      }
      currentRoom[socket.id] = room;
      let rooms = io.sockets.adapter.sids[socket.id];
      for(let room in rooms){
        socket.leave(room);
      }

      socket.join(room);

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
          io.sockets.to(data.room).emit('save message error');
        }
        return;
      });
      
      io.sockets.to(data.room).emit('new message', {
        messageId: his.id,
        message: data.message,        // send `data` instead of multiple keys?
        senderId: data.senderId, 
        senderName: data.senderName, 
        timestamp: data.timestamp
      });   
    });

    socket.on('send file', function(data){
      let his = new ChatMessageHistory();
      his.file.path = data.file.path;
      his.file.name = data.file.name;
      his.file.lastModified = data.file.lastModified;
      his.roomId = data.room;
      his.senderId = data.senderId;
      his.senderName = data.senderName;
      his.timestamp = data.timestamp; 
      his.save(function(err){
        if(err){
          console.log(err);
          io.sockets.to(data.room).emit('save file error');
        }
        return;
      });
      
      io.sockets.to(data.room).emit('new message', {
        messageId: his.id,
        file: data.file,             // send `data` instead of multiple keys?
        senderId: data.senderId, 
        senderName: data.senderName, 
        timestamp: data.timestamp
      });
    });


    //taskboard socket
    socket.on('add tasklist', function(data){
      socket.broadcast.to(data.tasklist._projectid).emit('add-tasklist', {tasklist: data.tasklist});
    });
    socket.on('delete tasklist', function(data){
      socket.broadcast.to(data.room).emit('delete-tasklist', {tasklistId: data.tasklistId});
    });
    socket.on('add task', function(data){
      socket.broadcast.to(data.room).emit('add-task', {task: data.task});
    });
    socket.on('change task sum', function(data){
      socket.broadcast.to(data.room).emit('change-task-sum', {tasklist: data.tasklist});
    });
    socket.on('edit task', function(data){
      socket.broadcast.to(data.room).emit('edit-task', {task: data.task});
    });
    socket.on('toggle task', function(data){
      socket.broadcast.to(data.room).emit('toggle-task', {task: data.task});
    });
    socket.on('add accomplished task', function(data){
      socket.broadcast.to(data.room).emit('add-accomplished-task', {task: data.task});
    });
    socket.on('delete task', function(data){
      socket.broadcast.to(data.room).emit('delete-task', {taskId: data.taskId});
    })

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
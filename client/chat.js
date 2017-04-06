
var socket = io.connect();

socket.on('chatroom created', function (route) {
	var chatroom = io.connect(`http://localhost:3000/project/${route}/chatroom`);
  chatroom.on('connect', function(){
  	chatroom.emit('chatroom connected');
  })
});
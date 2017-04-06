// (function(){

	// document.ready = function(){
		var socket = io.connect();
		// var socket = io();
	  socket.on('news', function (data) {
	    console.log(1);
	    socket.emit('my other event', { my: 'data' });
	  });
	// }

// })();
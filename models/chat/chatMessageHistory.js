var mongoose = require('mongoose');

var chatMessageHistory = new mongoose.Schema({
	roomId: {type: String},
	senderId: {type: String},
	senderName: {type: String},
	message: {type: String},
	file: {
		path: String, 
		name: String, 
		lastModified: Date
	},
	timestamp: {type: Date}
});

var ChatMessageHistory = mongoose.model('ChatMessageHistory', chatMessageHistory);

module.exports = ChatMessageHistory;
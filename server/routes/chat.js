const express = require('express');
const router = new express.Router();
let ChatMessageHistory = require('mongoose').model('ChatMessageHistory');
let utils = require('../../utils');

router.get('/getmessagehistory', function(req, res){

	let room = utils.getQueryVariable(req.url, 'room');

	ChatMessageHistory
		.find({roomId: room})
		.sort({timestamp: -1})
		.limit(15)
		.exec(function(err, messages){
		if(err){
			console.log(err);
			return res.status(500).json({error: 'get chatroom message history error'});
		}
		return res.status(200).json({
			messages: messages, 
			haveMore: messages.length == 15 ? true : false
		});
	});

});

router.get('/fetcholderchathistory', function(req, res){

	let room = utils.getQueryVariable(req.url, 'room'),
			currentMsgCount = parseInt(utils.getQueryVariable(req.url, 'currentMsgCount'), 15);

	ChatMessageHistory
		.find({roomId: room})
		.sort({timestamp: -1})
		.skip(currentMsgCount)
		.limit(15)
		.exec(function(err, chatHistory){
			if(err){
				console.log(err);
				return res.status(500).json({error: 'get older chat history error'});
			}
			return res.status(200).json({
				chatHistory: chatHistory, 
				haveMore: chatHistory.length == 15 ? true : false
			});
	});

});

module.exports = router;
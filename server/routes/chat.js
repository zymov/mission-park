const express = require('express');
const router = new express.Router();
let ChatMessageHistory = require('mongoose').model('ChatMessageHistory');
let utils = require('../../utils');

router.get('/getmessagehistory', function(req, res){

	let room = utils.getQueryVariable(req.url, 'room');

	ChatMessageHistory.find({roomId: room}).sort({timestamp: 1}).exec(function(err, messages){
		if(err){
			console.log(err);
			return res.status(400).json({error: 'get chatroom message history error'});
		}
		return res.status(200).json({messages: messages});
	});

});

module.exports = router;
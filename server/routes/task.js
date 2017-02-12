const express = require('express');

const router = new express.Router();

var Task = require('mongoose').model('Task');

router.post('/addtask', function(req, res){
	if(req.body.taskName.trim()){
		var task = new Task();
		task.taskName = req.body.taskName;
		task.createTime = new Date();
		task.save(function(err){
			if(err){
				res.status(500).json({
					message: 'sorry, server is busy!'
				});
			} else {
				res.status(200).json({
					message: 'add task successfully!'
				});
			}
		})
	} else {
		res.status(400).json({
			message: 'check your task name'
		});
	}
});

module.exports = router;
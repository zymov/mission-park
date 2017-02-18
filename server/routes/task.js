const express = require('express');

const router = new express.Router();

var Task = require('mongoose').model('Task');
var Tasklist = require('mongoose').model('Tasklist');

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

router.post('/addtasklist', function(req, res){
	if(req.body.tasklistName.trim()){
		var tasklist = new Tasklist();
		tasklist.tasklistName = req.body.tasklistName;
		tasklist.createTime = new Date();
		tasklist.save(function(err){
			if(err){
				res.status(500).json({
					errors: 'sorry, server is busy.'
				});
			} else {
				res.status(200).json({
					tasklist: tasklist
				});
			}
		});
	} else {
		res.status(400).json({
			errors: 'check your tasklist name'
		})
	}
})

router.get('/fetchtasklist', function(req, res){

	Tasklist.find({}).sort({createTime: -1}).exec(function(err, tasklists){
		if(err) {
			console.log(err);
			return res.status(500).json({
				message: 'Could not receive tasklists.'
			});
		} 

		res.json({tasklists});

	});

});


module.exports = router;
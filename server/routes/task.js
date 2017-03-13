const utils = require('../../utils');
const express = require('express');
const router = new express.Router();

var Task = require('mongoose').model('Task');
var Tasklist = require('mongoose').model('Tasklist');

/* tasklist router */
router.post('/addtasklist', function(req, res){
	if(req.body.tasklistName.trim()){
		var tasklist = new Tasklist();
		tasklist.tasklistName = req.body.tasklistName;
		tasklist.createTime = new Date();
		tasklist._projectid = req.body.projectId;
		tasklist.dueDate = new Date(req.body.dueDate);
		tasklist.accomplished = false;
		tasklist.priority = req.body.priority;
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
});

router.get('/fetchtasklists', function(req, res){
	var projectId = utils.getQueryVariable(req.url, 'projectId');

	Tasklist.find({_projectid: projectId}).sort({createTime: -1}).exec(function(err, tasklists){
		if(err) {
			console.log(err);
			return res.status(500).json({
				message: 'Could not receive tasklists.'
			});
		} 
		res.json({tasklists});
	});

});

/* task router */
router.post('/addtask', function(req, res){
	if(req.body.taskName.trim()){
		var task = new Task();
		task._tasklistId = req.body.tasklistId;
		task.taskName = req.body.taskName;
		task.description = req.body.description;
		task.dueDate = req.body.dueDate;
		task.accomplished = false;
		task.priority = req.body.priority;
		task.repeat = req.body.repeat;
		task.executors = req.body.executors;
		task.createTime = new Date();
		task.save(function(err){
			if(err){
				res.status(500).json({
					message: 'sorry, server is busy!'
				});
			} else {
				res.status(200).json({task: task});
			}
		})
	} else {
		res.status(400).json({
			message: 'check your task name'
		});
	}
});

router.get('/fetchtasks', function(req, res){
	var tasklistId = utils.getQueryVariable(req.url, 'tasklistId');

	Task.find({_tasklistId: tasklistId}).sort({accomplished: 1, createTime: -1}).exec(function(err, tasks){
		if(err){
			console.log(err);
			return res.status(500).json({
				message: 'Could not receive tasks'
			});
		}
		res.json({tasks});
	})
})

router.post('/toggletask', function(req, res){

	Task.findOne({_id: req.body.task._id}).exec(function(err, task){
		if(err){
			console.log(err);
			return res.status(500).json({
				message: 'Could not handle this task.'
			});
		}
		
		if(task.repeat){
			var interval = utils.repeatFuncList[task.repeat];
			task.dueDate = task.dueDate['set' + interval](task.dueDate['get' + interval]() + (task.repeat == 3 ? 7 : 1 ) );
			task.markModified('dueDate');
		} else {
			task.accomplished = !task.accomplished;
		}

		task.save(function(err, updatedTask){
			if(err){
				console.log(err);
				return res.status(500).json({
					message: 'Could not save the change.'
				});
			} else {
				return res.status(200).json({updatedTask});
			}
		});
	});


});

module.exports = router;
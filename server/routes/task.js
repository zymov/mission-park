const utils = require('../../utils');
const express = require('express');
const router = new express.Router();

const Project = require('mongoose').model('Project');
const Task = require('mongoose').model('Task');
const Tasklist = require('mongoose').model('Tasklist');
const Tag = require('mongoose').model('Tag');

/* tasklist router */
router.post('/addtasklist', function(req, res){
		var tasklist = new Tasklist();
		tasklist.tasklistName = req.body.tasklistName;
		tasklist.createTime = utils.getLocaleDate(new Date());
		tasklist._projectid = req.body.projectId;
		tasklist.dueDate = utils.getLocaleDate(req.body.dueDate);
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


router.delete('/deletetasklist', function(req, res){
	let tasklistId = utils.getQueryVariable(req.url, 'tasklistId');

	Task.remove({_tasklistId: tasklistId}).exec(function(err){
		if(err){
			console.log(err);
			return res.status(500).json({message: 'Could not delete this tasklist.'});
		}
		Tasklist.remove({_id: tasklistId}).exec(function(err){
			if(err){
				console.log(err);
				return res.status(500).json({
					message: 'Could not delete this tasklist.'
				});
			}
			return res.status(200).json({tasklistId: tasklistId});
		});
	});

});

/* task router */
router.post('/addtask', function(req, res){
		let rb = req.body;
		task = new Task();
		task._tasklistId = rb.tasklistId || rb._tasklistId;
		task.accomplished = rb.accomplished || false;
		task.createTime = utils.getLocaleDate(new Date());
		task.taskName = rb.taskName;
		task.description = rb.description;
		task.dueDate = utils.getLocaleDate(rb.dueDate);
		task.priority = rb.priority;
		task.repeat = rb.repeat;
		task.executors = rb.executors;
		task.tags = rb.selectedTags || rb.tags;

		task.save(function(err){
			if(err){
				console.log(err);
				res.status(500).json({message: 'sorry, server is busy!'});
			} else {
				res.status(200).json({task});
			}
		});
});

router.post('/edittask', function(req, res){
	if(req.body._id){
		let rb = req.body;
		Task.findOne({_id: rb._id}).exec(function(err, task){
			if(err){
				console.log(err);
				return res.status(400).json({message: 'Could not find the task you are editing.'});
			}
			task.taskName = rb.taskName;
			task.description = rb.description;
			task.dueDate = utils.getLocaleDate(rb.dueDate);
			task.priority = rb.priority;
			task.repeat = rb.repeat;
			if(rb.repeat){
				task.accomplished = false;
			}
			task.executors = rb.executors;
			task.tags = rb.selectedTags;

			task.save(function(err){
				if(err){
					console.log(err);
					return res.status(500).json({message: 'Could not save the task, please try again.'});
				}
				return res.status(200).json({task});
			});
		});
	} else {
		return res.status(400).json({message: 'Could not handle the task.'});
	}

})

router.get('/fetchtasks', function(req, res){
	var tasklistId = utils.getQueryVariable(req.url, 'tasklistId');

	Task.find({_tasklistId: tasklistId}).sort({accomplished: 1, createTime: -1}).exec(function(err, tasks){
		if(err){
			console.log(err);
			return res.status(500).json({
				message: 'Could not receive tasks.'
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


router.delete('/deletetask', function(req, res){
	let taskId = utils.getQueryVariable(req.url, 'taskId');

	Task.remove({_id: taskId}).exec(function(err){
		if(err){
			console.log(err);
			return res.status(500).json({
				message: 'Could not delete this task.'
			});
		}
		return res.status(200).json({taskId: taskId});
	});

});


router.get('/searchinput', function(req, res){
	let value = utils.getQueryVariable(req.url, 'value');
	let model = utils.getQueryVariable(req.url, 'model');
	let attr = utils.getQueryVariable(req.url, 'attr');
	let parentId = utils.getQueryVariable(req.url, 'parentId');

	const regex = new RegExp(utils.escapeRegex(value ? value : ''), 'gi'); 
	if(model == 'project'){
		Project.find({projectName: regex}).sort({createTime: -1}).exec(function(err, projects){
			if(err){
				console.log(err);
				return res.status(500).json({message: 'Could not receive any value'});
			}
			return res.status(200).json({projects});
		});
	} else if(model == 'tasklist'){
		Tasklist.find({tasklistName: regex, _projectid: parentId}).sort({createTime: -1}).exec(function(err, tasklists){
			if(err){
				console.log(err);
				return res.status(500).json({message: 'Could not receive any value.'});
			}
			return res.status(200).json({tasklists});
		});
	} else if (model == 'task'){
		let query = {};
		let name = attr;
		query[name] = regex;
		query["_tasklistId"] = parentId;
		
		Task.find(query).sort({createTime: -1}).exec(function(err, tasks){
			if(err){
				console.log(err);
				return res.status(500).json({message: 'Could not receive any value.'});
			}
			return res.status(200).json({tasks});
		});
	} else {
		return res.status(304).json({});//is `json({})` necessary?
	}

});


module.exports = router;
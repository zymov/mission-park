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
				return res.status(500).json({errors: 'sorry, server is busy.'});
			} 
			return res.status(200).json({tasklist: tasklist});
		});
});

router.get('/fetchtasklists', function(req, res){
	let projectId = req.query.projectId;

	Tasklist.find({_projectid: projectId}).sort({createTime: -1}).exec(function(err, tasklists){
		if(err) {
			console.log(err);
			return res.status(500).json({message: 'Could not receive tasklists.'});
		} 
		return res.status(200).json({tasklists});
	});

});


router.delete('/deletetasklist', function(req, res){
	let tasklistId = req.query.tasklistId;

	Task.remove({_tasklistId: tasklistId}).exec(function(err){
		if(err){
			console.log(err);
			return res.status(500).json({message: 'Could not delete this tasklist.'});
		}
		Tasklist.remove({_id: tasklistId}).exec(function(err){
			if(err){
				console.log(err);
				return res.status(500).json({message: 'Could not delete this tasklist.'});
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
		task.tags = rb.tags;

		task.save(function(err){
			if(err){
				console.log(err);
				return res.status(500).json({message: 'sorry, server is busy!'});
			} 
			return res.status(200).json({task});
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
			task.tags = rb.tags;

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
	let tasklistId = req.query.tasklistId;

	Task.find({_tasklistId: tasklistId}).sort({accomplished: 1, createTime: -1}).exec(function(err, tasks){
		if(err){
			console.log(err);
			return res.status(500).json({
				message: 'Could not receive tasks.'
			});
		}
		return res.status(200).json({tasks});
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
			} 
			return res.status(200).json({updatedTask});
		});
	});


});


router.delete('/deletetask', function(req, res){
	let taskId = req.query.taskId;

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


router.post('/changetasksum', function(req, res){
	let add = req.body.add;
	let tasklistId = req.body.tasklistId;
	Tasklist.findOneAndUpdate({_id: tasklistId}, {$inc:{taskSum: add}}, {new: true}, function(err, tasklist){
		if(err){
			console.log(err);
			return res.status(500).json({message: 'could not save the tasklist'});
		}
		return res.status(200).json({tasklist});
	});
});

router.post('/searchinput', function(req, res){
	const rb = req.body;
	let model = rb.model;
	let parentId = rb.parentId;
	let keys = Object.keys(rb.searchObj);

	let regex = null;
	if(model == 'project' || model == 'tasklist'){
		regex = new RegExp(utils.escapeRegex(rb.searchObj[keys[0]] ? rb.searchObj[keys[0]] : ''), 'gi'); 
	}

	// const regex = new RegExp(utils.escapeRegex(value ? value : ''), 'gi'); 
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
		keys.forEach(function(item, index){
			if(rb.searchObj[item].trim() == ''){return;}
			query[item] = (item == 'priority') ? 
										rb.searchObj[item] :
										(new RegExp(utils.escapeRegex(rb.searchObj[item] ? rb.searchObj[item] : ''), 'gi'));
		});

		query["_tasklistId"] = parentId;
		
		Task.find(query).sort({accomplished: 1, createTime: -1}).exec(function(err, tasks){
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
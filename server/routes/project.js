const express = require('express');
const router = new express.Router();

var Project = require('mongoose').model('Project');
var Tasklist = require('mongoose').model('Tasklist');
var Task = require('mongoose').model('Task');
var User = require('mongoose').model('User');
var Tag = require('mongoose').model('Tag');
var jwt = require('jsonwebtoken');
var jwtSecret = require('../../config/jwt').jwtSecret;

var utils = require('../../utils');


router.post('/add', function(req, res){	
	
	var decoded = jwt.verify(req.body.token, jwtSecret);
	User.findById(decoded.sub, function(err, user){
		
		var userName = user.name;

		var project = new Project();
		project.projectName = req.body.projectName;
		project.description = req.body.description;
		project.createTime = utils.getLocaleDate(new Date());
		project.owner = userName;
		project.ownerId = decoded.sub;
		project.save(function(err){
			if(err){
				res.status(500).json({errors: 'sorry, server is busy!'});
			}
			return res.status(200).json({project});
		});
		

	});

});

router.post('/edit', function(req, res){

	var decoded = jwt.verify(req.body.token, jwtSecret);
	User.findById(decoded.sub, function(err, user){
		
		if(err){
			console.log(err);
			res.status(500).json({message: 'user not found'});
		}

		var userName = user.name;

		Project.findOne({_id:req.body.projectId}).exec(function(err, project){

			if(err){
				console.log(err);
				res.status(500).json({message: 'Could not find the project'});
			}

			project.projectName = req.body.projectName;
			project.description = req.body.description;
			project.createTime = utils.getLocaleDate(new Date());
			project.owner = userName;
			project.ownerId = decoded.sub;
			project.save(function(err){
				if(err){
					res.status(500).json({errors: 'sorry, server is busy!'});
				}
				return res.status(200).json({project});
			});

		});

	});

});

router.get('/fetch', function(req, res){

	Project.find({}).sort({createTime: -1}).exec(function(err, projects){
		if(err) {
			console.log(err);
			return res.status(500).json({errors: 'Could not receive projects.'});
		} 

		return res.status(200).json({projects});

	});

});

router.get('/getusers', function(req, res){

	let userName = req.query.userName;

	const regex = new RegExp(utils.escapeRegex(userName ? userName : ''), 'gi'); 

	// and find by req.body.projectId  ???
	User.find({name: regex}).sort({name: 1}).exec(function(err, users){
		if(err){
			console.log(err);
			return res.status(500).json({errors: 'Could not receive users.'});
		}

		return res.status(200).json({users});

	});
})


router.get('/fetchtags', function(req, res){

	Tag.find({}).exec(function(err, tags){
		if(err){
			console.log(err);
			return res.status(500).json({errors: 'Could not receive tags.'});
		}
		let tagsNameList = utils.getArrayOfSpecKey(tags, 'name');
		res.send(tagsNameList);

	});
});

router.post('/addtag', function(req, res){
	if(req.body.tagName.trim()){
		let tag = new Tag();
		tag.name = req.body.tagName;
		tag._projectId = req.body.projectId;
		tag.save(function(err){
			if(err){
				console.log(err);
				return res.status(500).json({message: 'Sorry, server is busy!'});
			}
			return res.status(200).json({name: tag.name});
		})
	} else {
		return res.status(400).json({message: 'Wrong tag name!'});
	}
});

router.get('/gettags', function(req, res){

	let tagName = req.query.tagName;

	const regex = new RegExp(utils.escapeRegex(tagName ? tagName : ''), 'gi'); 

	// and find by req.body.projectId  ???
	Tag.find({name: regex}).sort({name: 1}).exec(function(err, tags){
		if(err){
			console.log(err);
			return res.status(500).json({errors: 'Could not receive tags.'});
		}

		tagsNameList = utils.getArrayOfSpecKey(tags, 'name');
		res.send(tagsNameList);

	});
})

router.delete('/delete', function(req, res){
	let projectId = req.query.projectId;

	Tasklist.find({_projectid: projectId}).exec(function(err, tasklists){
		if(err){
			console.log(err);
			return res.status(500).json({message: "There's an error finding tasklist in project." })
		}

		let tasklistIds = utils.getArrayOfSpecKey(tasklists, '_id');

		Task.remove({_tasklistId: {$in: tasklistIds}}).exec(function(err){
			if(err){
				console.log(err);
				return res.status(500).json({message: 'Could not delete tasks in this project'});
			}

			Tasklist.remove({_projectid: projectId}).exec(function(err){
				if(err){
					console.log(err);
					return res.status(500).json({message: 'Could not delete tasklists in this project'});
				}

				Project.remove({_id: projectId}).exec(function(err){
					if(err){
						console.log(err);
						return res.status(500).json({message: 'Could not delete this project.'});
					}
					return res.status(200).json({projectId: projectId});
				});
				
			});

		});

	})


});

module.exports = router;
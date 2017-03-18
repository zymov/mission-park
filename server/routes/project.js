const express = require('express');
const router = new express.Router();

var Project = require('mongoose').model('Project');
var User = require('mongoose').model('User');
var Tag = require('mongoose').model('Tag');
var jwt = require('jsonwebtoken');
var jwtSecret = require('../../config/jwt').jwtSecret;

var utils = require('../../utils');


router.post('/addproject', function(req, res){	
	
	var decoded = jwt.verify(req.body.token, jwtSecret);
	User.findById(decoded.sub, function(err, user){
		
		var userName = user.name;

		if(req.body.projectName.trim()){
			var project = new Project();
			project.projectName = req.body.projectName;
			project.description = req.body.description;
			project.createTime = new Date();
			project.owner = userName;
			project.ownerId = decoded.sub;
			project.save(function(err){
				if(err){
					res.status(500).json({
						errors: 'sorry, server is busy!'
					});
				} else {
					res.status(200).json({project});
				}
			});
		} else {
			res.status(400).json({
				errors: 'check your project name'
			});
		}

	});

});

router.get('/fetch', function(req, res){

	Project.find({}).sort({createTime: -1}).exec(function(err, projects){
		if(err) {
			console.log(err);
			return res.status(500).json({
				errors: 'Could not receive projects.'
			});
		} 

		res.json({projects});

	});

});

router.get('/getusers', function(req, res){

	var userName = utils.getQueryVariable(req.url, 'userName');

	const regex = new RegExp(utils.escapeRegex(userName ? userName : ''), 'gi'); 

	// and find by req.body.projectId  ???
	User.find({name: regex}).sort({name: 1}).exec(function(err, users){
		if(err){
			console.log(err);
			return res.status(500).json({
				errors: 'Could not receive users.'
			});
		}

		res.json({users});

	});
})


router.get('/fetchtags', function(req, res){

	Tag.find({}).exec(function(err, tags){
		if(err){
			console.log(err);
			return res.status(500).json({
				errors: 'Could not receive tags.'
			});
		}
		let tagsNameList = utils.getArrayOfSpecKey(tags, 'name');
		// res.json({tagsNameList});
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

	var tagName = utils.getQueryVariable(req.url, 'tagName');

	const regex = new RegExp(utils.escapeRegex(tagName ? tagName : ''), 'gi'); 

	// and find by req.body.projectId  ???
	Tag.find({name: regex}).sort({name: 1}).exec(function(err, tags){
		if(err){
			console.log(err);
			return res.status(500).json({
				errors: 'Could not receive tags.'
			});
		}

		tagsNameList = utils.getArrayOfSpecKey(tags, 'name');

		// res.json({tagsNameList});
		res.send(tagsNameList);

	});
})


module.exports = router;
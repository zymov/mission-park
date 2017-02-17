const express = require('express');
const router = new express.Router();

var Project = require('mongoose').model('Project');
var User = require('mongoose').model('User');
var jwt = require('jsonwebtoken');
var jwtSecret = require('../../config/jwt').jwtSecret;


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
				message: 'Could not receive projects.'
			});
		} 

		res.json(projects);

	});

});

module.exports = router;
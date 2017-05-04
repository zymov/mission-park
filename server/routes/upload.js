const express = require('express');
const router = new express.Router();
const fs = require('fs');
const formidable = require('formidable');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gridSchema = new Schema({},{ strict: false });
const GridModel = mongoose.model("Grid", gridSchema, "fs.files" );
const conn = mongoose.connection;
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
const utils = require('../../utils');

const gfs = Grid(conn.db);

router.post('/upload', function(req, res){
	let form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		let filename = files.file.name, 
				path = files.file.path; 
		let writestream = gfs.createWriteStream({
			filename: filename,
			metadata: {
				creatorId: fields.creatorId, 
				creatorName: fields.creatorName,
				projectId: fields.projectId
			}
		});
		fs.createReadStream(path).pipe(writestream);

		writestream.on('close', function(file){
			console.log(filename + ' written to db');
			//delete file from temp folder
			fs.unlink(path, function(){
				return res.status(200).json({file: file});
			});
		});
	});

});

router.get('/fetch', function(req, res){
	let projectId = utils.getQueryVariable(req.url, 'projectId');

	GridModel.find({'metadata.projectId': projectId}).sort({updateDate: -1}).exec(function(err, files){
		if(err){
			console.log(err);
			res.status(500).json({message: 'can not fetch files'});
		}
		return res.status(200).json({files: files});
	});
});

module.exports = router;
const express = require('express');
const router = new express.Router();
const fs = require('fs');
const formidable = require('formidable');
const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const gridSchema = new Schema({filename: String},{ strict: false });
// const GridModel = mongoose.model("Grid", gridSchema, "fs.files" );
const GridModel = require('../../models/fileCenter/grid');
const conn = mongoose.connection;
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
const utils = require('../../utils');

const gfs = Grid(conn.db);

router.post('/upload', function(req, res){
	let form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		if(files.file.size == 0){
			return res.status(200).json({message: 'file size should not be zero.'});
		}

		let filename = files.file.name, 
				path = files.file.path; 
		let writestream = gfs.createWriteStream({
			filename: filename,
			metadata: {
				creatorId: fields.creatorId, 
				creatorName: fields.creatorName,
				projectId: fields.projectId,
				folder: {
					folderId: fields.folderId,
					folderName: fields.folderName
				}
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
	let folderId = utils.getQueryVariable(req.url, 'folderId');

	GridModel.find({'metadata.projectId': projectId, 'metadata.folder.folderId': folderId}).sort({uploadDate: -1}).exec(function(err, files){
		if(err){
			console.log(err);
			res.status(500).json({message: 'can not fetch files'});
		}
		return res.status(200).json({files: files});
	});
});

router.get('/download', function(req, res){
	let filename = utils.getQueryVariable(req.url, 'filename');
	let fileId = utils.getQueryVariable(req.url, 'fileId');
	let decodedFilename = decodeURIComponent(filename);
	// var mimetype = mime.lookup(files[0].filename);
	res.setHeader('Content-disposition', 'attachment; filename=' + decodedFilename);
	res.setHeader('Content-type', 'application/force-download');

	// read from mongodb
	let readStream = gfs.createReadStream({
		_id: fileId
	});
	readStream.pipe(res);
});

router.get('/delete', function(req, res){
	let fileId = utils.getQueryVariable(req.url, 'fileId');
	gfs.remove({_id: fileId}, function(err){
		if(err){
			console.log(err);
			res.status(500).json({message: 'can not delete file'});
		}
		res.status(200).json({fileId:fileId});
	});
});

router.post('/rename', function(req, res){
	let newName = req.body.newName;
	let fileId = req.body.fileId;

	GridModel.findOneAndUpdate({_id: fileId}, { $set: {filename: newName} }, {new: true}, function(err, file){
		if(err){
			console.log(err);
		}
		res.status(200).json({file: file});
	});
});

router.post('/createfolder', function(req, res){
	let grid = new GridModel();
	grid.filename = 'new folder';
	grid.length = 0;
	grid.metadata = {
		creatorId: req.body.creatorId,
		creatorName: req.body.creatorName,
		projectId: req.body.projectId,
		folder: {
			folderId: req.body.folder.folderId,
			folderName: req.body.folder.folderName
		}
	};
	
	grid.save(function(err){
		if(err){
			console.log(err);
			return res.status(500).json({message: 'could not create folder'});
		}
		return res.status(200).json({folder: grid})
	});

});

module.exports = router;
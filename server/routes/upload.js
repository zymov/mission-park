const express = require('express');
const router = new express.Router();
const fs = require('fs');
const formidable = require('formidable');
const mongoose = require('mongoose');
const conn = mongoose.connection;
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

const gfs = Grid(conn.db);

router.post('/upload', function(req, res){
	let form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		let filename = files.file.name, path = files.file.path, creatorName = fields.creatorName, creatorId = fields.creatorId;
		let writestream = gfs.createWriteStream({
			filename: filename
		});
		fs.createReadStream(path).pipe(writestream);

		writestream.on('close', function(file){
			console.log(filename + ' written to db');
			//delete file from temp folder
			fs.unlink(path, function(){
				return res.status(200).json({file: file, creatorName: creatorName, creatorId: creatorId});
			});
		});
	});

});

module.exports = router;
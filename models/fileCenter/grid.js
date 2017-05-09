const mongoose = require('mongoose');

const gridSchema = new mongoose.Schema({
	filename: {type: String},
	length: {type: Number},
	metadata: {
		creatorId: String,
		creatorName: String,
		projectId: String,
		folder: {
			directory: Array,
			folderId: String,
			folderName: String
		}
	},
	uploadDate: {type: Date, default: new Date()}
},{ strict: false });

const Grid = mongoose.model("Grid", gridSchema, "fs.files" );

module.exports = Grid;
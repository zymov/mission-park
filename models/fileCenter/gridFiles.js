const mongoose = require('mongoose');

const gridFilesSchema = new mongoose.Schema({
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

const GridFiles = mongoose.model("GridFiles", gridFilesSchema, "fs.files" );

module.exports = GridFiles;
var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
	projectName: {type: String},
	description: {type: String},
	createTime: {type: Date},
	owner: {type: String},
	ownerId: {type: String}
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;
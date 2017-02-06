var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
	taskContent: { type: String },
	createTime: {type: Date },
	owner: {type: String }
});



var Task = mongoose.model('Task',taskSchema);

module.exports = Task;
var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
	taskName: { type: String },
	createTime: { type: Date },
	owner: { type: String },
	_tasklistId: { type: String }
});

var Task = mongoose.model('Task',taskSchema);

module.exports = Task;
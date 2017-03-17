var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
	_tasklistId: { type: String },
	taskName: { type: String, required: true },
	description: { type: String },
	dueDate: { type: Date },
	accomplished: { type: Boolean },
	priority: { type: Number },
	repeat: { type: Number },
	executors: { type: Array, required: true },
	tags: { type: Array },
	createTime: { type: Date },
});

var Task = mongoose.model('Task',taskSchema);

module.exports = Task;
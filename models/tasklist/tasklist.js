var mongoose = require('mongoose');

var tasklistSchema = new mongoose.Schema({
	tasklistName: { type: String },
	createTime: { type: Date },
	_projectid: { type: String },
	priority: { type: Number },
	dueDate: { type: Date },
	_executorid: { type: String }
});

var Tasklist = mongoose.model('Tasklist', tasklistSchema);

module.exports = Tasklist;
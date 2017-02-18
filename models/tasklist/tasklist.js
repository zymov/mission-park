var mongoose = require('mongoose');

var tasklistSchema = new mongoose.Schema({
	tasklistName: { type: String },
	createTime: {type: Date }
});

var Tasklist = mongoose.model('Tasklist', tasklistSchema);

module.exports = Tasklist;
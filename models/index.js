const mongoose = require('mongoose');

module.exports.connect = (url)=>{
	mongoose.connect(url);

	const db = mongoose.connection;
	db.on('error', (err)=>{
		console.error(`connection error: ${err}`);
		process.exit(1);
	});

	const User = require('./user/user');
	const Task = require('./task/task');
	const Project = require('./project/project');
	const Tasklist = require('./tasklist/tasklist');
	const Tag = require('./tag');
	const ChatMessageHistory = require('./chat/chatMessageHistory');
	const Grid = require('./fileCenter/grid');

}
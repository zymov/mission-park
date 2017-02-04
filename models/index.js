var mongoose = require('mongoose');

module.exports.connect = (url)=>{
	mongoose.connect(url);

	var db = mongoose.connection;
	db.on('error', (err)=>{
		console.error(`connection error: ${err}`);
		process.exit(1);
	});

	var User = require('./user/user');

}
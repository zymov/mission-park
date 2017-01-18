var mongoose = require('mongoose');

module.exports.connect = ()=>{
	mongoose.connect('mongodb://localhost/mission_park');

	var db = mongoose.connection;
	db.on('error', (err)=>{
		console.error(`connection error: ${err}`);
		process.exit(1);
	});

	var User = require('./user');

}
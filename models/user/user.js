var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var saltRounds = 10;

var userSchema = new mongoose.Schema({
	email: {
		type: String,
		index: {unique: true}
	},
	password: String,
	name: String
});

//hash password
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
}

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

var User = mongoose.model('User',userSchema);

module.exports = User;
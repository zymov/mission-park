var mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
	tagName: { type: String, required: true }
});

var Tag = mongoose.model('Tag',tagSchema);

module.exports = Tag;
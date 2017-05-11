const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gridChunksSchema = new Schema({
	files_id: {type: Schema.Types.ObjectId}
},{ strict: false });

const GridChunks = mongoose.model("GridChunks", gridChunksSchema, "fs.chunks" );

module.exports = GridChunks;
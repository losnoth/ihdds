var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artworkSchema = new Schema( {
	name: { type: String, required: true, trim: true, index: { unique: true } },
	description: { type: String, required: true },
	width: { type: Number, required: true },
	height: { type: Number, required: true },
	imageUrl: { type: String, required: true, trim: true },
	price: { type: Number, required: false },
	created: { type: Date, required: true, default: Date.now }
});

var artwork = mongoose.model('artwork', artworkSchema);

module.exports = {
	Artwork: artwork
};

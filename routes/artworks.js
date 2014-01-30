var Artwork = require('../models/artwork').Artwork;

exports.index = function(req, res) {
	Artwork.find( {}, function(err, docs) {
		if (!err) {
			res.json(200, { artworks: docs });
		}
		else {
			res.json(500, { message: err });
		}
	});
};

exports.create = function(req, res) {
	var artwork_name = req.body.artwork_name;
	var description = req.body.description;
	var width = req.body.width;
	var height = req.body.height;
	var imageUrl = req.body.imageUrl;
	var price = req.body.price;

	Artwork.findOne( { name: {$regex: new RegExp(artwork_name, "i") } },
		function(err, doc) {
			if (!err && !doc) {
				var newArtwork = new Artwork();
				newArtwork.name = artwork_name;
				newArtwork.description = description;
				newArtwork.width = width;
				newArtwork.height = height;
				newArtwork.imageUrl = imageUrl;
				newArtwork.price = price;
				console.log(newArtwork);

				newArtwork.save(function(err) {
					if (!err) {
						res.json(201, { message: "created with name: " + newArtwork.name });
					}
					else {
						res.json(500, { message: "Could not create. Error: " + err });
					}
				});
			}
			else if (!err) {
				res.json(403, { message: "Already existed" });
			}
			else {
				res.json(500, { message: err });
			}
		});
};

exports.show = function(req, res) {
	var id = req.params.id;
	Artwork.findById(id, function(err, doc) {
		if (!err && doc) {
			res.json(200, doc);
		}
		else if (err) {
			res.json(500, { message: "Error loading artwork" + err });
		}
		else {
			res.json(400, { message: "Not found" });
		}
	});
};
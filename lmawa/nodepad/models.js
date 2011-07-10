var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var Document = new Schema({
	title	: String,
	body	: String,
	date	: String
});

exports.Document = function(db) {
  return db.model('Document', Document);
};
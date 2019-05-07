var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var reviewSchema = mongoose.Schema({
  restaurant: String,
  location: String,
  rating: String,
  review: String
});

var RestReviews = mongoose.model('RestReview', reviewSchema);

module.exports.db = db;
module.exports.RestReviews = RestReviews;
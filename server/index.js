'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo');
var RestReviews = require('../database-mongo').RestReviews;
var yelp = require('yelp-fusion');
var key = require('../yelp.js')
var axios = require('axios');



var app = express();

// UNCOMMENT FOR REACT
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/reviews', (req, res) => {
  RestReviews.find(
    function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.send(data)
    }
  });
});


app.get('/test', (req, res) => {
  const apiKey = key.YELP_API_KEY
  const searchRequest = {
    term: req.query.whatToEat,
    location: req.query.near,
    limit: 4
  };
  const client = yelp.client(apiKey);
  client.search(searchRequest).then(response => {
    res.send(response.jsonBody.businesses);
  }).catch(e => {
    console.log(e);
  });
});
  

app.post('/reviews', (req, res) => {
  console.log(req.body)
  var review = {
    restaurant: req.body.restaurant,
    location: req.body.location,
    rating: req.body.rating,
    review: req.body.review
  };

  RestReviews.create(review,
    function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.send(data);   
    }
  });
});

app.delete('/reviews', function (req, res) {
  var restaurant = req.body
  console.log(req.body)
  RestReviews.remove(restaurant, (err, result) => {
    if (err) {
      console.log('err')
    } else {
      console.log('success')
      res.send(result)
    }
  })
});


app.listen(3001, function() {
  console.log('listening on port 3000!');
});

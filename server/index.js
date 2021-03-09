const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/db.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '../client/dist'));

// this returns all the reviews
app.get('/', (req, res) => {
  db.getAllReviews().then((reviews) => {
    res.send(reviews)
  }).catch((error) =>{
    console.log(error)
  })
});

// this returns all of the reviews for a specific listing
app.get('/:listingID/reviews', (req, res) => {
  //console.log(req.body.id)
  // req.id needs to be passed into getAverageReviewRating
  db.getListingTotalReviewCount(req.id).then((reviews) => {
    res.status(200).send((reviews).toString());
  }).catch ((error) => {
    console.log(error)
  })
});

// this returns the number of reviews and the average review rating for a specific listing
app.get('/:listingID/averageReviewsRating', (req, res) => {
  // req.id needs to be passed into getAverageReviewRating
  db.getAverageReviewRating(6).then((results) => {
    res.send(results)
  }).catch((error) => {
    console.log(error)
  })
  // res.send('should return this JSON object {average reviews, total number of reviews}')
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

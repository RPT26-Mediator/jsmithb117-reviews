const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database/db.js');
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

// this returns all the reviews
app.get('/reviews', (req, res) => {
  db.getAllReviews().then((reviews) => {
    res.send(reviews)
  }).catch((error) =>{
    console.log(error)
  })
});

// this returns all of the reviews for a specific listing
app.get('/:listingID/reviews', (req, res) => {
  db.getListingReviews(req.params.listingID).then((reviews) => {
    res.send(reviews);
  }).catch((error) =>{
    console.log(error)
  })
});

app.get('/:listingID/totalReviewCount', (req, res) => {
  db.getListingTotalReviewCount(req.params.listingID).then((reviews) => {
    if(reviews < 1) {
      res.send('No reviews')
    } else if (reviews === 1) {
      res.send(reviews + ' review');
    } else {
      res.send(reviews + ' reviews');
    }
  }).catch((error) =>{
    console.log(error)
  })
});

// calc-ed in accordance to this quora response: https://www.quora.com/How-does-the-Airbnb-Rating-system-work
app.get('/:listingID/averageReviewsRating', (req, res) => {
  db.getAverageReviewRating(req.params.listingID).then((ratings) => {
    let ratingsValue = Object.values(ratings[0]);
    // had to remove the first element in array as that is the listingID
    ratingsValue.shift();
    let averageRating = (ratingsValue.reduce((a,b) => a + b, 0 ))/(ratingsValue.length)
    res.send({'averageRating': Math.round(averageRating * 100) / 100, 'ratings': ratings});
  })
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

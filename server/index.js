const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const db = require('../database/db.js');
const PORT = 3006;
const cors = require('cors');

const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/:listingID', express.static(__dirname + '/../client/dist'));

// Reads a specified review if one is specified, else returns all reviews
app.get('/reviews', (req, res) => {
  if (req.body._id) {
    db.getOneReview(req.body._id)
    .then(review => res.send(review))
    .catch((err) => {
      if (err) {
        console.error('Error in GET Reviews with _id: ', err);
      }
    });
  } else {
    db.getAllReviews()
    .then(reviews => res.send(reviews))
    .catch((error) =>{
      console.log(error)
      res.end();
    });
  }
});

// Returns all reviews for a specified listing
app.get('/:listingID/reviews', (req, res) => {
  db.getListingReviews(req.params.listingID)
    .then(reviews => res.send(reviews))
    .catch((error) =>{
      console.log(error)
      res.end();
    });
});

// Returns number of reviews for a specified listing
app.get('/:listingID/totalReviewCount', (req, res) => {
  db.getListingTotalReviewCount(req.params.listingID)
    .then((reviews) => {
      if(reviews < 1) { res.send('No reviews'); }
      else if (reviews === 1) { res.send(reviews + ' review'); }
      else { res.send(reviews + ' reviews'); }
    })
    .catch((error) =>{
      console.log(error)
      res.end();
    });
});

// calc-ed in accordance to this quora response: https://www.quora.com/How-does-the-Airbnb-Rating-system-work
app.get('/:listingID/averageReviewsRating', (req, res) => {
  db.getAverageReviewRating(req.params.listingID)
    .then((ratings) => {
      let ratingsValue = Object.values(ratings[0]);
      let averageRating = (ratingsValue.reduce((a,b) => a + b, 0 ))/(ratingsValue.length);
      res.send({'averageRating': Math.round(averageRating * 100) / 100, 'ratings': ratings});
    })
    .catch((error) => {
      console.log(error)
      res.end();
    });
});

// Creates a single review
app.post('/reviews', (req, res) => {
  db.insertReview(req.body)
  .then(() => {
    res.status(201).send();
  })
  .catch((err) => {
    if (err) {
      console.error('Error in POST/reviews, err: ', err);
    }
  });
});

// Updates a single review
app.put('/reviews', (req, res) => {
  db.updateReview(req.body)
  .then((document) => {
    console.log('document: ', document);
    res.status(201).send();
  })
  .catch((err) => {
    if (err) {
      console.error('Error in PUT/reviews, err: ', err);
    }
  });
});

// Deletes a single review
app.delete('/reviews', (req, res) => {
  db.deleteReview(req.body._id)
  .then(() => {
    res.status(204).send();
  })
  .catch((err) => {
    if (err) {
      console.error('Error in DELETE/:listingID/reviews');
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

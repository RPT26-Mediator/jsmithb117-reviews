/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const db = require('../database/db.js');
const {
  deleteOneReview,
  deleteOneListing,
  insertOneListing,
  insertOneReview,
  // dbcheck,
  // sqldb,
  // Review
} = require('../database/sqldb.js');

const PORT = 3006;

const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/:listingID', express.static(`${__dirname}/../client/dist`));

// creates specified review
app.post('/insertreview', (req, res) => {
  console.log('inserting a review');
  insertOneReview(req.body);
  res.send();
});

// creates specified listing
app.post('/insertlisting', (req, res) => {
  console.log('inserting a listing');
  insertOneListing(req.body);
  res.send();
});

// deletes review specified by id
app.delete('/review', (req, res) => {
  console.log('deleting a review with id: ', req.body.id);
  if (req.body.id) {
    deleteOneReview(req.body.id);
    res.send();
  } else {
    console.error('delete/review failed, no id');
    res.sendStatus(404);
  }
});

// deletes listing specified by id
app.delete('/listing', (req, res) => {
  console.log('deleting a listing with id: ', req.body.id);
  if (req.body.id) {
    deleteOneListing(req.body.id);
    res.send();
  } else {
    console.error('delete/listing failed, no id');
    res.sendStatus(404);
  }
});

// Reads a specified review if one is specified, else returns all reviews
app.get('/reviews', (req, res) => {
  if (req.body._id) {
    db.getOneReview(req.body._id)
      .then((review) => res.send(review))
      .catch((err) => {
        if (err) {
          console.error('Error in GET Reviews with _id: ', err);
        }
      });
  } else {
    db.getAllReviews()
      .then((reviews) => res.send(reviews))
      .catch((error) => {
        console.log(error);
        res.end();
      });
  }
});

// Returns all reviews for a specified listing
app.get('/:listingID/reviews', (req, res) => {
  db.getListingReviews(req.params.listingID)
    .then((reviews) => res.send(reviews))
    .catch((error) => {
      console.log(error);
      res.end();
    });
});

// Returns number of reviews for a specified listing
app.get('/:listingID/totalReviewCount', (req, res) => {
  db.getListingTotalReviewCount(req.params.listingID)
    .then((reviews) => {
      if (reviews < 1) {
        res.send('No reviews');
      } else if (reviews === 1) {
        res.send(`${reviews} review`);
      } else { res.send(`${reviews} reviews`); }
    })
    .catch((error) => {
      console.log(error);
      res.end();
    });
});

// calc-ed in accordance to this quora response: https://www.quora.com/How-does-the-Airbnb-Rating-system-work
app.get('/:listingID/averageReviewsRating', (req, res) => {
  db.getAverageReviewRating(req.params.listingID)
    .then((ratings) => {
      const ratingsValue = Object.values(ratings[0]);
      const averageRating = (ratingsValue.reduce((a, b) => a + b, 0)) / (ratingsValue.length);
      res.send({ averageRating: Math.round(averageRating * 100) / 100, ratings });
    })
    .catch((error) => {
      console.log(error);
      res.end();
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

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

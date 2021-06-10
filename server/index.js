/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const postgres = require('../database/sqldb.js');
const newRelic = require('newrelic');

const PORT = 3006;
const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../client/dist`));

const handleError = (err, res, location, status) => {
  newRelic.noticeError(err);
  console.error(`Error in ${location}: `, err);
  res.sendStatus(status);
};

// Create
// app.post('/insertreview', (req, res) => {
//   postgres.insertOneReview(req.body)
//     .then((dbResponse) => {
//       res.send(dbResponse);
//     })
//     .catch((err) => {
//       handleError(err, res, 'app.post/insertreview', 500);
//     });
// });

// Read all reviews for a given listingID
app.get('/:listingID/reviews', (req, res) => {
  fetch(`http://54.215.82.50:80/${req.params.listingID}/reviews`)
  // postgres.readAllByID(req.params.listingID)
    .then((dbResponse) => {
      res.send(dbResponse);
    })
    .catch((err) => {
      handleError(err, res, 'app.get/reviewpostgres', 500);
    });
});

// Read number of reviews for a given listingID
app.get('/:listingID/totalReviewCount', (req, res) => {
  fetch(`http://54.215.82.50:80/${req.params.listingID}/reviews`)
  // postgres.readAllByID(req.params.listingID)
    .then((dbResponse) => {
      const reviewResponse = dbResponse.length === 0 ? 'No Reviews'
        : dbResponse.length === 1 ? '1 review'
          : `${dbResponse.length} reviews`;
      res.send(reviewResponse);
    })
    .catch((err) => {
      handleError(err, 'app.get/:listingID/totalReviewCount', 500);
    });
});

// Read average rating for a given listingID
app.get('/:listingID/averageReviewsRating', (req, res) => {
  // fetch(`http://54.215.82.50:80/${req.params.listingID}/reviews`)
  postgres.getAverageReviewRating(req.params.listingID)
    .then((functionResponse) => {
      res.send(functionResponse);
    })
    .catch((err) => {
      handleError(err, res, 'app.get/:listingID/averageReviewsRating', 500);
    });
});

// // Update
// app.put('/reviewpostgres', (req, res) => {
//   postgres.update(req.body)
//     .then((dbResponse) => {
//       res.send(dbResponse);
//     })
//     .catch((err) => {
//       handleError(err, res, 'app.put/reviewpostgres', 500);
//     });
// });

// // Delete
// app.delete('/review', (req, res) => {
//   if (req.body.id) {
//     postgres.deleteOneReview(req.body.id)
//       .then((dbResponse) => {
//         res.send(JSON.stringify(dbResponse));
//       })
//       .catch((err) => {
//         handleError(err, res, 'app.delete/review', 500);
//       });
//   } else {
//     handleError(err, res, 'app.delete/review', 404);
//   }
// });

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

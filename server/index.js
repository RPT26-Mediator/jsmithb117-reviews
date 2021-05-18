/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
// For Cassandra:
// const cassandra = require('../database/cassandraDB.js');
// For Mongo:
// const mongo = require('../database/db.js');
// For Postgres:
const postgres =  require('../database/sqldb.js');

const PORT = 3006;
const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/:listingID', express.static(`${__dirname}/../client/dist`));

const handleError = (err, res, location, status) => {
  if (err) {
    console.error(`Error in ${location}: `, err);
    res.sendStatus(status);
  }
};

//// Begin Postgres
// Create
app.post('/insertreview', (req, res) => {
  postgres.insertOneReview(req.body)
  .then((dbResponse) => {
    res.send(dbResponse);
  })
  .catch((err) => {
    handleError(err, res, 'app.post/insertreview', 500);
  });
});

// Read all reviews for a given listingID
app.get('/:listingID/reviews', (req, res) => {
  postgres.readAllByID(req.params.listingID)
  .then((dbResponse) => {
    res.send(dbResponse);
  })
  .catch((err) => {
    handleError(err, res, 'app.get/reviewpostgres', 500);
  });
});

// Read number of reviews for a given listingID
app.get('/:listingID/totalReviewCount', (req, res) => {
  postgres.readAllByID(req.params.listingID)
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
  postgres.getAverageReviewRating(req.params.listingID)
  .then((functionResponse) => {
    res.send({averageRating: Math.round(functionResponse * 100) / 100});
  })
  .catch((err) => {
    handleError(err, res, 'app.get/:listingID/averageReviewsRating', 500);
  });
});

// Update
app.put('/reviewpostgres', (req, res) => {
  postgres.update(req.body)
    .then((dbResponse) => {
      res.send(dbResponse);
    })
    .catch((err) => {
      handleError(err, res, 'app.put/reviewpostgres', 500);
    });
});

// Delete
app.delete('/review', (req, res) => {
  if (req.body.id) {
    postgres.deleteOneReview(req.body.id)
    .then((dbResponse) => {
      res.send(JSON.stringify(dbResponse));
    })
    .catch((err) => {
      handleError(err, res, 'app.delete/review', 500);
    });
  } else {
    handleError(err, res, 'app.delete/review', 404);
  }
});

//// End Postgres

// //// Begin Cassandra
// // Create
// app.post('/cassandrareviews', (req, res) => {
//   db.insertOne(req.body)
//     .then((dbResponse) => {
//       res.send(dbResponse);
//     })
//     .catch((err) => {
//       handleError(err, res, 'app.post/cassandrareviews', 500);
//     });
// });

// // Read
// app.get('/cassandrareviews', (req, res) => {
//   db.findAllByListingID(req.body.listingID)
//   .then((dbResponse) => {
//     res.send(dbResponse.rows);
//   })
//   .catch((err) => {
//     handleError(err, res, 'app.det/cassandrareviews', 500);
//   });
// });

// // Update
// app.put('/cassandrareviews', (req, res) => {
//   db.updateOne(req.body.listingID, req.body.id, req.body.update)
//     .then((dbResponse) => {
//       res.send(dbResponse);
//     })
//     .catch((err) => {
//       handleError(err, res, 'app.put/cassandrareviews', 500);
//     })
// });

// // Delete
// app.delete('/cassandrareviews', (req, res) => {
//   db.deleteOneReview(req.body.listingID, req.body.id)
//   .then((dbResponse) => {
//     res.send(dbResponse);
//   })
//   .catch((err) => {
//     handleError(err, res, 'app.delete/cassandrareviews', 500);
//   });
// });
// //// End Cassandra

// //Begin Mongo
// // creates specified review
// app.post('/insertreview', (req, res) => {
//   console.log('inserting a review');
//   insertOneReview(req.body);
//   res.send();
// });

// // creates specified listing
// app.post('/insertlisting', (req, res) => {
//   console.log('inserting a listing');
//   insertOneListing(req.body);
//   res.send();
// });

// // deletes review specified by id
// app.delete('/review', (req, res) => {
//   console.log('deleting a review with id: ', req.body.id);
//   if (req.body.id) {
//     deleteOneReview(req.body.id);
//     res.send();
//   } else {
//     console.error('delete/review failed, no id');
//     res.sendStatus(404);
//   }
// });

// // deletes listing specified by id
// app.delete('/listing', (req, res) => {
//   console.log('deleting a listing with id: ', req.body.id);
//   if (req.body.id) {
//     deleteOneListing(req.body.id);
//     res.send();
//   } else {
//     console.error('delete/listing failed, no id');
//     res.sendStatus(404);
//   }
// });

// // Reads a specified review if one is specified, else returns all reviews
// app.get('/reviews', (req, res) => {
//   if (req.body._id) {
//     db.getOneReview(req.body._id)
//       .then((review) => res.send(review))
//       .catch((err) => {
//         if (err) {
//           console.error('Error in GET Reviews with _id: ', err);
//         }
//       });
//   } else {
//     db.getAllReviews()
//       .then((reviews) => res.send(reviews))
//       .catch((error) => {
//         console.log(error);
//         res.end();
//       });
//   }
// });

// // Returns all reviews for a specified listing
// app.get('/:listingID/reviews', (req, res) => {
//   db.getListingReviews(req.params.listingID)
//     .then((reviews) => res.send(reviews))
//     .catch((error) => {
//       console.log(error);
//       res.end();
//     });
// });

// // Returns number of reviews for a specified listing
// app.get('/:listingID/totalReviewCount', (req, res) => {
//   db.getListingTotalReviewCount(req.params.listingID)
//     .then((reviews) => {
//       if (reviews < 1) {
//         res.send('No reviews');
//       } else if (reviews === 1) {
//         res.send(`${reviews} review`);
//       } else { res.send(`${reviews} reviews`); }
//     })
//     .catch((error) => {
//       console.log(error);
//       res.end();
//     });
// });

// // calc-ed in accordance to this quora response: https://www.quora.com/How-does-the-Airbnb-Rating-system-work
// app.get('/:listingID/averageReviewsRating', (req, res) => {
//   db.getAverageReviewRating(req.params.listingID)
//     .then((ratings) => {
//       const ratingsValue = Object.values(ratings[0]);
//       const averageRating = (ratingsValue.reduce((a, b) => a + b, 0)) / (ratingsValue.length);
//       res.send({ averageRating: Math.round(averageRating * 100) / 100, ratings });
//     })
//     .catch((error) => {
//       console.log(error);
//       res.end();
//     });
// });

// // Updates a single review
// app.put('/reviews', (req, res) => {
//   db.updateReview(req.body)
//     .then((document) => {
//       console.log('document: ', document);
//       res.status(201).send();
//     })
//     .catch((err) => {
//       if (err) {
//         console.error('Error in PUT/reviews, err: ', err);
//       }
//     });
// });
// //// End Mongo

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

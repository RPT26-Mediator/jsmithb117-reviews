/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const postgres = require('../database/sqldb.js');
const newRelic = require('newrelic');
const fetch = require('node-fetch');
const redis = require('redis');

const client = redis.createClient();
const getRedis = client.get.bind(client);
const setRedis = client.set.bind(client);
const flushRedis = client.flushall.bind(client);

const SERVERNAME = 'Reviews3';
const PORT = 3006;
const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Redis client error handling
client.on('error', (err) => {
  console.error(err);
});

const handleError = (err, res, location, status) => {
  newRelic.noticeError(err);
  console.error(`Error in ${location}: `, err);
  res.sendStatus(status);
};

app.get('/redis', (req, res) => {
  flushRedis();
  res.send('Flushed redis cache');
});

app.get('/serverName', (req, res) => {
  res.set('X-Backend-Server', SERVERNAME);
  res.send(SERVERNAME);
});

// Read all reviews for a given listingID
app.get('/:listingID/reviews', (req, res) => {
  const { listingID } = req.params;
  getRedis(listingID, (error, reply) => {
    if (error) {
      res.set('X-Backend-Server', SERVERNAME);
      res.status(500).send(`Redis error: ${err}`);
      console.error('Redis Error: ', err);
    }
    if (reply) {
      res.set('X-Backend-Server', SERVERNAME);
      res.send(JSON.parse(reply));
    } else {
      fetch(`http://54.215.82.50:80/${req.params.listingID}/reviews`)
        .then((dbResponse) => {
          return dbResponse.json();
        })
        .then((json) => {
          res.set('X-Backend-Server', SERVERNAME);
          res.send(json);
          setRedis(listingID, JSON.stringify(json));
        })
        .catch((err) => {
          handleError(err, res, 'app.get/reviewpostgres', 500);
        });
    }
  });


//  fetch(`http://54.215.82.50:80/${req.params.listingID}/reviews`)
//    .then((dbResponse) => {
//      return dbResponse.json();
//    })
//    .then((json) => {
//      res.set('X-Backend-Server', SERVERNAME);
//      res.send(json);
//    })
//    .catch((err) => {
//      handleError(err, res, 'app.get/reviewpostgres', 500);
//    });



});

// Read number of reviews for a given listingID
app.get('/:listingID/totalReviewCount', (req, res) => {
  // console.log('fetching /listingID/totalReviewCount for listingID: ', req.params.listingID);
  fetch(`http://54.215.82.50:80/${req.params.listingID}/reviews`)
  // postgres.readAllByID(req.params.listingID)
    .then((dbResponse) => {
      return dbResponse.json();
    })
    .then((json) => {
      // console.log('totalReviewCount json: ', json);
      const reviewResponse = json.length === 0 ? 'No Reviews'
        : json.length === 1 ? '1 review'
          : `${json.length} reviews`;
      res.send(reviewResponse);
    })
    .catch((err) => {
      handleError(err, 'app.get/:listingID/totalReviewCount', 500);
    });
});

// Read average rating for a given listingID
app.get('/:listingID/averageReviewsRating', (req, res) => {
//  console.log('logging averageReviewsRating for listingID: ', req.params.listingID);
//  fetch(`http://54.215.82.50:80/${req.params.listingID}/reviews`)
  postgres.getAverageReviewRating(req.params.listingID)
    .then((dbResponse) => {
//      return dbResponse.json();
      res.send(dbResponse);
    })
//    .then((json) => {
//      res.send(json);
//    })
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
app.use('/:listingID', express.static(`${__dirname}/../client/dist`));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

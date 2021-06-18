const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const postgres = require('../database/sqldb.js');
const newRelic = require('newrelic');
const fetch = require('node-fetch');
const redis = require('redis');
const handleReviewsData = require('./handleReviews');
const { promisify } = require("util");

const client = redis.createClient();
const getRedis = client.get.bind(client);
const getRedisAsync = promisify(client.get).bind(client);
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
  // just a basic 'test' to see if redis isn't borked
  getRedis('stuff', (e, r) => { console.log(r); })
  setRedis('stuff', 'Most stuff');
  getRedis('stuff', (e, r) => { console.log(r); })
  getRedisAsync('stuff').then(function (resp) { console.log('response: ', resp) });

  flushRedis();
  res.send('Flushed redis cache');
  console.log('flushed redis');
});

//useful for debugging load balancer issues
app.get('/serverName', (req, res) => {
  res.set('X-Backend-Server', SERVERNAME);
  res.send(SERVERNAME);
});

// Read all reviews for a given listingID
app.get('/:listingID/reviews', (req, res) => {
  const listingID = req.params.listingID.toString();

  client.get(listingID, (error, reply) => {
    if (error) {
      handleError(error, res, 'client.get', 500);
    }
    if (reply) {
      res.set('X-Backend-Server', SERVERNAME.concat('-cached-listingID'));
      res.send(JSON.parse(reply));
    } else {
      client.get(listingID.concat('average'), (error, reply) => {
        if (error) {
          handleError(error, res, 'client.get', 500)
        }
        if (reply) {
          res.set('X-Backend-Server', SERVERNAME.concat('-cached-average'));
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
      })
    }
  })
});


// Read number of reviews for a given listingID
app.get('/:listingID/totalReviewCount', (req, res) => {
  const listingID = req.params.listingID.toString();
  getRedis(listingID.concat('-length'), (err, reply) => {
    if (err) {
      console.error(err);
    }
    if (reply) {
      res.set('X-Backend-Server', SERVERNAME.concat('-cached-length'));
      res.send(reply);
    } else {
      fetch(`http://54.215.82.50:80/${req.params.listingID}/reviews`)
        .then((dbResponse) => {
          return dbResponse.json();
        })
        .then((json) => {
          const length = json.length;
          res.set('X-Backend-Server', SERVERNAME);
          res.send(JSON.stringify(length));
          setRedis(listingID.concat('-length'), length);
          setRedis(listingID, JSON.stringify(json));
        })
    }
  })
});

// Read average rating for a given listingID
app.get('/:listingID/averageReviewsRating', async (req, res) => {
  const listingID = req.params.listingID.toString();
  getRedis(listingID.concat('-average'), (err, response) => {
    if (err) {
      console.error(err);
    }
    if (response) {
      res.set('X-Backend-Server', SERVERNAME.concat('-cached-average'));
      res.send(JSON.parse(response));
    } else {
      getRedis(listingID, (err, response) => {
        if (err) {
          console.error(err);
        }
        if (response) {
          const data = handleReviewsData(JSON.parse(response))
          res.set('X-Backend-Server', SERVERNAME.concat('-cached-listingID'));
          setRedis(listingID.concat('-average'), JSON.stringify(data));
          res.send(data);
        } else {
          fetch(`http://54.215.82.50:80/${req.params.listingID}/reviews`)
            .then((dbResponse) => dbResponse.json())
            .then((json) => {
              const data = handleReviewsData(json);
              res.set('X-Backend-Server', SERVERNAME);
              res.send(data);
              setRedis(listingID.concat('-average'), JSON.stringify(data));
              setRedis(listingID, JSON.stringify(json));
            })
        }
      })
    }
  })
});

app.use('/:listingID', express.static(`${__dirname}/../client/dist`));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

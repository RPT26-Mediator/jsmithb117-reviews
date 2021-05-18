const cassandra = require('cassandra-driver');

const db = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datastax-desktop',
  keyspace: 'reviews',
});

db.insertOne = (data) => {
  const query = `INSERT INTO reviews.bylistingid (listingid, id, datejoined, username, profilepic, reviewdescription, reviewrating) VALUES (${data.listingID}, ${data.id}, '${data.dateJoined}', '${data.userName}', '${data.profilePic}', '${data.reviewDescription}', {
    'cleanliness': ${data.reviewRating.cleanliness},
    'communication': ${data.reviewRating.communication},
    'checkin': ${data.reviewRating.checkIn},
    'accuracy': ${data.reviewRating.accuracy},
    'location': ${data.reviewRating.location},
    'value': ${data.reviewRating.value}
  });`
  return new Promise((resolve, reject) => {
    resolve(db.execute(query));
    reject(new Error('Error in insertOne'));
  });
};

db.deleteOneReview = (listingID, id) => {
  const query = `DELETE FROM reviews.bylistingid WHERE listingid = ${listingID} AND id = ${id};`
  return new Promise((resolve, reject) => {
    resolve(db.execute(query));
    reject(new Error('Error in deleteOne'));
  });
}

db.findAllByListingID = (listingID) => {
  const query = `SELECT * FROM reviews.bylistingid WHERE listingid = ${listingID};`;
  return new Promise((resolve, reject) => {
    resolve(db.execute(query));
    reject(new Error('Error in findAllByListingID'));
  });
};

db.updateOne = (listingID, id, queries) => {
  const query = `UPDATE reviews.bylistingid SET ${queryParser(queries)}WHERE listingid = ${listingID} AND id = ${id};`
  console.log(query);
  return new Promise((resolve, reject) => {
    resolve(db.execute(query));
    reject(new Error('Error in db.updateOne'));
  });
};

// takes in a request object, returns a query string of properties to be updated
let queryParser = (queries) => {
  let outputString = '';
  let count = 0;
  for (let query in queries) {
    console.log('query: ', query)
    if (count > 0) {
      outputString += ', ';
    }
    if (query === 'userName') {
      count++;
      outputString += `username='${queries[query]}'`;
      continue;
    }
    if (query === 'dateJoined') {
      count++;
      outputString += `datejoined='${queries[query]}'`;
      continue;
    }
    if (query === 'profilePic') {
      count++;
      outputString += `profilepic='${queries[query]}'`;
      continue;
    }
    if (query === 'reviewDescription') {
      count++;
      outputString += `reviewdescription='${queries[query]}'`;
      continue;
    }
    if (query === 'reviewRating') {
      count++;
      const rev = queries[query];
      outputString += `reviewrating = {'accuracy':${rev.accuracy},'checkin':${rev.checkIn},'cleanliness':${rev.cleanliness},'communication':${rev.communication},'location':${rev.location},'value':${rev.value}}`;
      continue;
    }
  }
  outputString += ' ';
  return outputString;
};
module.exports = db;

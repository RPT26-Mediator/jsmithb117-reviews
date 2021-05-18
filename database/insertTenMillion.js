// const { bulkCreateReviews } = require('./sqldb.js');
const generate = require('./generate.js');
// const { Sequelize } = require('sequelize');
const db = require('./cassandraDB.js');


// Each file contains an array of 10,000 primary records.
// const insertPostgres = async (start, end, increment = 1000) => {
//   const startTime = Date.now();
//   let firstID = increment;
//   for (let i = start; i <= end; i += increment) {
//     const data = generate(i, increment);
//     console.log('\ndata.length: ', data.length);
//     console.log('first.listingID: ', data[0].listing_id);
//     console.log('last.listingID: ', data[data.length - 1].listing_id);

//     try {
//     const response = await bulkCreateReviews(data);
//     } catch (err) {
//       console.error('Error from insert at bulkCreateReviews: ', err);
//     }
//     timeCheck(startTime);
//     firstID += increment;
//   }
// };

const insertCassandra = async (start, end, increment = 1000) => {
  const startTime = Date.now();
  // let firstID = increment;
  for (let i = start; i <= end; i += increment) {
    const data = generate(i, increment);
    console.log('\ndata.length: ', data.length);
    console.log('first.listingid: ', data[0].listingid);
    console.log('last.listingid: ', data[data.length - 1].listingid);

    for (let j = 0; j < data.length; j++) {
      try {
        // console.log('data[j]: ', data[j]);
        const response = await db.insertOne(data[j]);
      } catch (err) {
        console.error('Error from insertCassandra: ', err);
      }
    }
    timeCheck(startTime);
    // firstID += increment;
  }
}

const timeCheck = (startTime) => {
  const endTime = Date.now();
  let millisecondsLeft = endTime - startTime;
  const minutes = Math.floor(millisecondsLeft / 60000);
  millisecondsLeft %= 60000;
  const seconds = Math.floor(millisecondsLeft / 1000);
  console.log(`Total time so far: ${minutes} minutes, ${seconds} seconds.`);
};

// insertPostgres(1, 10000000, 10000);
insertCassandra(1, 100, 10000);
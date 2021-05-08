const { readFileSync } = require('fs');
const { insertOneListing, insertOneReview } = require('./sqldb.js');

// Each file contains an array of 1,000 primary records.
// 'insert' needs to add an 'id' property and periodically insert a listing,
// so bulkCreate would not be appropriate here.
const insert = async (start, end) => {
  for (let i = start, j = start + 1000; i < end; i += 1000, j += 1000) {
    let lastID = 0;
    const data = readFileSync(`./database/data/primaryRecords${i}_through_${j}.json`);
    const file = JSON.parse(data);
    for (let k = 0; k < file.length; k++) {
      if (lastID !== file[k].listingID) {
        insertOneListing(file[k].listingID);
        lastID = file[k].listingID;
      }
      file[k].id = k + i + 1;
      insertOneReview(file[k]);
    }
  }
};

insert(0, 10000000);

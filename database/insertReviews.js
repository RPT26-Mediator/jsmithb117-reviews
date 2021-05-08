/* eslint-disable arrow-body-style */
const { Review, ListingID } = require('./sqldb.js');

const insertOneReview = (input) => {
  return new Promise((resolve, reject) => {
    resolve(Review.create(input));
    reject(new Error('Error in insertOneReview'));
  });
};

const insertOneListing = (id) => {
  return new Promise((resolve, reject) => {
    resolve(ListingID.findOrCreate({ where: { id } }));
    reject(new Error('Error in insertOneListing'));
  });
};

module.exports = { insertOneReview, insertOneListing };

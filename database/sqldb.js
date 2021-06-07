/* eslint-disable arrow-body-style */
const { Sequelize } = require('sequelize');

const options = {
  logging: false,
  define: {
    timestamps: false,
  },
  dialect: 'postgres',
};

const postgres = new Sequelize('postgres://postgres:password@localhost:5432/reviews', options);

const Review = postgres.define('reviews', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  "userName": Sequelize.STRING,
  "dateJoined": Sequelize.STRING,
  "profilePic": Sequelize.STRING,
  "reviewDescription": Sequelize.STRING,
  "reviewRating": Sequelize.JSON,
  "listingID": Sequelize.INTEGER,
});

postgres.insertOneReview = (review) => {
  return new Promise((resolve, reject) => {
    resolve(Review.create(review));
    reject(new Error('Error in insertOneReview'));
  })
};

postgres.insertOneListing = (id) => {
  return new Promise((resolve, reject) => {
    resolve(ListingID.findOrCreate({ where: { id } }));
    reject(new Error('Error in insertOneListing'));
  });
};

postgres.bulkCreateReviews = (array) => {
  return new Promise((resolve, reject) => {
    resolve(Review.bulkCreate(array));
    reject(new Error('Error in postgres.bulkCreateReviews'));
  });
}

postgres.deleteOneReview = (id) => {
  return new Promise((resolve, reject) => {
    resolve(Review.destroy({ where: { id } }));
    reject(new Error('Error in deleteOneReview'));
  });
};

postgres.readAllByID = (listingID) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM reviews where "listingID" = ${listingID}`;
    resolve(postgres.query(query)
      .then((dbResponse) => {
        return dbResponse[0];
      })
      .catch((err) => {
        if (err) {
          console.error('Error in postgres.readAllByID: ', err);
        }
      }));
    reject(new Error('Error in postgresReadOneByID'));
  })
};

postgres.getAverageReviewRating = async (listingID) => {
  const listings = await Review.findAll({ where: { listingID } });
  let sums = {
    cleanliness: 0,
    communication: 0,
    checkIn: 0,
    accuracy: 0,
    location: 0,
    value: 0,
    total: 0,
  };
  // Adds each entry to sums to facilitate averaging
  for (let i = 0; i < listings.length; i++) {
    sums.cleanliness += listings[i].dataValues.reviewRating.cleanliness;
    sums.communication += listings[i].dataValues.reviewRating.communication;
    sums.checkIn += listings[i].dataValues.reviewRating.checkIn;
    sums.accuracy += listings[i].dataValues.reviewRating.accuracy;
    sums.location += listings[i].dataValues.reviewRating.location;
    sums.value += listings[i].dataValues.reviewRating.value;
  }
  // calculate averageRating for all reviews for this listing
  sums.total = sums.cleanliness +
    sums.communication +
    sums.checkIn +
    sums.accuracy +
    sums.location +
    sums.value;
  sums.total = sums.total / 6 / listings.length;
  // calculates averages in place
  sums.communication = sums.communication / listings.length;
  sums.checkIn = sums.checkIn / listings.length;
  sums.accuracy = sums.accuracy / listings.length;
  sums.location = sums.location / listings.length;
  sums.value = sums.value / listings.length;
  sums.cleanliness = sums.cleanliness / listings.length;
  // returns in the format front-end expects
  return new Promise((resolve, reject) => {
    resolve({
      averageRating: sums.total,
      ratings: {
          rounded_clean: sums.cleanliness,
          rounded_communication: sums.communication,
          rounded_checkIn: sums.checkIn,
          rounded_accuracy: sums.accuracy,
          rounded_location: sums.location,
          rounded_value: sums.value
        }
    });
    reject(new Error('Error in postgres.getAverageReviewRating'));
  });
};

postgres.update = (body) => {
  return new Promise((resolve, reject) => {
    const query = {
      user_name: body.userName,
      date_joined: body.dateJoined,
      profile_pic: body.profilePic,
      review_description: body.reviewDescription,
      cleanliness: body.reviewRating.cleanliness,
      communication: body.reviewRating.communication,
      checkin: body.reviewRating.checkIn,
      accuracy: body.reviewRating.accuracy,
      location: body.reviewRating.location,
      value: body.reviewRating.value
    };
    resolve(Review.update(query, { where: { id: body.id } }));
    reject(new Error('Error in postgres.update'));
  });
};

module.exports = postgres;

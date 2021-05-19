/* eslint-disable arrow-body-style */
const { Sequelize } = require('sequelize');

const options = {
  logging: false,
  define: {
    timestamps: false,
  },
  dialect: 'postgres',
};

const postgres = new Sequelize('postgres://postgres:password@localhost:5432/sdc', options);

const Review = postgres.define('reviews', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_name: Sequelize.STRING,
  date_joined: Sequelize.STRING,
  profile_pic: Sequelize.STRING,
  review_description: Sequelize.STRING,
  cleanliness: Sequelize.INTEGER,
  communication: Sequelize.INTEGER,
  checkin: Sequelize.INTEGER,
  accuracy: Sequelize.INTEGER,
  location: Sequelize.INTEGER,
  value: Sequelize.INTEGER,
  listing_id: Sequelize.INTEGER,
});

postgres.insertOneReview = (review) => {
  const reviewObject = {
    user_name: review.userName,
    date_joined: review.dateJoined,
    profile_pic: review.profilePic,
    review_description: review.reviewDescription,
    cleanliness: review.reviewRating.cleanliness,
    communication: review.reviewRating.communication,
    checkin: review.reviewRating.checkIn,
    accuracy: review.reviewRating.accuracy,
    location: review.reviewRating.location,
    value: review.reviewRating.value,
    listing_id: review.listingID,
  };
  return new Promise((resolve, reject) => {
    resolve(Review.create(reviewObject));
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

postgres.readAllByID = (listing_id) => {

  return new Promise((resolve, reject) => {
    resolve(Review.findAll({ where: { listing_id } })
      .then((dbResponse) => {
        const formattedResponse = [];
        dbResponse.forEach((review) => {
          const formattedReview = {
            id: review.id,
            listingID: review.listing_id,
            userName: review.user_name,
            dateJoined: review.date_joined,
            profilePic: review.profile_pic,
            reviewDescription: review.review_description,
            reviewRating: {
              cleanliness: review.cleanliness,
              communication: review.communication,
              checkIn: review.checkin,
              accuracy: review.accuracy,
              location: review.location,
              value: review.value,
            },
          };
          formattedResponse.push(formattedReview);
        });
        return formattedResponse;
      })
      .catch((err) => {
        if (err) {
          console.error('Error in postgres.readAllByID: ', err);
        }
      }));
    reject(new Error('Error in postgresReadOneByID'));
  })
};

postgres.getAverageReviewRating = async (listing_id) => {
  const listings = await Review.findAll({ where: { listing_id } });
  let sums = 0;
  const count = listings.length;
  for (let i = 0; i < listings.length; i++) {
    sums += listings[i].dataValues.cleanliness;
    sums += listings[i].dataValues.communication;
    sums += listings[i].dataValues.checkin;
    sums += listings[i].dataValues.accuracy;
    sums += listings[i].dataValues.location;
    sums += listings[i].dataValues.value;
  }
  const averageReviewRating = sums / 6 / count;
  return new Promise((resolve, reject) => {
    resolve(averageReviewRating);
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

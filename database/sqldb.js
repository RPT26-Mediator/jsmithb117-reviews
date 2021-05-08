/* eslint-disable arrow-body-style */
const { Sequelize } = require('sequelize');

const sqldb = new Sequelize('postgres://postgres:password@localhost:5432/sdc', {
  define: {
    timestamps: false,
  },
  underscored: true,
  dialect: 'postgres',
});

const Review = sqldb.define('reviews', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: false,
    primaryKey: true,
  },
  user_name: Sequelize.STRING,
  date_joined: Sequelize.STRING,
  profile_pic: Sequelize.STRING,
  review_description: Sequelize.STRING,
  cleanliness: Sequelize.INTEGER,
  communication: Sequelize.INTEGER,
  check_in: Sequelize.INTEGER,
  accuracy: Sequelize.INTEGER,
  location: Sequelize.INTEGER,
  value: Sequelize.INTEGER,
  listing_id: Sequelize.INTEGER,
});

const ListingID = sqldb.define('listingids', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: false,
    primaryKey: true,
  },
});

ListingID.hasMany(Review, { foreignKey: 'id' });
Review.belongsTo(ListingID, { foreignKey: 'listing_id' });

const insertOneReview = (review) => {
  const reviewObject = {
    id: review.id,
    user_name: review.userName,
    date_joined: review.dateJoined,
    profile_pic: review.profilePic,
    review_description: review.reviewDescription,
    cleanliness: review.reviewRating.cleanliness,
    communication: review.reviewRating.communication,
    check_in: review.reviewRating.checkIn,
    accuracy: review.reviewRating.accuracy,
    location: review.reviewRating.location,
    value: review.reviewRating.value,
    listing_id: review.listingID,
  };
  Review.create(reviewObject);
};

const insertOneListing = (id) => {
  ListingID.sync();
  return new Promise((resolve, reject) => {
    resolve(ListingID.findOrCreate({ where: { id } }));
    reject(new Error('Error in insertOneListing'));
  });
};

const deleteOneListing = (id) => {
  return new Promise((resolve, reject) => {
    resolve(ListingID.destroy({ where: { id } }));
    reject(new Error('Error in deleteOneListing'));
  });
};

const deleteOneReview = (id) => {
  return new Promise((resolve, reject) => {
    resolve(Review.destroy({ where: { id } }));
    reject(new Error('Error in deleteOneReview'));
  });
};

module.exports = {
  deleteOneReview,
  deleteOneListing,
  insertOneListing,
  insertOneReview,
  sqldb,
  Review,
  ListingID,
};

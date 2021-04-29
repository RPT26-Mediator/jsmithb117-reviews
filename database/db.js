const faker = require('faker');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/airbnbReviewsDB', { useNewUrlParser: true , useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', () => {
  console.log('Mongoose connected to port 27017');
});
db.on('disconnected', () => {
  console.log('Mongoose connection disconnected from port 27017');
});

const reviewSchema = new mongoose.Schema({
  userName: String,
  dateJoined: String,
  profilePic: String,
  reviewDescription: String,
  reviewRating: {
      cleanliness: Number,
      communication: Number,
      checkIn: Number,
      accuracy: Number,
      location: Number,
      value: Number
    },
  listingID: String
}, { retainKeyOrder: true });

const Reviews = mongoose.model('Reviews', reviewSchema);

const seedReviewsDB = () => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < 1000; i++){
      const newReview = new Reviews({
        userName: faker.name.firstName(),
        dateJoined: faker.date.month() + ' ' + faker.random.number({min:2010, max:2021}),
        profilePic: `https://airbnbpp.s3-us-west-1.amazonaws.com/${faker.random.number({min:0, max:199})}.jpg`,
        reviewDescription: faker.lorem.sentences(3),
        reviewRating: {
          cleanliness: faker.random.number({min:4, max:5}),
          communication: faker.random.number({min:4, max:5}),
          checkIn: faker.random.number({min:4, max:5}),
          accuracy: faker.random.number({min:4, max:5}),
          location: faker.random.number({min:4, max:5}),
          value: faker.random.number({min:4, max:5}),
        },
        listingID: faker.random.number(100)
      });
      resolve(Reviews.create(newReview));
      reject('Error with seeding the Reviews DB')
    }
  })
}

const refreshReviewDB = () => {
  return new Promise((resolve, reject) => {
    resolve(Reviews.deconsteMany({}));
    reject('Error with removing old data.')
  })
}

const getAllReviews = () => {
  return new Promise((resolve, reject) => {
    resolve(Reviews.find({}).sort({ "listingID": 1 }));
    reject('Error with getting all reviews.')
  })
}

const getListingReviews = (listingID) => {
  return new Promise((resolve, reject) => {
    resolve(Reviews.find({ listingID }));
    reject('Error with getting this listings reviews.')
  })
}

const getListingTotalReviewCount = (listingID) => {
  return new Promise((resolve, reject) => {
    resolve(Reviews.find({'listingID' : listingID }).countDocuments());
    reject('Error with getting total review count.')
  })
}

const getAverageReviewRating = (listingID) => {
  return new Promise((resolve, reject) => {
    resolve(
      Reviews.aggregate(
        [
          {$match: {listingID}},
          {$group: {
            "_id":"$listingID",
            avg_clean:{"$avg" : "$reviewRating.cleanliness"},
            avg_communication:{"$avg" : "$reviewRating.communication"},
            avg_checkIn:{"$avg" : "$reviewRating.checkIn"},
            avg_accuracy:{"$avg" : "$reviewRating.accuracy"},
            avg_location:{"$avg" : "$reviewRating.location"},
            avg_value:{"$avg" : "$reviewRating.value"}
          }},
          {$project:{
            _id: 0,
            rounded_clean:{"$trunc" : ["$avg_clean", 1]},
            rounded_communication:{"$trunc" : ["$avg_communication", 1]},
            rounded_checkIn:{"$trunc" : ["$avg_checkIn",1]},
            rounded_accuracy:{"$trunc" : ["$avg_accuracy",1]},
            rounded_location:{"$trunc" : ["$avg_location",1]},
            rounded_value:{"$trunc" : ["$avg_value",1]}
          }}
        ]
    )
  );
  reject('Error with getting average rating.')
  });
}

async function runReviewSeed() {
  try {
    await refreshReviewDB();
    await seedReviewsDB();
    console.log('Review DB seeded sucessfully.');
  } catch (err) {
    console.log('Error with seeding DB.')
  }
}

const insertReview = (review) => {
  return new Promise((resolve, reject) => {
    resolve(Reviews.create(review));
    reject('Error inserting a review.');
  })
};

const updateReview = (review) => {
  return new Promise((resolve, reject) => {
    resolve(Reviews.replaceOne({ _id: review._id }, review));
    reject('Error updating a review');
  });
};

const deleteReview = (ID) => {
  return new Promise((resolve, reject) => {
    resolve(Reviews.deleteOne({ '_id' : ID }));
    reject('Error with getting total review count.')
  });
};

module.exports = {
  getAllReviews,
  getListingReviews,
  getAverageReviewRating,
  getListingTotalReviewCount,
  runReviewSeed,
  insertReview,
  updateReview,
  deleteReview
};

const faker = require('faker');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/airbnbReviewsDB', { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db')
});

let reviewSchema = new mongoose.Schema({
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

let Reviews = mongoose.model('Reviews', reviewSchema);

let seedReviewsDB = () => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < 500; i++){
      let newReview = new Reviews({
        userName: faker.name.findName(),
        dateJoined: faker.date.month() + ' 2021',
        profilePic: 'Insert SW url here',
        reviewDescription: faker.lorem.sentences(3),
        reviewRating: {
          cleanliness: faker.random.number({min:1, max:5}),
          communication: faker.random.number({min:1, max:5}),
          checkIn: faker.random.number({min:1, max:5}),
          accuracy: faker.random.number({min:1, max:5}),
          location: faker.random.number({min:1, max:5}),
          value: faker.random.number({min:1, max:5}),
        },
        listingID: faker.random.number(100)
      });
      resolve(Reviews.create(newReview));
      reject('Error with seeding the Reviews DB')
    }
  })
}

let refreshReviewDB = () => {
  return new Promise((resolve, reject) => {
    resolve(Reviews.deleteMany({}));
    reject('Error with removing old data.')
  })
}

let getAllReviews = () => {
  return new Promise((resolve, reject) => {
    resolve(Reviews.find({}).sort({ "listingID": 1 }));
    reject('Error with getting all reviews.')
  })
}

let getListingReviews = (listingID) => {
  return new Promise((resolve, reject) => {
    resolve(Reviews.find({}).where('listingID').equals(listingID));
    reject('Error with getting this listings reviews.')
  })
}

let getListingTotalReviewCount = (listingID) => {
  return new Promise((resolve, reject) => {
    resolve(Reviews.find({'listingID' : listingID}).countDocuments());
    reject('Error with getting total review count.')
  })
}

let getAverageReviewRating = (listingID) => {
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

//runReviewSeed();
module.exports = {getAllReviews, getListingReviews, getAverageReviewRating, getListingTotalReviewCount};




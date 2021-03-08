const faker = require('faker');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/airbnbReviewsDB', { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('open', () => console.log('connected to db'))
  .on('error', () => console.log('db connection error'));

let reviewSchema = new mongoose.Schema({
  userName: String,
  dateJoined: String,
  profilePic: String,
  reviewDescription: String,
  reviewRating: [{
      cleanliness: Number,
      communication: Number,
      checkIn: Number,
      accuracy: Number,
      location: Number,
      value: Number
    }],
  listingID: String
});

let Reviews = mongoose.model('Reviews', reviewSchema);

let seedReviewsDB = () => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < 100; i++){
      let newReview = new Reviews({
        userName: faker.name.findName(),
        dateJoined: faker.date.month() + ' 2021',
        profilePic: 'Insert SW url here',
        reviewDescription: faker.lorem.sentences(3),
        reviewRating: [{
          cleanliness: faker.finance.amount(2,5,1),
          communication: faker.finance.amount(2,5,1),
          checkIn: faker.finance.amount(2,5,1),
          accuracy: faker.finance.amount(2,5,1),
          location: faker.finance.amount(2,5,1),
          value: faker.finance.amount(2,5,1),
        }],
        listingID: faker.random.number(100)
      });
      resolve(Reviews.create(newReview));
      reject('Error with seeding the Reviews DB')
    }
  })
}

let refreshReviewDB = () => {
  return new Promise((resolve, reject) => {
    resolve(Reviews.deleteMany({}))
  })
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

runReviewSeed()
// db.reviews.deleteMany({})



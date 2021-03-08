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

let seedDB = () => {
  for (let i = 0; i < 50; i++) {
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
    Reviews.create(newReview);
  }
}

seedDB();
// db.reviews.deleteMany({});



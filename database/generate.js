const faker = require('faker');
const fs = require('fs');
const postgres = require('./sqldb.js');

const generate = (initial = 1, records = 5000) => {
  let store = [];
  let id = initial;
  const end = initial - 1 + records;
  fs.writeFileSync(`start_${initial - 1}_end_${end}.json`, '');
  for (let i = initial; i <= end ; i++) {
    const random = Math.floor(Math.random() * 21);
    for (let j = 0; j < random; j++) {
      const record = {
        id,
        userName: faker.name.firstName(),
        dateJoined: `${faker.date.month()} ${faker.random.number({ min: 2010, max: 2021 })}`,
        profilePic: `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/reviews/${faker.random.number({ min: 1, max: 1000 })}.jpg`,
        reviewDescription: faker.lorem.sentences(1),
        reviewRating: {
          cleanliness: faker.random.number({ min: 4, max: 5 }),
          communication: faker.random.number({ min: 4, max: 5 }),
          checkIn: faker.random.number({ min: 4, max: 5 }),
          accuracy: faker.random.number({ min: 4, max: 5 }),
          location: faker.random.number({ min: 4, max: 5 }),
          value: faker.random.number({ min: 4, max: 5 }),
        },
        listingID: i,
      };
      id++;
      store.push(record);
  }
  fs.writeFileSync(`start_${initial - 1}_end_${end}.json`, JSON.stringify(store));
  postgres.bulkCreateReviews(store)
    .catch((err) => {
      console.error('Error in generate: ', err);
    });
  return store;
}
}

const seed = (start = parseInt(process.argv[2]), increment = parseInt(process.argv[3]), totalRecords = parseInt(process.argv[4])) => {
  for (let i = start; i <= totalRecords; i += increment) {
    generate(i, increment);
  }
};
seed();

module.exports = seed;
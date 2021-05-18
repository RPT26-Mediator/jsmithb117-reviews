/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const faker = require('faker');
const { writeFileSync } = require('fs');

const generateTenMillionPrimaryRecords = (min = 1, max = 10000000, increment = 10000) => {
  const startTime = Date.now();
  let id = min;
  let store = [];
  for (let i = min; i <= max; i++) {
    const random = Math.floor(Math.random() * 21);
    for (let j = 0; j < random; j++) {
      const record = {
        id,
        userName: faker.name.firstName(),
        dateJoined: `${faker.date.month()} ${faker.random.number({ min: 2010, max: 2021 })}`,
        profilePic: `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/instructors/${faker.random.number({ min: 1, max: 1000 })}.jpg`,
        reviewDescription: faker.lorem.sentences(3),
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
      store.push(record);
      id++;
    }
    // if ten thousand records have been created, write data to a file, clear store
    if (i % increment === 0) {
      console.log(`Writing "PrimaryRecords${i - increment}_through_${i}.json"`);
      writeFileSync(`./data/primaryRecords${i - increment}_through_${i}.json`, JSON.stringify(store));
      const endTime = Date.now();
      let millisecondsLeft = endTime - startTime;
      const minutes = Math.floor(millisecondsLeft / 60000);
      millisecondsLeft %= 60000;
      const seconds = Math.floor(millisecondsLeft / 1000);
      millisecondsLeft %= 1000;
      console.log(`Took ${minutes} minutes, ${seconds}.${millisecondsLeft} seconds.`);
      store = [];
    }
  }
};

generateTenMillionPrimaryRecords(1, 10000000);

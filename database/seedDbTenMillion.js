/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const faker = require('faker');
// const { Reviews } = require('./db');
const { writeFile } = require('fs');

const generateTenMillionPrimaryRecords = () => {
  const startTime = Date.now();
  // let endTime;
  let store = [];
  let count = 0;
  for (let i = 0; i < 10000000; i++) {
    const random = Math.floor(Math.random() * 21);
    for (let j = 0; j < random; j++) {
      count++;
      const record = {
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
        listingID: j,
      };
      store.push(record);
      // if one hundred thousand records have been created, write data to a file, clear store
      if (count % 100000 === 0) {
        console.log(`Writing "PrimaryRecords${count - 100000}_through_${count}.json"`);
        writeFile(`./database/data/primaryRecords${count - 100000}_through_${count}.json`, JSON.stringify(store), (err) => {
          console.log('Write file operation complete');
          if (err) {
            console.error('Error writing file: ', err);
          }
        });
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
  }
};

generateTenMillionPrimaryRecords();

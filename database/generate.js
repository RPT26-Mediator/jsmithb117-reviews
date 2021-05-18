const faker = require('faker');

const generate = (initial = 1, records = 5000) => {
  let store = [];
  let id = 1;
  for (let i = initial; i <= initial + records - 1; i++) {
    const random = Math.floor(Math.random() * 21);
    for (let j = 0; j < random; j++) {
      // Postgres:
      const record = {
        user_name: faker.name.firstName(),
        date_joined: `${faker.date.month()} ${faker.random.number({ min: 2010, max: 2021 })}`,
        profile_pic: `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/instructors/${faker.random.number({ min: 1, max: 1000 })}.jpg`,
        review_description: faker.lorem.sentences(1),
        cleanliness: faker.random.number({ min: 4, max: 5 }),
        communication: faker.random.number({ min: 4, max: 5 }),
        checkin: faker.random.number({ min: 4, max: 5 }),
        accuracy: faker.random.number({ min: 4, max: 5 }),
        location: faker.random.number({ min: 4, max: 5 }),
        value: faker.random.number({ min: 4, max: 5 }),
        listing_id: i,
      };
      //Cassandra:
    //   const record = {
    //     id: id++,
    //     username: faker.name.firstName(),
    //     datejoined: `${faker.date.month()} ${faker.random.number({ min: 2010, max: 2021 })}`,
    //     profilepic: `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/instructors/${faker.random.number({ min: 1, max: 1000 })}.jpg`,
    //     reviewdescription: faker.lorem.sentences(3),
    //     cleanliness: faker.random.number({ min: 4, max: 5 }),
    //     communication: faker.random.number({ min: 4, max: 5 }),
    //     checkin: faker.random.number({ min: 4, max: 5 }),
    //     accuracy: faker.random.number({ min: 4, max: 5 }),
    //     location: faker.random.number({ min: 4, max: 5 }),
    //     value: faker.random.number({ min: 4, max: 5 }),
    //     listingid: i,
    //   };
      // // generates new username if previous username includes a ' (csv parser workaround)
      // while(record.username.includes("'")) {
    //     record.username = faker.name.firstName();
    //   }
    //   store.push(record);
    // }
    // if ten thousand records have been created, write data to a file, clear store
    // if (i % increment === 0) {
    //   console.log(`Writing "PrimaryRecords${i - increment}_through_${i}.json"`);
    //   writeFileSync(`./data/primaryRecords${i - increment}_through_${i}.json`, JSON.stringify(store));
    //   const endTime = Date.now();
    //   let millisecondsLeft = endTime - startTime;
    //   const minutes = Math.floor(millisecondsLeft / 60000);
    //   millisecondsLeft %= 60000;
    //   const seconds = Math.floor(millisecondsLeft / 1000);
    //   millisecondsLeft %= 1000;
    //   console.log(`Took ${minutes} minutes, ${seconds}.${millisecondsLeft} seconds.`);
    //   store = [];
    // }
  }
  return store;
};

// generateTenMillionPrimaryRecords();
module.exports = generate;

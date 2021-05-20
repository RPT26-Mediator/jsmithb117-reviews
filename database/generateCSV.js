
const csvWriter = require('csv-write-stream')
const fs = require('fs')
const faker = require('faker');

const writer = csvWriter();
const startTime = Date.now();

const timeCheck = (startTime, records) => {
  const endTime = Date.now();
  let millisecondsLeft = endTime - startTime;
  const minutes = Math.floor(millisecondsLeft / 60000);
  millisecondsLeft %= 60000;
  const seconds = Math.floor(millisecondsLeft / 1000);
  console.log(`Completed ${records} primary records, Total time so far: ${minutes} minutes, ${seconds} seconds.`);
};


const initCsvFile = ( async (start, end) => {
  let id = start + 1;
  writer.pipe(fs.createWriteStream(`${start}.csv`));
  for (var i = start; i <= end; i++) {
    const random = Math.floor(Math.random() * 21);
    let reviewText = '';
    for (let j = 0; j < random; j++) {
      let review ={
        j:
        username:faker.name.firstName(),
        datejoined:`${faker.date.month()} ${faker.random.number({min:2010,max:2021})}`,
        profilepic:`https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/instructors/${faker.random.number({min:1,max:1000})}`.jpg,
        reviewdescription:faker.lorem.sentences(1),
        reviewrating:
          `cleanliness:${faker.random.number({min:4,max:5})},communication:${faker.random.number({min:4,max:5})},checkin:${faker.random.number({min:4,max:5})},accuracy:${faker.random.number({min:4,max:5})},location:${faker.random.number({min:4,max:5})},value:${faker.random.number({min:4,max:5})}`
      };

      reviewText = reviewText.concat(JSON.stringify({
        username:faker.name.firstName(),
        datejoined:`${faker.date.month()} ${faker.random.number({min:2010,max:2021})}`,
        profilepic:`https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/instructors/${faker.random.number({min:1,max:1000})}.jpg`,
        reviewdescription:faker.lorem.words(3),
        cleanliness:faker.random.number({min:4,max:5}),
        communication:faker.random.number({min:4,max:5}),
        checkin:faker.random.number({min:4,max:5}),
        accuracy:faker.random.number({min:4,max:5}),
        location:faker.random.number({min:4,max:5}),
        value:faker.random.number({min:4,max:5})
      }));
    }
    await writer.write({
      id: id++,
      reviewrating: reviewText

    });
    try {
      await new Promise(resolve => setImmediate(resolve));
    } catch (err) {
      console.error(err);
    }
    if (i % 10000 === 0) {
      timeCheck(startTime, i);
    }
  }
  writer.end();
})(0, 100);

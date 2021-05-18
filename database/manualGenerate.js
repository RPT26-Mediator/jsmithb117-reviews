// var fs = require('fs');
const fs = require('graceful-fs');
const faker = require('faker');

var newLine = '\r\n';
var fields = ['listingid|id|username|datejoined|profilepic|reviewdescription|reviewrating'];



const timeCheck = (startTime, records) => {
  const endTime = Date.now();
  let millisecondsLeft = endTime - startTime;
  const minutes = Math.floor(millisecondsLeft / 60000);
  millisecondsLeft %= 60000;
  const seconds = Math.floor(millisecondsLeft / 1000);
  const thousands = records / 1000;
  const millions = records / 1000000;
  if (millions >= 1) {
  console.log(`Completed ${millions} million primary records, Total time so far: ${minutes} minutes, ${seconds} seconds.`);
  } else {
    console.log(`Completed ${thousands} thousand primary records, Total time so far: ${minutes} minutes, ${seconds} seconds.`);
  }
};

const generate = (start, end) => {
  const fileName = `${start}-${end}.csv`;
  const startTime = Date.now();
  let counter = 0;
  for (let i = start; i <= end; i++) {
    if (i === start) {
      fields = fields + "\n";
      fs.writeFileSync(fileName, fields);
    }
    const random = Math.floor(Math.random() * 21);
    let secondary = '';
    for (let j = 1; j <= random; j++) {
      secondary = secondary.concat(`${i}|${j}|${faker.name.firstName()}|${faker.date.month()} ${faker.random.number({ min: 2010, max: 2021 })}|https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/instructors/${faker.random.number({ min: 1, max: 1000 })}.jpg|${faker.lorem.sentences(3)}|{cleanliness:${faker.random.number({ min: 4, max: 5 })},communication:${faker.random.number({ min: 4, max: 5 })},checkin:${faker.random.number({ min: 4, max: 5 })},accuracy:${faker.random.number({ min: 4, max: 5 })},location:${faker.random.number({ min: 4, max: 5 })},value:${faker.random.number({ min: 4, max: 5 })}}` + '\n');
    }
      if (i % 10000 === 0) {
        timeCheck(startTime, i);
      }
      fs.appendFileSync(fileName, secondary + '\n');
  }
  console.log('complete: ', fileName);
};

// generate(9128164, 10000000);
generate(10000001, 20000000);

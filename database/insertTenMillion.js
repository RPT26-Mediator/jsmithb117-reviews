const generate = require('./generate.js');
const db = require('./cassandraDB.js');

const insertCassandra = async (start, end, increment = 1000) => {
  const startTime = Date.now();
  for (let i = start; i <= end; i += increment) {
    const data = generate(i, increment);
    for (let j = 0; j < data.length; j++) {
      try {
        const response = await db.insertOne(data[j]);
      } catch (err) {
        console.error('Error from insertCassandra: ', err);
      }
    }
    timeCheck(startTime);
  }
}

const timeCheck = (startTime) => {
  const endTime = Date.now();
  let millisecondsLeft = endTime - startTime;
  const minutes = Math.floor(millisecondsLeft / 60000);
  millisecondsLeft %= 60000;
  const seconds = Math.floor(millisecondsLeft / 1000);
  console.log(`Total time so far: ${minutes} minutes, ${seconds} seconds.`);
};

insertCassandra(1, 100, 10000);

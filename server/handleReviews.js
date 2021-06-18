module.exports = handleReviewsData = (listings) => {
//console.log('handleReviews listings: ', listings);
  let sums = {
    cleanliness: 0,
    communication: 0,
    checkIn: 0,
    accuracy: 0,
    location: 0,
    value: 0,
    total: 0,
  };
  // Adds each entry to sums to facilitate averaging
  for (let i = 0; i < listings.length; i++) {
//console.log('sums inside: ', sums);
    sums.cleanliness += listings[i].reviewRating.cleanliness;
    sums.communication += listings[i].reviewRating.communication;
    sums.checkIn += listings[i].reviewRating.checkIn;
    sums.accuracy += listings[i].reviewRating.accuracy;
    sums.location += listings[i].reviewRating.location;
    sums.value += listings[i].reviewRating.value;
  }
  // calculate averageRating for all reviews for this listing
  sums.total = sums.cleanliness +
    sums.communication +
    sums.checkIn +
    sums.accuracy +
    sums.location +
    sums.value;
  sums.total = sums.total / 6 / listings.length;
  // calculates averages in place
  sums.communication = sums.communication / listings.length;
  sums.checkIn = sums.checkIn / listings.length;
  sums.accuracy = sums.accuracy / listings.length;
  sums.location = sums.location / listings.length;
  sums.value = sums.value / listings.length;
  sums.cleanliness = sums.cleanliness / listings.length;
  // returns in the format front-end expects
  return ({
    averageRating: sums.total,
    ratings: {
      rounded_clean: sums.cleanliness,
      rounded_communication: sums.communication,
      rounded_checkIn: sums.checkIn,
      rounded_accuracy: sums.accuracy,
      rounded_location: sums.location,
      rounded_value: sums.value
    }
  });
};

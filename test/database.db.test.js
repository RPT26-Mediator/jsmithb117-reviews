const db = require('../database/db.js');

//test db functions

describe('testing db functions', () => {
  test('should return an array of review objects for a given listing', async (next) => {
    const reviews = await db.getListingReviews(50);
    expect(Array.isArray(reviews)).toBe(true);
    next();
  });

  test('should return all reviews from the database', async (next) => {
    const allReviews = await db.getAllReviews();
    expect(allReviews.length).toBeGreaterThanOrEqual(1000);
    next();
  });

  test('should return count of all reviews for a given listing', async (next) => {
    const reviewCount = await db.getListingTotalReviewCount(1);
    expect(typeof reviewCount).toBe('number');
    next();
  });

  test('should return an object for a given listing', async (next) => {
    const avgRatingObject = await db.getAverageReviewRating(1);
    expect(typeof avgRatingObject).toBe('object');
    next();
  });

  test('should return an a float for the average rating', async (next) => {
    const avgRatingObject = await db.getAverageReviewRating(1);
    const avgRating = avgRatingObject.averageRating;
    expect(Number.isInteger(avgRating)).toBe(true);
    next();
  });

  test('should return an array of ratings', async (next) => {
    const avgRatingObject = await db.getAverageReviewRating(1);
    const ratings = avgRatingObject.ratings;
    expect(Array.isArray(ratings)).toBe(true);
    next();
  });

});

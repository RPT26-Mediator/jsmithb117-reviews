import React from 'react';
import ReviewList from './ReviewList.jsx';

const Reviews = (props) => (
  <div className="flex-container">
    <div>{props.reviews.userName}</div>
    <div>{props.reviews.dateJoined}</div>
    <div>{props.reviews.reviewDescription}</div>
  </div>
);

export default Reviews;
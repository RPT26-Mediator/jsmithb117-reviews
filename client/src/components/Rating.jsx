import React from 'react';
import RatingList from './RatingList.jsx';

const Rating = (props) => (
  <div className="flex-container">
    <div>{'Cleanliness ' + props.rating.ratings[0].avg_clean}</div>
    <div>{'Communication ' +props.rating.ratings[0].avg_communication}</div>
    <div>{'Check-In ' + props.rating.ratings[0].avg_checkIn}</div>
    <div>{'Accuracy ' + props.rating.ratings[0].avg_accuracy}</div>
    <div>{'Location ' + props.rating.ratings[0].avg_location}</div>
    <div>{'Value ' + props.rating.ratings[0].avg_value}</div>
  </div>
);

export default Rating;
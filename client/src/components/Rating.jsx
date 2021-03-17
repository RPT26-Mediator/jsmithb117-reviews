import React from 'react';
import RatingList from './RatingList.jsx';
import ProgressBar from './ProgressBar.jsx';

const Rating = (props) => (
  <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 5, paddingBottom: '32px'}} className="ratings">
    <div>{'Cleanliness ' + props.rating.ratings[0].rounded_clean} <ProgressBar style={{color: "red"}}/></div>
    <div>{'Accuracy ' + props.rating.ratings[0].rounded_accuracy}</div>
    <div>{'Communication ' +props.rating.ratings[0].rounded_communication}</div>
    <div>{'Location ' + props.rating.ratings[0].rounded_location}</div>
    <div>{'Check-In ' + props.rating.ratings[0].rounded_checkIn}</div>
    <div>{'Value ' + props.rating.ratings[0].rounded_value}</div>
  </div>
);

export default Rating;
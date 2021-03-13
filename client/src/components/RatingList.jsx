import React from 'react';
import Rating from './Rating.jsx';

const RatingList = (props) => (
  <div>
    {
      props.rating.map((rating, index)=>{
      return <Rating rating={rating} key={index} />;
      })
    }
  </div>
);

export default RatingList;
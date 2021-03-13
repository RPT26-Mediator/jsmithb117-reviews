import React from 'react';
import Reviews from './Reviews.jsx';

const ReviewList = (props) => (
  <div>
    {
      props.reviews.map((review, index)=>{
      return <Reviews reviews={review} key={index} />;
      })
    }
  </div>
);

export default ReviewList;
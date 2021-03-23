import React from 'react';
import Rating from './Rating.jsx';

const RatingList = (props) => (
  <div style={{
    gridGap: 10,
    marginBottom:"24px",
    minWidth:"950px",
    maxWidth: "1128px"
    }}>
    {
      props.rating.map((rating, index)=>{
      return <Rating rating={rating} key={index} />;
      })
    }
  </div>
);

export default RatingList;
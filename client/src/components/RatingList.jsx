import React from 'react';
import Rating from './Rating.jsx';

const RatingList = (props) => (
  <div style={{
    gridGap: 10,
    marginBottom:"24px",
    minWidth:"950px",
    maxWidth: "1128px",
    display: "block",
    color: "#222222",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "20px",
    fontFamily: "Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
    }}>
    {
      props.rating.map((rating, index)=>{
      return <Rating rating={rating} key={index} />;
      })
    }
  </div>
);

export default RatingList;
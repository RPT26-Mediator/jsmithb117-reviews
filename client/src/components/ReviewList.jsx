import React from 'react';
import Reviews from './Reviews.jsx';

const ReviewList = (props) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: 10,
    gridColumnGap: 60,
    minWidth:"950px",
    maxWidth: "1128px",
    fontFamily: "Circular, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif",
    fontWeight: 400,
    fontSize: "var(--html-text-font-size, 16)",
  }} className="reviews">
    {props.reviews.slice(0, 6).map((review, index)=>{
      return <Reviews reviews={review} key={index} />;
    })}
  </div>
);

export default ReviewList;
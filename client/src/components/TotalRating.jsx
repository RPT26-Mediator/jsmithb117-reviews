import React from 'react';
import StarIcon from './StarIcon.jsx'

const TotalRating = (props) => (
  <div style={{
    color: "#222222",
    paddingBottom: "32px",
    fontFamily: "Circular, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif !important",
    fontWeight: 600,
    fontSize: "22px",
    display:"inline-flex",
    flexDirection:"row",
    lineHeight:"26px"
    }}>
      <StarIcon />
      {props.finalRating + ' (' + props.totalReviews + ' reviews)'}
  </div>
);

export default TotalRating;
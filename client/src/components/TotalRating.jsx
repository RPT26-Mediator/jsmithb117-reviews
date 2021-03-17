import React from 'react';

const TotalRating = (props) => (
  <div style={{paddingBottom: '32px'}}>
    {props.finalRating + ' (' + props.totalReviews + ' reviews)'}
  </div>
);

export default TotalRating;
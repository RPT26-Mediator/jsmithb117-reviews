import React from 'react';

const TotalRating = (props) => (
  <div>
  {/* {console.log(props.finalRating[0].averageRating)} */}
  {props.finalRating + ' (' + props.totalReviews + ' reviews)'}
  </div>
);

export default TotalRating;
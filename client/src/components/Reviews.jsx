import React from 'react';
import ReviewList from './ReviewList.jsx';

const Reviews = (props) => (
  <div style={{paddingBottom:"30px"}}>
      <div style={{paddingBottom:"10px"}}>
        <img style={{
          borderRadius: "56%",
          width: 56,
          height: 56,
          background: "white",
          display: "inline-block"
        }}
        src={props.reviews.profilePic}/>
        <div style={{ display: "inline-block", position:"absolute", paddingTop:"10px", paddingLeft:"10px"}}>
          <div>
            {props.reviews.userName}
          </div>
          <div>
          {props.reviews.dateJoined}
          </div>
        </div>
      </div>
    <div>{props.reviews.reviewDescription}</div>
  </div>
);

export default Reviews;
import React from 'react';
import ReviewList from './ReviewList.jsx';

const Reviews = (props) => (
  <div style={{
    paddingBottom:"30px"
    }}>
      <div style={{paddingBottom:"10px"}}>
        <img style={{
          borderRadius: "56%",
          width: 56,
          height: 56,
          background: "white",
          display: "inline-block"
        }}
        src={props.reviews.profilePic}/>
        <div style={{
          display: "inline-block",
          position:"absolute",
          paddingTop:"10px",
          paddingLeft:"10px"}}>
          <div style={{
            fontFamily: "Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "20px"
            }}>
            {props.reviews.userName}
          </div>
          <div style={{
            fontFamily:"Circular, -apple-system, BlinkMacSystemFont, Roboto, ;'Helvetica Neue', sans-serif !important",
            color: "#717171",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "20px"
            }}>
          {props.reviews.dateJoined}
          </div>
        </div>
      </div>
    <div style={{
      color:"#222222",
      fontFamily:"Circular, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif",
      fontWeight: 400,
      fontSize: "16px",
      wordBreak:"break-word",
      paddingRight: "20%",
      lineHeight: '24px'
    }}>
      {props.reviews.reviewDescription}
    </div>
  </div>
);

export default Reviews;
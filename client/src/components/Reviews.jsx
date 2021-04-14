import React from 'react';
import ReviewList from './ReviewList.jsx';
import styled from 'styled-components';

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
        <div style={{
          display: "inline-block",
          position:"absolute",
          paddingTop:"10px",
          paddingLeft:"10px"}}>
          <ReviewerNameStyle>
            {props.reviews.userName}
          </ReviewerNameStyle>
          <ReviewerJoinedDateStyle>
          {props.reviews.dateJoined}
          </ReviewerJoinedDateStyle>
        </div>
      </div>
    <ReviewerDescriptionStyle>
      {props.reviews.reviewDescription}
    </ReviewerDescriptionStyle>
  </div>
);

const ReviewerNameStyle = styled.div`
  color: rgb(34, 34, 34);
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`
const ReviewerJoinedDateStyle = styled.div `
  color: rgb(113, 113, 113);
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`

const ReviewerDescriptionStyle = styled.div `
  color: var(--html-text-color, #222222);
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  word-break: break-word;
  padding-right: 19%
`

export default Reviews;
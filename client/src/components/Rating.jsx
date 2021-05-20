import React from 'react';
import RatingList from './RatingList.jsx';
import ProgressBar from './ProgressBar.jsx';
import styled from 'styled-components';

const Rating = (props) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gridGap: "16px",
    gridColumnGap: 60,
    paddingBottom: '32px',
    fontFamily: 'Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif',
    fontWeight: 400,
    width: "100%",
    }} className="ratings">
    <StyledRatingOption>{'Cleanliness '}</StyledRatingOption>
    <ProgressBar rating={props.rating.ratings.rounded_clean.toFixed(1)}/>
    <StyledRating>{props.rating.ratings.rounded_clean.toFixed(1)}</StyledRating>
    <StyledRatingOption>{'Accuracy '}</StyledRatingOption>
    <ProgressBar rating={props.rating.ratings.rounded_accuracy.toFixed(1)}/>
    <StyledRating>{props.rating.ratings.rounded_accuracy.toFixed(1)}</StyledRating>
    <StyledRatingOption>{'Communication '}</StyledRatingOption>
    <ProgressBar rating={props.rating.ratings.rounded_communication.toFixed(1)} />
    <StyledRating>{props.rating.ratings.rounded_communication.toFixed(1)}</StyledRating>
    <StyledRatingOption>{'Location '}</StyledRatingOption>
    <ProgressBar rating={props.rating.ratings.rounded_location.toFixed(1)}/>
    <StyledRating>{props.rating.ratings.rounded_location.toFixed(1)}</StyledRating>
    <StyledRatingOption>{'Check-In '}</StyledRatingOption>
    <ProgressBar rating={props.rating.ratings.rounded_checkIn.toFixed(1)}/>
    <StyledRating>{props.rating.ratings.rounded_checkIn.toFixed(1)}</StyledRating>
    <StyledRatingOption>{'Value '}</StyledRatingOption>
    <ProgressBar rating={props.rating.ratings.rounded_value.toFixed(1)}/>
    <StyledRating>{props.rating.ratings.rounded_value.toFixed(1)}</StyledRating>
  </div>
);

const StyledRating = styled.div`
  color: "black";
  font-family: "Circular, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif";
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  margin-left: 6px;
`;

const StyledRatingOption = styled.div`
  color: "black";
  font-family: "Circular, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif";
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  width: 100%;
`;

export default Rating;
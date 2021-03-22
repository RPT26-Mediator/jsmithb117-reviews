import React from 'react';
import RatingList from './RatingList.jsx';
import ProgressBar from './ProgressBar.jsx';
import styled from 'styled-components';


const StyledRating = styled.div`
  color: "black";
  font-family: "Circular, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif";
  font-weight: 600 !important;
  font-size: 14px !important;
  line-height: 16px !important;
  margin-left: 6px !important;
`;

const StyledRatingOption = styled.div`
  color: "black";
  font-family: "Circular, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif";
  font-weight: 400 !important;
  font-size: 16px !important;
  line-height: 20px !important;
  width: 100%;
`;

const Rating = (props) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gridGap: "16px",
    paddingBottom: '32px',
    fontFamily: 'Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important',
    fontWeight: 400,
    width: "100%"
    }} className="ratings">
    <StyledRatingOption>{'Cleanliness '}</StyledRatingOption>
    <ProgressBar rating={props.rating.ratings[0].rounded_clean.toFixed(1)}/>
    <StyledRating>{props.rating.ratings[0].rounded_clean.toFixed(1)}</StyledRating>
    <StyledRatingOption>{'Accuracy '}</StyledRatingOption>
    <ProgressBar rating={props.rating.ratings[0].rounded_accuracy.toFixed(1)}/>
    <StyledRating>{props.rating.ratings[0].rounded_accuracy.toFixed(1)}</StyledRating>
    <StyledRatingOption>{'Communication '}</StyledRatingOption>
    <ProgressBar rating={props.rating.ratings[0].rounded_communication.toFixed(1)} />
    <StyledRating>{props.rating.ratings[0].rounded_communication.toFixed(1)}</StyledRating>
    <StyledRatingOption>{'Location '}</StyledRatingOption>
    <ProgressBar rating={props.rating.ratings[0].rounded_location.toFixed(1)}/>
    <StyledRating>{props.rating.ratings[0].rounded_location.toFixed(1)}</StyledRating>
    <StyledRatingOption>{'Check-In '}</StyledRatingOption>
    <ProgressBar rating={props.rating.ratings[0].rounded_checkIn.toFixed(1)}/>
    <StyledRating>{props.rating.ratings[0].rounded_checkIn.toFixed(1)}</StyledRating>
    <StyledRatingOption>{'Value '}</StyledRatingOption>
    <ProgressBar rating={props.rating.ratings[0].rounded_value.toFixed(1)}/>
    <StyledRating>{props.rating.ratings[0].rounded_value.toFixed(1)}</StyledRating>
  </div>
);

export default Rating;
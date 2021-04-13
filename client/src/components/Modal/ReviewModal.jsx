import React from "react";
import styled, { keyframes } from 'styled-components';
import StarIcon from '../StarIcon.jsx';
import Rating from '../Rating.jsx';
import RatingList from '../RatingList.jsx';
import Reviews from '../Reviews.jsx';
import ReviewList from '../ReviewList.jsx';
import ProgressBar from '../ProgressBar.jsx'


const slideDownAnimation = keyframes `
  from {margin-top 0%}
  to {margin-top 100%}
`
const slideUpAnimation = keyframes `
  from {margin-top 100%}
  to {margin-top 0%}
`
const ModalContainer = styled.div `
  position: fixed;
  z-index: 2000;
  inset: 0px;
  overflow: hidden;
  background: rgb(0 0 0 / 28%);
`
const Modal = styled.div `
  position: fixed;
  top: 5%;
  left: 22%;
  right: 22%;
  bottom: 5%;
  width: 100%;
  max-width: 1032px;
  border-radius: 12px;
  background: white;
  overflow: hidden;
  overflow-y: scroll;
  animation-name: ${props => props.showingModal ? slideDownAnimation : slideUpAnimation};
  animation-duration: 400ms;
  animation-iteration-count: 1;
`
const CloseModalButton = styled.div `
  height: 16px;
  width: 16px;
  margin-left: 25px;
  margin-top: 25px;
  margin-bottom: 30px;
  cursor: pointer;
  touch-action: manipulation;
  position: relative;
`

const StyledRating = styled.div`
  color: "black";
  font-family: "Circular, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif";
  font-weight: 600 !important;
  font-size: 13px !important;
  line-height: 16px !important;
  margin-left: 70px !important;
`;

const StyledRatingOption = styled.div`
  color: "black";
  font-family: "Circular, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif";
  font-weight: 400 !important;
  font-size: 16px !important;
  line-height: 20px !important;
  margin-left: 20px !important;
  width: 100%;
`;

const AllReviews = styled.div `
  margin-left: auto%;
  overflow-y: scroll;
`


const ReviewModal = (props) => (
  // issue with closing the modal
    // in order for slide down to take effect, the ternary needs to return false, but because the modal component is not active during the period where the modal is not showing, index.jsx cannot pass down the state of the modal, as it requires the modal to be active, after the show all reviews button is clicked

  <ModalContainer onClick={props.closeModal}>
    <Modal onClick={(e) => e.stopPropagation()}>
      <div>
        <div>
        <CloseModalButton onClick={props.closeModal}>X</CloseModalButton>
        </div>
        <h2 style={{display:"inline-flex"}}>
          {/* Star */}
          <svg
            viewBox="0 0 32 32"
            fill="#FF385C"
            style={{
              width:"24px",
              height:"24px",
              marginLeft: "25px",
              marginRight: "8px",
              marginTop: "5px"
              }}>
              <path strokeLinecap="butt" strokeLinejoin="butt" strokeWidth={0} d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" />
            </svg>
            <div>
            {/* Average Rating */}
            {props.finalRating.toFixed(2)}
            {' (' + props.totalReviews + ' Reviews)'}
            </div>
            {/* SearchBar */}
            <div>
              <input
                style={{
                  width: "600px",
                  marginLeft: "23%"
                }}
                type="text"
                placeholder="Search reviews"/>
            </div>
        </h2>
        <div style={{display:"inline-flex"}}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 3fr)",
            gridRowGap: 15,
            paddingBottom: '32px',
            fontFamily: 'Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important',
            fontWeight: 400,
            width: "100%",
            marginLeft: "2%",
            maxHeight: "10px"
            }} className="ratings">
            <StyledRatingOption>{'Cleanliness '}</StyledRatingOption>
            <ProgressBar rating={props.rating[0].ratings[0].rounded_clean.toFixed(1)}/>
            <StyledRating>{props.rating[0].ratings[0].rounded_clean.toFixed(1)}</StyledRating>
            <StyledRatingOption>{'Accuracy '}</StyledRatingOption>
            <ProgressBar rating={props.rating[0].ratings[0].rounded_accuracy.toFixed(1)}/>
            <StyledRating>{props.rating[0].ratings[0].rounded_accuracy.toFixed(1)}</StyledRating>
            <StyledRatingOption>{'Communication '}</StyledRatingOption>
            <ProgressBar rating={props.rating[0].ratings[0].rounded_communication.toFixed(1)} />
            <StyledRating>{props.rating[0].ratings[0].rounded_communication.toFixed(1)}</StyledRating>
            <StyledRatingOption>{'Location '}</StyledRatingOption>
            <ProgressBar rating={props.rating[0].ratings[0].rounded_location.toFixed(1)}/>
            <StyledRating>{props.rating[0].ratings[0].rounded_location.toFixed(1)}</StyledRating>
            <StyledRatingOption>{'Check-In '}</StyledRatingOption>
            <ProgressBar rating={props.rating[0].ratings[0].rounded_checkIn.toFixed(1)}/>
            <StyledRating>{props.rating[0].ratings[0].rounded_checkIn.toFixed(1)}</StyledRating>
            <StyledRatingOption>{'Value '}</StyledRatingOption>
            <ProgressBar rating={props.rating[0].ratings[0].rounded_value.toFixed(1)}/>
            <StyledRating>{props.rating[0].ratings[0].rounded_value.toFixed(1)}</StyledRating>
          </div>
          <AllReviews>
            {/* {console.log(props.reviewsList)} */}
            {/* {console.log(props.reviewsList[0].dateJoined, props.reviewsList[0].userName, props.reviewsList[0].reviewDescription)} */}
            <div>
              {props.reviewsList.map((review, index)=>{
                return <Reviews reviews={review} key={index} />;
              })}
            </div>
          </AllReviews>
        </div>
      </div>
    </Modal>
  </ModalContainer>
);

export default ReviewModal

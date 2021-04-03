import React from "react";
import styled, { keyframes } from 'styled-components';
import StarIcon from '../StarIcon.jsx';
import Rating from '../Rating.jsx';
import RatingList from '../RatingList.jsx';
import Reviews from '../Reviews.jsx';
import ReviewList from '../ReviewList.jsx'

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
          <svg
            viewBox="0 0 32 32"
            fill="#FF385C"
            style={{
              width:"24px",
              height:"24px",
              marginLeft: "25px",
              marginRight: "8px"
              }}>
              <path strokeLinecap="butt" strokeLinejoin="butt" strokeWidth={0} d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" />
            </svg>
            <div style={{marginRight: "8px"}}>
            {props.finalRating}
            {' (' + props.totalReviews + ' Reviews)'}
            </div>
            <div>
            <input
              style={{
                width: "700px",
                margin: "auto"
              }}
              type="text"
              placeholder="Search reviews"
            />
            </div>
        </h2>
        <div>
        ratings
        </div>
        <div>
          all reviews
        </div>
      </div>
    </Modal>
  </ModalContainer>
);

export default ReviewModal

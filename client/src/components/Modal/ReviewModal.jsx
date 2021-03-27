import React from "react";
import styled from 'styled-components';
import StarIcon from '../StarIcon.jsx';
import Rating from '../Rating.jsx';
import RatingList from '../RatingList.jsx';
import Reviews from '../Reviews.jsx';
import ReviewList from '../ReviewList.jsx'


const ModalContainer = styled.div `
  position: fixed;
  z-index: 2000;
  inset: 0px;
  overflow: hidden;
  background: rgb(0 0 0 / 28%);
  transition: 'max-width 0.5s, opacity 0.2s'
`
const Modal = styled.div `
  position: fixed;
  top: 5%;
  left: 22%;
  right: 22%;
  bottom: 5%;
  width: auto;
  height: auto;
  border-radius: 12px;
  background: white;
  overflow: hidden;
  transition: max-width 0.5s, opacity 0.2s
`
const CloseModalButton = styled.div `
  height: 16px;
  width: 16px;
  margin-left: 15px;
  margin-top: 15px;
  cursor: pointer !important;
  touch-action: manipulation !important;
  position: relative !important;
`
const StarIconStyle = styled.div `
  display: block;
  height: 100px;
  width: 100px;
  margin-right: 8px !important;
  display: inline-flex !important;
`
const ReviewModal = (props) => (
  <ModalContainer onClick={props.closeModal}>
    <Modal onClick={(e) => e.stopPropagation()}>
      <div>
        <div>
        <CloseModalButton onClick={props.closeModal}>X</CloseModalButton>
        </div>
        <StarIconStyle>
        <StarIcon />
        </StarIconStyle>
        <div>
        {props.finalRating.toFixed(2) + ' (' + props.totalReviews + ' reviews)'}
        </div>
        <div>
        {props.ratingList}
        </div>
        <div>
        {props.reviewList}
      </div>
      </div>
    </Modal>
  </ModalContainer>
);

export default ReviewModal

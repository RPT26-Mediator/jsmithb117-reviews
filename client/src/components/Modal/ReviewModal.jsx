import React from "react";
import styled from 'styled-components';

const ShowAllReviewsButton = styled.button `
  cursor: pointer !important;
  display: inline-block !important;
  margin: 0px !important;
  position: relative !important;
  text-align: center !important;
  text-decoration: none !important;
  width: auto !important;
  touch-action: manipulation !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  font-size: 16px !important;
  line-height: 20px !important;
  font-weight: 600 !important;
  border-radius: 8px !important;
  border-width: 1px !important;
  border-style: solid !important;
  outline: none !important;
  padding: 13px 23px !important;
  transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s !important;
  border-color: rgb(34, 34, 34) !important;
  background: rgb(255, 255, 255);
  color: rgb(34, 34, 34) !important;
`;

const ReviewModal = (props) => (
  <div style={{paddingTop: '32px'}}>
    <ShowAllReviewsButton
    onMouseEnter={props.onHover}
    onMouseLeave={props.onLeave}
    onClick={props.showModal}>
      Show all {props.reviewCount} reviews
    </ShowAllReviewsButton>
  </div>
);

export default ReviewModal

import React from "react";

const ReviewModal = (props) => (
  <div style={{paddingTop: '32px'}}>
    <button style={{
      cursor:"pointer",position:"relative",textAlign:"center",width:"auto",fontFamily:"Circular, -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue, sans-serif",fontSize:"16px",lineHeight:"20px",fontWeight:"600",borderRadius:"8px",borderWidth:"1px",borderStyle:"solid",outline:"none",borderColor:"black",padding:"13px 23px",background:"white"
    }}
    onMouseEnter={props.onHover}
    onMouseLeave={props.onLeave}
    onClick={props.showModal}>
      Show all {props.reviewCount} reviews
    </button>
  </div>
);

export default ReviewModal

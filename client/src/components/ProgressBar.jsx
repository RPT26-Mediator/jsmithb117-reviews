import React from 'react';
import Rating from './Rating.jsx';

const ProgressBar = (props) => {
  return (
   <div style={{
    display: "flex",
    flexDirection: "row",
    position: "relative",
    height: "4px",
    width: "100%",
    marginTop: "9px",
    marginRight: "4px",
    background: "#dddddd",
    marginLeft: "40%"
    }}>
     <span style={{
       width: (props.rating/5) * 100 + "%",
       background: "black"
     }}>
     </span>
   </div>
  );
};

export default ProgressBar;
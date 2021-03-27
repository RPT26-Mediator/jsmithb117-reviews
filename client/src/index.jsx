import React from "react";
import ReactDOM from "react-dom";
import Rating from './components/Rating.jsx';
import Reviews from './components/Reviews.jsx';
import ReviewList from './components/ReviewList.jsx';
import RatingList from './components/RatingList.jsx';
import TotalRating from './components/TotalRating.jsx';
import ReviewModal from "./components/Modal/ReviewModal.jsx";
import $ from 'jquery';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: [],
      reviews: [],
      avgRating: 0,
      showAllReviews: false,
      hover: false
    }
  }

  componentDidMount() {
    this.getReviews();
    this.getRatings();
  }

  getReviews() {
    let url = window.location.href
    let listingID = url.split('/')[3];

    $.ajax({
      url: `/${listingID}/reviews`,
      type: 'GET',
      success: (res) => {
        this.setState({
          reviews: res
        })
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

  getRatings() {
    let url = window.location.href
    let listingID = url.split('/')[3];

    $.ajax({
      url: `/${listingID}/averageReviewsRating`,
      type: 'GET',
      success: (res) => {
        this.setState({
          ratings: [res],
          avgRating: res.averageRating
        })
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

  showModal() {
    if(!this.state.showAllReviews) {
      console.log("showing review modal");
      this.setState({
        showAllReviews: true
      })
      document.body.style.overflow = 'hidden';
    } else {
      console.log("closing review modal");
      this.setState({
        showAllReviews: false
      })
      document.body.style.overflow = 'scroll';
    }
  }



  hoverOverButtonColor(e) {
    e.target.style.background = '#F8F8F8';
  }

  noLongerOverButtonColor(e) {
    e.target.style.background = "white";
  }


  render() {
      return (
      <div style={{
        paddingTop: "48px",
        paddingLeft: "40px",
        paddingRight: "40px",
        maxWidth: "1280px",
        minWidth: "744px",
        marginLeft: "20%",
        marginRight: "10%"
        }}>
          <div style={{borderTopWidth: "1px", borderTopStyle:"solid", color:"#DDDDDD",paddingBottom: "48px", maxWidth:"1128px"
        }}></div>
          <TotalRating
          finalRating={this.state.avgRating}
          totalReviews={this.state.reviews.length}/>
          <RatingList rating={this.state.ratings}/>
          <ReviewList reviews={this.state.reviews}/>
          {this.state.reviews.length > 6 ?
           <div style={{paddingTop: '32px'}}>
           <ShowAllReviewsButton
           onMouseEnter={this.hoverOverButtonColor.bind(this)}
           onMouseLeave={this.noLongerOverButtonColor.bind(this)}
           onClick={this.showModal.bind(this)} style={{textDecoration:'underline',color:'blue',cursor:'pointer'}}>
             Show all {this.state.reviews.length} reviews
           </ShowAllReviewsButton>
         </div> : null}
          {this.state.showAllReviews ?
          <ReviewModal
          showingModal={this.state.showAllReviews}
          finalRating={this.state.avgRating}
          totalReviews={this.state.reviews.length}
          closeModal={this.showModal.bind(this)}
          ratingList={<RatingList rating={this.state.ratings}/>}
          reviewList={<ReviewList reviews={this.state.reviews}/>}
          />
          : null}
          <div style={{borderBottomWidth: "1px", borderBottomStyle:"solid", color:"#DDDDDD",paddingTop: "48px"}}></div>
        </div>
      );
  }
}

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
  border-color: rgb(34, 34, 34) !important;
  background: rgb(255, 255, 255);
  color: rgb(34, 34, 34) !important;
`;

ReactDOM.render(<App />, document.getElementById('Review'));
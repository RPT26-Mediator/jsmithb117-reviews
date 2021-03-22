import React from "react";
import ReactDOM from "react-dom";
import Rating from './components/Rating.jsx';
import Reviews from './components/Reviews.jsx';
import ReviewList from './components/ReviewList.jsx';
import RatingList from './components/RatingList.jsx';
import TotalRating from './components/TotalRating.jsx';
import Modal from "./components/Modal/ReviewModal.jsx";
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
    console.log("showing review modal")
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
        marginRight: "20%"
        }}>
          <div style={{borderTopWidth: "1px", borderTopStyle:"solid", color:"#DDDDDD",paddingBottom: "48px", maxWidth:"1128px"
        }}></div>
          <TotalRating
          finalRating={this.state.avgRating}
          totalReviews={this.state.reviews.length}/>
          <RatingList rating={this.state.ratings}/>
          <ReviewList reviews={this.state.reviews}/>
          {this.state.reviews.length > 6 ?
            <Modal
            show={this.state.showAllReviews}
            showModal={this.showModal.bind(this)}
            reviewCount={this.state.reviews.length}
            onHover={this.hoverOverButtonColor.bind(this)}
            onLeave={this.noLongerOverButtonColor.bind(this)}
            />
            : null}
          <div style={{borderBottomWidth: "1px", borderBottomStyle:"solid", color:"#DDDDDD",paddingTop: "48px"}}></div>
        </div>
      );
  }
}

ReactDOM.render(<App />, document.getElementById('Review'));
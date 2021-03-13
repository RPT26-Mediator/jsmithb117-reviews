import React from "react";
import ReactDOM from "react-dom";
import Rating from './components/Rating.jsx';
import Reviews from './components/Reviews.jsx';
import ReviewList from './components/ReviewList.jsx';
import RatingList from './components/RatingList.jsx';
import TotalRating from './components/TotalRating.jsx';
import $ from 'jquery';
import { BrowserRouter } from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: [],
      reviews: [],
      avgRating: 0
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
      url: `http://localhost:3000/${listingID}/reviews`,
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
      url: `http://localhost:3000/${listingID}/averageReviewsRating`,
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

  render() {
    return (
      <div>
        <TotalRating finalRating={this.state.avgRating} totalReviews={this.state.reviews.length}/>
        <RatingList rating={this.state.ratings}/>
        <ReviewList reviews={this.state.reviews}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
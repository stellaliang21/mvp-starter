import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Form from './components/Form.jsx';
import ListRestaurant from './components/ListRestaurant.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      reviews: [],
      restaurants: [],
      whatToEat: '',
      near: ''
    };
    this.getReviews = this.getReviews.bind(this);
    this.createReview = this.createReview.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchRestaurant = this.searchRestaurant.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }  

  componentDidMount() {
    this.getReviews();
  }
  
  getReviews() {
    $.ajax({
      url: '/reviews',
      method: 'GET',
      success: (data) => {
        console.log(data)
        this.setState({
          reviews: data
        });
      },
      error: err => console.log(err)
    });
  }

  searchRestaurant() {
    $.ajax({
      url: '/test',
      method: 'GET',
      data: {whatToEat: this.state.whatToEat, near: this.state.near},
      success: (data) => {
        this.setState({
          restaurants: data
        });
      },
      error: () => console.log('err')
    });
  }

  createReview(restaurant, location, rating, review) {
    $.ajax({
      url: '/reviews',
      type: 'POST',
      data: {restaurant: restaurant, location: location, rating: rating, review: review},
      success: (data) => {
        console.log(data)
        this.getReviews();
      },
      error: (err) => console.log(err)
    });
  }

  deleteItem() {
    $.ajax({
        type: "delete",
        url: "/reviews", 
        dataType: "json",
        data: { restaurant: 'kfc'},
        success: () => {
          this.getReviews();
        },
        error: function () {
            console.log("error");
        }
    })
  }   

  handleChange(e) {
    const value = e.target.value;
    const name= e.target.name;
    this.setState ({
      [name]: value
    });
  }

  handleSubmit(e, restaurant, location, rating, review) {
    this.createReview(restaurant, location, rating, review);
    e.preventDefault();
  }

  handleSubmit2(e, whatToEat, near) {
    this.searchRestaurant(whatToEat, near);
    e.preventDefault();
  }


  render () {
    const {whatToEat, near} = this.state;
    return (
    <div className="container-fluid">
      <h1>What's for dinner?</h1>
      <div>
        <div className="row">
      <Form className="col-3" handleSubmit={this.handleSubmit}/>
      <div className="container col-8">
      <div>
        <div className="row">
          <div className="col-3 col border-right border-bottom">Restaurant</div>
          <div className="col-3 col border-right border-bottom">Location</div>
          <div className="col-3 col border-right border-bottom">Rating</div>
          <div className="col-3 col border-bottom">Review</div>
        </div>
      </div>
      <List reviews={this.state.reviews} delete={this.deleteItem}/>
      </div>
      </div>
      </div>
      <h1>Try something new!</h1>
      <form onSubmit={(e) => {this.handleSubmit2(e, whatToEat, near)}}>
        <label>
          What to eat? 
          <input name='whatToEat' value={whatToEat} onChange={(e)=>{this.handleChange(e)}}></input>
        </label>
        <label>
          Location:
          <input name='near' value={near} onChange={(e)=>{this.handleChange(e)}}></input>
        </label>
        <input type="submit" value="Submit"/>
      </form>
      < ListRestaurant restaurants={this.state.restaurants}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
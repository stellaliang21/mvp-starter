import React from 'react';


const test = {
  border: '3px solid #f1f1f1',
  width: '330px',
  height: '24re0px'
};

const input = {
  width: '100%',
  display: 'inline-block',
  border: '1px solid #ccc',
  boxSizing: 'border-box'
}

const inputReview = {
  width: '100%',
  display: 'inline-block',
  border: '1px solid #ccc',
  boxSizing: 'border-box'

}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      restaurant: '',
      location: '',
      rating: '',
      review: ''
    };
  }

  handleChange(e) {
    const value = e.target.value;
    const name= e.target.name;
    this.setState ({
      [name]: value
    });
  }

  render () {
    const {restaurant, location, rating, review, whatToEat, near} = this.state;
    return (
    <div style={test}>
      <form onSubmit={(e) => {this.props.handleSubmit(e, restaurant, location, rating, review)}}>
        <label>
        Restaurant Name:
         <input style={input} name='restaurant' value={restaurant} onChange={(e)=>{this.handleChange(e)}} required/>
        </label>
        <label>
          Location:
          <input style={input} name='location' value={location} onChange={(e)=>{this.handleChange(e)}} required/>
        </label>
        <label>
          Rating:
          <select style={input} name='rating' value={rating} onChange={(e)=>{this.handleChange(e)}} required>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </label>
        <label>
          Review:
          <input style={inputReview} name='review' value={review} onChange={(e)=>{this.handleChange(e)}} required/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
    )
  }
}

export default Form;
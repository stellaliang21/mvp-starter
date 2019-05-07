import React from 'react';

const picture = {
  width: '250px',
  height: '250px'
};

const info = {
  fontFamily: 'Circular, -apple-system, system-ui, Roboto, "Helvetica Neue", sans-serif',
  fontSize: '16px'
}

const test = {
  display: 'inline-block',
  paddingRight: '15px',
  paddingLeft: '15x',
  paddingTop: '50x',
}

const ListRestaurant = (props) => {
  console.log(props.restaurants)
  let ListRestaurant = props.restaurants.map(restaurant => (
    <div style={test}>
      <div style={test}>
      <h1 style={info} key={restaurant.id}>{restaurant.name} </h1>
      <div>Rating: {restaurant.rating}</div>
      <div>{restaurant.display_phone}</div>
      <div>{restaurant.location.display_address[0]}</div>
      <div>{restaurant.location.display_address[1]}</div>
      <div><a href={restaurant.url}>yelp link</a></div>
      <img style={picture} src={restaurant.image_url}></img>
      </div>
    </div>
  ));
  return (
    <div>
    <div>
      <div style={test}>
        <div style={test} >{ListRestaurant}</div>
      </div>
    </div>
    </div>
  )
}

export default ListRestaurant;
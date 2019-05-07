import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    { props.reviews.map(review => <ListItem review={review} delete={props.delete}/>)}
  </div>
)

export default List;
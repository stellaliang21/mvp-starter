import React from 'react';

const ListItem = (props) => {
    let star = <div>★★★★★</div>
    if (props.review.rating === '1') {
      star = <div>★</div>
    } else if (props.review.rating === '2') {
      star = <div>★★</div>
    } else if (props.review.rating === '3') {
      star = <div>★★★</div>
    } else if (props.review.rating === '4') {
      star = <div>★★★★</div>
    }
  return (
  
    <div>
      <div className="row">
        <div className="col-3 col border-right">{ props.review.restaurant } </div>
        <div className="col-3 col border-right">{ props.review.location }</div>
        <div className="col-3 col border-right"> { star } </div>
        <div className="col-sm col">{ props.review.review }</div>
        <button onClick={() => {props.delete()}}>x</button>
      </div>
  </div>  
  )
}

export default ListItem;
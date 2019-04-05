// import react from react node modules
import React from 'react';
import PropTypes from "prop-types";
import { formatPrice } from '../helpers';

class FishList extends React.Component {
  render() {

    const { image, name, price, desc, status } = this.props.details; 
    // Boolean true or false
    const isAvaliable = (status === 'available');
    const buttonText = isAvaliable ? 'Add To Order' : 'Sold Out'
    return (
      <li className='menu-fish'>
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button 
          disabled={!isAvaliable}
          onClick={() => this.props.addToOrder(this.props.index)}
        >
          {buttonText}
        </button>
      </li>
    )
  }
}

FishList.propTypes = {
  details: PropTypes.object.isRequired,
  index: PropTypes.string.isRequired,
  addToOrder: PropTypes.func.isRequired
};

export default FishList;
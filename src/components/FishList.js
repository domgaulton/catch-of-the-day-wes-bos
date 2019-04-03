// import react from react node modules
import React from 'react';
import { formatPrice } from '../helpers';

class FishList extends React.Component {
  render() {

    const { image, name, price, desc, status } = this.props.details;

    return (
      <li className='menu-fish'>
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button>Add to order</button>
      </li>
    )
  }
}

export default FishList;
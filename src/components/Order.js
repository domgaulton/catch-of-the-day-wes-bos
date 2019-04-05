// import react from react node modules
import React from 'react';
import PropTypes from "prop-types";
import { formatPrice } from '../helpers.js'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    // Create remove from order button as a variable
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
    const transitionSettings = {
      classNames: 'order',
      key,
      timeout: { enter: 500, exit: 500 }
    };

    if (!fish || fish.status === 'unavailable') {
      return (
        <CSSTransition { ...transitionSettings }>
          <li key={key}>
            Sorry, {fish ? fish.name : 'fish'} is no longer available {removeButton}
          </li>
        </CSSTransition>
      )
    }

    return (
      <CSSTransition { ...transitionSettings }>
        <li key={key}>
          <span>
            <TransitionGroup 
              component="span"
              className="count"
            >
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 250, exit: 250 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
           kgs of {fish.name} {removeButton}</span>
          <span className='price'>{formatPrice(count * fish.price)}</span>
        </li>
      </CSSTransition>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + (count * fish.price || 0)
      }
      return prevTotal;
    }, 0);
		return (
      <div className='order-wrap'>
        <h2>Order</h2>
        <TransitionGroup 
          className='order'
          component='ul'
        >
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className='total'>
          Total
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
	}
}

Order.propTypes = {
  fishes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  removeFromOrder: PropTypes.func.isRequired
};

export default Order;
// import react from react node modules
import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

import sampleFishes from '../sample-fishes.js'
import FishList from './FishList';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fishes: {},
      order: {},
    };
  }

  componentWillMount() {
    // Runs before <App /> is rendered
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

    // Check if there is anything in local storage
    const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`);
    if (localStorageRef) {
      // update <App />
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log({nextProps, nextState});
    localStorage.setItem(`order-${this.props.match.params.storeId}`, JSON.stringify(nextState.order));
  }

  addFish = fish => {
    // 1. Take a copy of the existing state array (... = spread array)
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish which is passed to method to that fishes array
    fishes[`fish-${Date.now()}`] = fish;
    // 3. Set the new fishes object to the existing state ({ fishes: fishes })
    this.setState({ fishes });
  }

  updateFishInventory = (key, updatedFish) => {
    // take a copy
    const fishes = {...this.state.fishes};
    // find item being updated and change it using parameters from method
    fishes[key] = updatedFish;
    // set state of whole fishes object
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder = key => {
    // 1. Take a copy of the existing state array (... = spread array)
    const order = { ...this.state.order };
    // 2. Add our new item to the order, firstly look to see if item is in order and add one or just add it brand new
    order[key] = order[key] + 1 || 1;
    // 3. Set the new fishes object to the existing state ({ order: order })
    this.setState({ order });
  }

	render() {
		return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Fish Daily!'/>
          <ul className='list-of-fishes'>
            {
              Object
                .keys(this.state.fishes)
                .map(key => 
                  <FishList 
                    key={key}
                    index={key}
                    details={this.state.fishes[key]}
                    addToOrder={this.addToOrder}
                  />)
            }
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.match.params}
        />
        <Inventory 
          addFish={this.addFish} 
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          updateFishInventory={this.updateFishInventory}
        />
      </div>
    )
	}
}

export default App;
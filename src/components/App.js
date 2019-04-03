// import react from react node modules
import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

import sampleFishes from '../sample-fishes.js'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fishes: {},
      order: {},
    };
  }

  addFish = fish => {
    // 1. Take a copy of the existing state array (... = spread array)
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish which is passed to method to that fishes array
    fishes[`fish-${Date.now()}`] = fish;
    // 3. Set the new fishes object to the existing state ({ fishes: fishes })
    this.setState({ fishes });
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    })
  }

	render() {
		return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Fish Daily!'/>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
      </div>
    )
	}
}

export default App;
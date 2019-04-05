// import react from react node modules
import React from 'react';
import PropTypes from "prop-types";
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  handleChange = (e, key) => {
    // grab current item and call it fish using fishes[key]
    const fish = this.props.fishes[key];
    // console.log(fish);
    
    // take copy of existing fish
    const updatedFish = {
      // spread the current fish item arra
      ...fish,
      // update based on computed property = []: e.g. name: fishyyyyyy
      [e.target.name]: e.target.value
    };
    // Update the fish in with the method passed down from props seen in App.js
    this.props.updateFishInventory(key, updatedFish);
  }

  renderInventory = key => {
    const fish = this.props.fishes[key]
    return (
      <div className='fish-edit' key={key}>
        <input 
          name="name" 
          type="text" 
          value={fish.name} 
          placeholder="Name"
          onChange={(e) => this.handleChange(e, key)}
        />

        <input
          name="price"
          type="text"
          value={fish.price} 
          placeholder="Price"
          onChange={(e) => this.handleChange(e, key)}
        />

        <select 
          name="status" 
          value={fish.status} 
          onChange={(e) => this.handleChange(e, key)}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea 
          name="desc"
          placeholder="Desc" 
          value={fish.desc}
          onChange={(e) => this.handleChange(e, key)} 
        />

        <input
          name="image"
          type="text"
          value={fish.image} 
          placeholder="Image"
          onChange={(e) => this.handleChange(e, key)}
        />
        <button
          onClick={() => this.props.removeFish(key)}
        >
          Remove Fish
        </button>
      </div>
      
    )
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        <AddFishForm addFish={this.props.addFish}/>
        {
          Object.keys(this.props.fishes)
            .map(this.renderInventory)
        }
        <button onClick={this.props.loadSampleFishes}>Load Sample Fish</button>
      </div>
    )
  }
}

Inventory.propTypes = {
  addFish: PropTypes.func.isRequired,
  fishes: PropTypes.object.isRequired,
  updateFishInventory: PropTypes.func.isRequired,
  loadSampleFishes: PropTypes.func.isRequired,
  removeFish: PropTypes.func.isRequired
};

export default Inventory;
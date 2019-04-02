// import react from react node modules
import React from 'react';

// named export
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  goToStore = (event) => {
    event.preventDefault();
    // Grab text value from box
    console.log(this.storeInput.value);
    // Transition to URL /store/:storeID
  }
	render() {
		return (
      <form className='store-selector' onSubmit={this.goToStore}>
        { /* How to comment */ }
        <h2>Please Enter a Store</h2>
        <input 
          type='text' 
          required 
          placeholder='Store Name' 
          defaultValue={getFunName()}
          // Can access storeInput like a prop where prop is whole HTML element and can then get the value
          ref={ (input) => { this.storeInput = input } }
        />
        <button type='submit'>Enter Store</button>
      </form>
    )
	}
}

export default StorePicker;
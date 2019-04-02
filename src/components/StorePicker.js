// import react from react node modules
import React from 'react';

// named export
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  goToStore = (event) => {
    event.preventDefault();
    // Grab text value from box
    const storeId = this.storeInput.value;
    console.log(storeId);
    // Transition to URL /store/:storeID
    this.context.router.transitionTo(`/store/${storeId}`);
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

// Set context types for StorePicker from router
StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
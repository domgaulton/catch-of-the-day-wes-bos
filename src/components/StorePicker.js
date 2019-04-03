// import react from react node modules
import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  myInput = React.createRef();

  goToStore = event => {
    event.preventDefault();
    // Grab text value from box
    const storeName = this.myInput.current.value;
    console.log(storeName);
    // Transition to URL /store/:storeID
    this.props.history.push(`/store/${storeName}`);
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
          ref={this.myInput}
        />
        <button type='submit'>Enter Store</button>
      </form>
    )
	}
}

export default StorePicker;
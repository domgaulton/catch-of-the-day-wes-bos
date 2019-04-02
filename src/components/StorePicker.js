// import react from react node modules
import React from 'react';

// named export
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
	render() {
		return (
      <form className='store-selector'>
        { /* How to comment */ }
        <h2>Please Enter a Store</h2>
        <input 
          type='text' 
          required 
          placeholder='Store Name' 
          defaultValue={getFunName()}
        />
        <button type='submit'>Enter Store</button>
      </form>
    )
	}
}

export default StorePicker;
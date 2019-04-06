// import react from react node modules
import React from 'react';
import PropTypes from "prop-types";
import AddFishForm from './AddFishForm';
import firebase from 'firebase/app';
import 'firebase/auth';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
  constructor() {
    super();
    this.state = {
      uid: null,
      owner: null
    };
  }

  componentDidMount() {
    // on page load see whether there is a user - if there is, log them in with authHandler function
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

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

  // Function taking platform in and creating new firebase authentication e.g. firebase.authgithubAuthProvider()
  authenticate = platform => {
    // console.log(platform);
    const authProvider = new firebase.auth[`${platform}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }

  emailRegister = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.pass.value
    // console.log(e.target.email.value);
    // console.log(e.target.pass.value);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        if (error) {
          console.log(error)
        }
        // // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  emailLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.pass.value
    // console.log(e.target.email.value);
    // console.log(e.target.pass.value);
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      })
      // .then(this.authHandler);
  }

  logout = async () => {
    console.log("Logging out!");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  authHandler = async authData => {
    // 1 .Look up the current store in the firebase database (where fishes are stored)
    console.log(authData)
    // base.fetch fetches data from firebase api
    const store = await base.fetch(this.props.storeId, { context: this });
    // Does it have a store.owner or just store.fishes?
    console.log(store);

    // 2. Claim it if there is no owner
    if (!store.owner) {
      // save (post) it as our own on firebase database (You'll have list of fishes and a new col called owner with user id from authData)
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }

    // 3. Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      // try both
      owner: store.owner || authData.user.uid
    });

    // Once the uid and owner match the render function below should allow users to see inventory
  };

  renderLogin = () => {
    return (
      <nav className="login">
        <h2>Inventory Login</h2>
        <p>Register</p>
        <form onSubmit={(e) => this.emailRegister(e)}>
          <input type="email" name="email" placeholder="email" />
          <input type="password" name="pass" placeholder="password" />
          <button type="submit">Register</button>
        </form>

        <p>Login</p>
        <form onSubmit={(e) => this.emailLogin(e)}>
          <input type="email" name="email" placeholder="email" />
          <input type="password" name="pass" placeholder="password" />
          <button type="submit">Log In</button>
        </form>
      </nav>
    )
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
    // logout button
    const logout = <button onClick={this.logout}>Logout!</button>
    // check if no one is logged in
    if(!this.state.uid) {
      return (
        <div>
          {this.renderLogin()}
        </div>
      )
    }
    // Check if they are owner of store
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you aren't the owner of this store</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
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
  removeFish: PropTypes.func.isRequired,
  storeId: PropTypes.string.isRequired
};

export default Inventory;
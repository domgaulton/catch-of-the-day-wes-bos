## Tips

### Lesson 1
* Use npm start to run the project
* React Developer tools for Chrome

### Lesson 2
* React Developer tools - Open Instagram or Facebook and go to React tab. Update state and see it change everywhere on page. State can have arrays with repeatable objects etc

### Lesson 3
* render function from ReactDom is a smaller function than all of ReactDom.render function normally required
* Split methods and functions into components
* export default StorePicker;
* import StorePicker into index.js

### Lesson 4
* JSX introduction - you could use `react.CreateElement(p, {className='class-name'}, 'Lorem Ipsum')` but instead we can use JSX by using the render and return methods render() { return (...)}
* `{ /* Comments in JSX */ }`

### Lesson 5
* Adding css styles via index.js. Better than doing it via public html as you can split your component styles

### Lesson 6
* Setting up an App and importing modules into App.js
* Will learn about routing later
* Ignored StorePicker.js from index.js for es lint happiness!

### Lesson 7
* If you want to pass information to a component you give it a prop (property)
* Pass it as an attribute and call it via this
* See console.log(this); inside render method
* TIP: Debug in console. Select object in React Developer Tab and then in console use `$r` e.g. `$r.props.name` (Also works for `$0` from HTML DOM Element / Tab and console!s)

### Lesson 8
* If you only need render (which includes props), you don't need a full component. Instead use a stateless function - https://reactjs.org/docs/components-and-props.html
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
* Convert component to es6 arrow function and add props to method `const Header = (props) => {`
* remove render `render() {`
* remove `this` from this.props `{this.props.tagline}`

### Lesson 9
* Routing using react router (industry standard)
* Show / Hide components in application using BrowserRouter then Match and Miss https://reacttraining.com/react-router/web/api/BrowserRouter

### Lesson 10
* Named exports - using helpers.js
* Nice for testing rather than using random keyboard strings `hasdadlanflsad`

### Lesson 11
* Use inline javascript events, no seperation of concerns
* Use function refs as React developers don't want to mess around with the DOM where possible.
* Pay attention to arrow functions in React so that we can use `this` for the class Object rather than the method!

### Lesson 12
* Need access to router
* Context (like state to hold data or props to pass data from one component to child) allows you to declare at top level and be made avaliable to lower level components
* TODO: React 16 as context isn't working

#### Branched to React 16 package
* Take package.json from here - https://github.com/wesbos/React-For-Beginners-Starter-Files/blob/master/catch-of-the-day/package.json
* Remove node_modules
* Run npm install
* Moved Router to component and imported to index.js
* Updated to Switch and Route and changed props from pattern to path
* Store picker uses `this.props.history.push` now

### Lesson 13
* State Lesson! Representation of all of the data within the application
* You edit the data and react will edit the html for you
* Again take current value rather than reading DOM - AddFishForm.js  React.createRef() as part of Lesson 12 learning - https://reactjs.org/docs/refs-and-the-dom.html
* As state is needed for inventory, menu and order put the state in the parent App.js file. Add state to app.js for fishes and the order
```jsx
  constructor(){
    super();
    this.state = {
      fishes: {},
      order: {}
    };
  }

  // ES6 arrow functions are VERY important

  addFish = fish => {
    // 1. Take a copy of the existing state array (... = spread array)
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish which is passed to method to that fishes array
    fishes[`fish-${Date.now()}`] = fish;
    // 3. Set the new fishes object to the existing state ({ fishes: fishes })
    this.setState({ fishes });
  }
```
* See notes on addFish method in App.js
* Pass function created in App.js down via props to Inventory then to AddFishForm (but now as a prop)
* Now the addFish() method is avaliable in the addFishForm, we can call it `this.props.addFish(fish);`

### Lesson 14
* Load sample fish with method on App.js and passed with props to inventory

### Lesson 15
* Display state as data
* Set up a new component and loop over the data using `Object.keys()` which returns each item in object as an array like variable to work with
* Pass each mapped object `key` and `details` which can be grabbed from the state
* Call these in the FishList component `{this.props.details.name}` and destructure if you have lots of `this.props.detail` items

### Lesson 16
* Add to order button based on state of fishes description
```js
// isAvaliable is true or false based on remainder of statement
// Written like maths equation const isAvaliable = (this.props.description.status === 'available');
const isAvaliable = this.props.description.status === 'available';
// Then set button text in terinary operator and attribute with const
const buttonText = isAvaliable ? 'Add To Order' : 'Sold Out';
// <button disabled={!isAvaliable}>{buttonText}</button>
````
* To pass variable to inline button method we can't just add it else it will run on page load. 
* `onClick={this.props.addToOrder(key)}`
* Must do es6 arrow function inline so it doesn't run on page load
* `onClick={() => this.props.addToOrder(key)}`
* But we can't access key inside the component as this is just for React so we need to update the App and pass another prop e.g. index with same value as key and use this
* `onClick={() => this.props.addToOrder(this.props.index)}`

### Lesson 17
* Building the order list. Order component needs both fishes and order state passed down
* Using `const orderIds = Object.keys(this.props.order);` takes the key (identifier) and sets it as new const orderIds
```js
const total = orderIds.reduce((prevTotal, key) => {         // reduce to get total price
  const fish = this.props.fishes[key];                      // take the 1st, 2nd etc fish from fishes state (passed as a prop)
  const count = this.props.order[key];                      // take how many times the fish is passed to the order state
  const isAvailable = fish && fish.status === 'available';  // live app so make sure it is still available as it might have gone even after adding to order
  if (isAvailable) {
    return prevTotal + (count * fish.price || 0)
  }
  return prevTotal;
}, 0);                                                      // start with 0
````
* To build out the order list we are using a method called renderOrder() which allows us to do lots with the order list (animations and dyanmic updating etc)
```jsx
<ul className='order'>
  {orderIds.map(this.renderOrder)}
  <li className='total'>
    <strong>Total</strong>
    {formatPrice(total)}
  </li>
</ul>
```

### Lesson 18
* Introduction to Firebase - https://firebase.google.com/ and componentWillMount lifestyle hook
* Using webhooks we're going to manage the fishes state via firebase database
* Create base.js file and import settings to app.js. We can get Firebase to sync only with the store state using `this.props.match.storeId` as it is created in the router and passed to App as props (see react dev tab)
* Side Note: Backup of Cloud Firestore below
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
```
* We want to change to Realtime Database and update read and write to true
```json
{
  /* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */
  "rules": {
    ".read": true,
    ".write": true
  }
}
```


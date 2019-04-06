## Tips

### To Do Later
* Login with email
* Host on heroku

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
* Update to stop console errors
```js
import firebase from 'firebase/app';
import 'firebase/database';
````

### Lesson 19
* `componentWillUpdate()` Life cycle method used when the data (props or state) changes. Pass nextProps and nextState to method which gives you updated data after event
* Using local storage to save order items you've added to browser storage (for users who are coming back)
* Have to pass order params to order component in order to access storeId and save this as key
* Using `JSON.stringify` and `JSON.parse` to add these to local storage as they can only accept stirng

### Lesson 20
* Manage Inventory list - firstly pass fishes to the inventory component
* Using `[e.target.name]: e.target.value` computed method we can select what key has been updated and change it base don updated value. Good for changing dynamic values
* Set a new method in the app.js and pass it to props then call this method

### Lesson 21
* CRUD - Create Read Update Delete (first 3 are done already)
* Delete - removeFish method and pass it to inventory via props (note firebase method of setting fish to null in app.js)
* Can use `delete` for order state as it isn't using firebase. NB - What is delete??!

### Lesson 22
* `npm run watch` which runs concurrently package (devDependency) to run server and watch .styl changes 
* react-transition-group: TransitionGroup - https://reactcommunity.org/react-transition-group/transition-group This is the wrapper so must have component
* react-transition-group: CSSTransition - https://reactcommunity.org/react-transition-group/css-transition This is the individual element(s) being transitioned - Adds the following to classNames in CSS Transition classNames ('order' in example below) `-enter` and `-enter-active` when animating then `-enter-done` when finished or adds `-exit` and `exit-active` when leaving to relative elements
```jsx
<TransitionGroup 
  className='order'
  component='ul'
>
  {
    orderIds.map({
      <CSSTransition 
        classNames='order'
        key={key}
        timeout={{ enter: 1500, exit: 1500 }}
      >
        <li key={key}>
          {list.items}
        </li>
      </CSSTransition>
    })
  }
</TransitionGroup>
```
* Must add key to each item, it doesn't show and hide it duplicates and makes a new element to add/replace before or after then removes or adds.

### Lesson 23
* Proptypes - for open source make sure others know what type (string, boolean, number, method) the props being passed should be - https://reactjs.org/docs/typechecking-with-proptypes.html List of prop types
* Import PropTypes `import PropTypes from "prop-types";` then validate your proptypes with the following;
```js
ComponentName.propTypes = {
  proptype: PropTypes.XXX.isRequired // .isRequired is optional
};
```
* Appears propTypes are optional for props on page - can we validate component props to ensure each one has a relative propType?

### Lesson 24
* Authentication Time!
* In firebase go to Authentication and select login methods - in each platform create and app and give app settings to firebase
* First thing inside render is check if there is a user assigned to the state value uid (user ID). If this is null (default value) then render the login form
```
render() {
    // check if no one is logged in
    if(!this.state.uid) {
      return (
        <div>
          {this.renderLogin()}
        </div>
      )
    }
```
* Also if they aren't the store owner don't allow them to manage inventory `if(this.state.uid !== this.state.owner)`
* Next we need to set up the authentication so import `import firebase from 'firebase';` and `import base from '../base';` to Inventory.js  and see details below
```js
  // Function taking platform in and creating new firebase authentication e.g. firebase.authgithubAuthProvider()
  authenticate = platform => {
    // console.log(platform);
    const authProvider = new firebase.auth[`${platform}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }

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
```
* ComponentDidMount lifecycle hook to check if a user is already validated (and that user is the current user) and autolog in on page load
* Logout button also uses firebase api
* Use security-rules.json to update firebase rules

### Lesson 25
* `npm run build` removes all react bits we don't need and sets up files to put on server
* css.map and js.map - sourcemap for file before its complied
* Need a server to serve index.html but need browser to figure out routing rather than looking for /store folder etc

### Lesson 26
* Using Now - https://zeit.co/now (originally node js but 2019 any application you want)
```zsh
npm install -g now now-serve
now run build
cd build
ns
```
* ns = now serve = deploy to the cloud
* We want server to serve index.html and let app manage routing (rather than looking for /store/ folder and then a store file name)
```zsh
ns ---cmd 'list ./content -s'
```
* Now serve puts our html in a folder called content on their server THEN -s = single page. Put this in package.json as a deploy command `"deploy": "ns ./build ---cmd 'list ./content -s'"` (note changing to build folder as package.json is in the catch-of-the-day root directory)
* Add OAuth domains to firebase Auth tab

### Lesson 27
* Using Github Pages - free hosting but need to define a homepage in package.json after privacy
* `"Homepage": "https://{user}.github.io/{repository}"` e.g. `"Homepage": "https://domgaulton.github.io/catch-of-the-day-wes-bos"`
* Update Router.js `<BrowserRouter basename="/catch-of-the-day-web-bos">` or pass it with variable 
```js
const repoURL = `${window.location.pathname.split('/')[1]}`
<BrowserRouter basename={repoURL}>
```
* To deploy to github
```zsh
npm run build
cd build
git init
git remote add origin git@github.com:{username}/{repository}.git
git add .
git commit -m 'Message'
git push -u origin master
```
* Update settings in repo for github pages 
* Add github.io to firebase
* Bit of a hack - github doesn't support routing, so will serve you a 404 page when looking for /store so copy index.html to 404.html and your 404 page will still serve the index page!

### Lesson 28
* Deploying to your own server. If you're using subfolder remember to manage Router.js and package.json settings as per github settings above.
* `npm run build` and using FTP client put the build folder on server
* Add URL to firebase domains
* Manage server routing to use React Router - if using apache set up a `.htaccess` file as per below
```
ReWriteBase /
ReWriteRule ^index\.html$ - [L]
ReWriteCond %{REQUEST_FILENAME} !-f
ReWriteCond %{REQUEST_FILENAME} !-d
ReWriteRule . /index.html - [L]
```
* Creates a rule that whenever you have any forward slash require filename but if nothing if found use index.html
* If you have nginx Google 'nginx single page app' and create `nginx.conf` file
```
location / {
  try_files $uri /index.html
}
```

### Lesson 29
* Arrow functions (already done throughout) to remove need to bound functions to parents `this.loadSamples = this.loadSamples.bind(this);` as an arrow function bounds to the parents but goes as follows;
```
loadSamples() {}
loadSamples = function() => {}
loadSamples = () => {}
```
* Can also remove state from constructor and put it as object in component
```js
  constructor() {
    super();
    // this.state = {
    //   fishes: {},
    //   order: {},
    // };
  }

  state = {
    fishes: {},
    order: {},
  };
```
* Move proptypes into component so no longer use App.propTypes after component but instead use static (static means don't need to call it every time) inside e.g. after declaring state - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
```js
// App.propTypes = {
//   match: PropTypes.object.isRequired
// };

static propTypes = {
  match: PropTypes.object.isRequired
};
```

### Lesson 30
* `npm run eject` - Eject from create-react-app which just gives us each individual file including dependencies (and installs them)
* Checkout branch on this repository called `EJECTED` - https://github.com/domgaulton/catch-of-the-day-wes-bos/tree/EJECTED
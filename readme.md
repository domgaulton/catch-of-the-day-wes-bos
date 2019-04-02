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



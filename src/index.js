import React from 'react';
// import render function from react-dom. Similar to import ReactDom from ReactDom but we only need render function currently
import { render } from 'react-dom';

// import css
import './css/style.css';

// import App
import App from './components/App'

// // import component StorePicker
// import StorePicker from './components/StorePicker';


// Instead of using ReactDom.render()
render(<App/>, document.querySelector('#main'))
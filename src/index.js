import React from 'react';
// import render function from react-dom. Similar to import ReactDom from ReactDom but we only need render function currently
import { render } from 'react-dom';

// import css
import './css/style.css';

// import component StorePicker
import StorePicker from './components/StorePicker';


// Instead of using ReactDom.render()
render(<StorePicker/>, document.querySelector('#main'))
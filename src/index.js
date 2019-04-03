import React from 'react';
import { render } from 'react-dom';
import Router from './components/Router';
import './css/style.css';

// Instead of using ReactDom.render()
render(<Router />, document.querySelector('#main'));

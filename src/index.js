import React from 'react';
// import render function from react-dom. Similar to import ReactDom from ReactDom but we only need render function currently
import { render } from 'react-dom';

// import css
import './css/style.css';

import App from './components/App'
import StorePicker from './components/StorePicker';
import notFound from './components/NotFound';
// React Routing functions
import { BrowserRouter, Match, Miss } from 'react-router';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern='/' component={StorePicker} />
        <Match pattern='/store/:storeId' component={App} />
        <Miss component={notFound} />
      </div>
    </BrowserRouter>
  )
}

// Instead of using ReactDom.render()
render(<Root/>, document.querySelector('#main'))
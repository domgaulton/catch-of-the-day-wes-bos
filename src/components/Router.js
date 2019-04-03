import React from 'react';
// React Routing functions
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './App'
import StorePicker from './StorePicker';
import notFound from './NotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact pattern='/' component={StorePicker} />
        <Route pattern='/store/:storeId' component={App} />
        <Route component={notFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;
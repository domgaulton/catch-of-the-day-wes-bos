import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './App';
import StorePicker from './StorePicker';
import notFound from './NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={StorePicker} />
      <Route path='/store/:storeId' component={App} />
      <Route component={notFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
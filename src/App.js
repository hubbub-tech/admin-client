import React from 'react';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Route, Switch } from 'react-router-dom';

import Navbar from './components/base/Navbar';
import Flash from './components/base/Flash';
import Footer from './components/base/Footer';

import OrdersDashboard from './components/pages/OrdersDashboard';
import OrderSummary from './components/pages/OrderSummary';
import TasksDashboard from './components/pages/TasksDashboard';

const App = () => {
  const [flashMessages, setFlashMessages] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);
  return (
    <div className="App">
      <Navbar cookies={cookies} />
      <Flash flashMessages={flashMessages} setFlashMessages={setFlashMessages} />
      <Switch>
        <Route exact path="/orders">
          <OrdersDashboard />
        </Route>
        <Route exact path="/order/summary/id=:orderId">
          <OrderSummary setFlashMessages={setFlashMessages} />
        </Route>
        <Route exact path="/tasks">
          <TasksDashboard flashMessages={flashMessages} setFlashMessages={setFlashMessages} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

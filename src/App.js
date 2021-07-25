import React from 'react';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Route, Switch } from 'react-router-dom';

import Navbar from './components/base/Navbar';
import Flash from './components/base/Flash';
import Footer from './components/base/Footer';

import OrdersDashboard from './components/pages/OrdersDashboard';

const App = () => {
  const [flashMessages, setFlashMessages] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);
  return (
    <div className="App">
      <Navbar cookies={cookies} />
      <Flash flashMessages={flashMessages} setFlashMessages={setFlashMessages} />
      <Switch>
        <Route exact path="/">
          <OrdersDashboard />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

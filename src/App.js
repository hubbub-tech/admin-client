import React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Navbar from './components/base/Navbar';
import Flash from './components/base/Flash';
import Footer from './components/base/Footer';

import Login from './components/pages/Login';
import Logout from './components/requests/Logout';
import OrdersDashboard from './components/pages/OrdersDashboard';
import OrderSummary from './components/pages/OrderSummary';
import TasksDashboard from './components/pages/TasksDashboard';
import TaskSummary from './components/pages/TaskSummary';
import ItemsDashboard from './components/pages/ItemsDashboard';
import CommandPortal from './components/pages/CommandPortal';

import Error404 from './components/static/Error404';

const App = () => {
  const hubbubId = Cookies.get('hubbubId');
  const hubbubToken = Cookies.get('hubbubToken');
  const isLoggedIn = hubbubId !== undefined && hubbubToken !== undefined;
  const [flashMessages, setFlashMessages] = useState([]);
  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} />
      <Flash flashMessages={flashMessages} setFlashMessages={setFlashMessages} />
      <Switch>
        <Route exact path="/">
          <Redirect to="/tasks" />
        </Route>
        <Route exact path="/orders">
          {isLoggedIn && <OrdersDashboard />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/items">
          {isLoggedIn && <ItemsDashboard />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/order/summary/id=:orderId">
          {isLoggedIn && <OrderSummary setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/tasks">
          {isLoggedIn && <TasksDashboard flashMessages={flashMessages} setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/task/:taskType/id=:orderId">
          {isLoggedIn && <TaskSummary flashMessages={flashMessages} setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/commands">
          {isLoggedIn && <CommandPortal setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/login">
          {!isLoggedIn && <Login setFlashMessages={setFlashMessages} />}
          {isLoggedIn && <Redirect to='/' />}
        </Route>
        <Route exact path="/logout">
          {isLoggedIn && <Logout setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route>
          <Error404 setFlashMessages={setFlashMessages }/>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

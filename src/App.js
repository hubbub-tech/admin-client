import React, { useContext } from 'react';

import {
  Route,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { FlashProvider } from './providers/FlashProvider';
import { SessionContext, SessionProvider } from './providers/SessionProvider';

import { Index as Navbar } from './base/navbar';

import { Index as Login } from './views/auth/login';
import { Index as TaskDetails } from './views/tasks/details';
import { Index as TaskFeed } from './views/tasks/feed';

import { PageNotFound } from './views/errors/E404';

import { useAnalytics } from './hooks/Analytics';
import { useCredentials } from './hooks/Credentials';


const AppProviderLayout = () => {

  const { courierId } = useContext(SessionContext);
  useAnalytics(courierId);

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_API_KEY}>
      <SessionProvider>
        <div className="App">
          <Navbar />
          <FlashProvider>

            <Outlet />

          </FlashProvider>
        </div>
      </SessionProvider>
    </GoogleReCaptchaProvider>
  );
}


const routes = createRoutesFromElements(
  <Route element={<AppProviderLayout />} errorElement={<PageNotFound />}>

    <Route exact path="/login" element={<Login />} />

    <Route exact path="/tasks/feed" loader={useCredentials} element={<TaskFeed />} />

    <Route exact path="/task/:taskId" element={<TaskDetails />} />

  </Route>
);


const router = createBrowserRouter(routes);

export const App = () => <RouterProvider router={router} />

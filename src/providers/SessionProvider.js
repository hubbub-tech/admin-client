import React from 'react';
import Cookies from 'js-cookie';

const defaultSession = {
  courierId: Cookies.get('courierId'),
  courierSessionToken: Cookies.get('courierSessionToken')
};

export const SessionContext = React.createContext(defaultSession);

export const SessionProvider = ({ children }) => {

  const courierId = Cookies.get('courierId');
  const courierSessionToken = Cookies.get('courierSessionToken');

  return (
    <SessionContext.Provider value={{ courierId, courierSessionToken }}>
      { children }
    </SessionContext.Provider>
  );
};

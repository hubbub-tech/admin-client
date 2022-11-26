import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';

export const useCredentials = () => {
  const courierId = Cookies.get('courierId');
  const courierSessionToken = Cookies.get('courierSessionToken');
  if (!courierId || !courierSessionToken) return redirect('/login');
  return;
}

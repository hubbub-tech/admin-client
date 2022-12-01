import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

import { NavbarToggleButton } from './NavbarToggleButton';
import { NavbarLink } from './NavbarLink';

import { SessionContext } from '../../providers/SessionProvider';



export const Index = () => {
  const navigate = useNavigate();

  const { courierId, courierSessionToken } = useContext(SessionContext);

  const [isOpen, setIsOpen] = useState(false);

  const defaultNavClassName = 'collapse navbar-collapse';
  const [navClassName, setNavClassName] = useState(defaultNavClassName);

  useEffect(() => {
    isOpen
      ? setNavClassName('navbar-collapse')
      : setNavClassName(defaultNavClassName);
  }, [isOpen]);

  const handleClickOpen = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      Cookies.remove('courierSessionToken');
      Cookies.remove('courierId');
    } else {
      const configs = { domain: '.hubbub.shop'};
      Cookies.remove('courierSessionToken', configs);
      Cookies.remove('courierId', configs);
      Cookies.remove('courierSessionToken');
      Cookies.remove('courierId');
    }

    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg hubbub-background">
      <div className="container-fluid">
        <a className="navbar-brand" href="/tasks">
          <h2 className="text-start text-white">Operations</h2>
        </a>

        <NavbarToggleButton isOpen={isOpen} handleClickOpen={handleClickOpen} />

        <div className={navClassName} id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavbarLink className="nav-link active fw-bold text-dark" to="/info">Info</NavbarLink>
            {(courierId && courierSessionToken)
              ? <NavbarLink className="nav-link text-dark" onClick={handleLogout}>Logout</NavbarLink>
              : <NavbarLink className="nav-link text-dark" to="/login">Login</NavbarLink>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

import { SessionContext } from '../providers/SessionProvider';
import { ItemSearchInput } from '../inputs/item-search';


const NavbarToggleButton = ({ isOpen, handleClickOpen }) => {
  return (
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded={isOpen}
      aria-label="Toggle navigation"
      onClick={handleClickOpen}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        className="bi bi-list"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>
    </button>
  );
}


export const Navbar = () => {
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
            <li className='nav-item'>
              <a className="nav-link active fw-bold text-dark" aria-current="page" href="/items/feed">Rent Now</a>
            </li>
            {(courierId && courierSessionToken) &&
              <>
                <li className='nav-item'>
                  <a className="nav-link text-dark" href="/rentals">My Rentals</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="/cart">Cart</a>
                </li>
                <li className='nav-item'>
                  <a className="nav-link text-dark" onClick={handleLogout}>Logout</a>
                </li>
              </>
            }
            {(!courierId || !courierSessionToken) &&
              <li className='nav-item'>
                <a className="nav-link text-dark" href="/login">Login</a>
              </li>
            }
          </ul>
          <ItemSearchInput />
        </div>
      </div>
    </nav>
  );
}

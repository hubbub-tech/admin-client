import React from 'react';
import { useState, useEffect } from 'react';

import SearchForm from '../forms/SearchForm';

const Navbar = ({ isLoggedIn }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  return (
    <nav className="navbar navbar-expand-lg navbar-light hubbub-background">
      <div className="container-fluid">
        <a className="navbar-brand" href="/tasks">
          <h2 className="text-start text-white">HUBBUB</h2>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${isNavCollapsed && 'collapse'} navbar-collapse`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`nav-item ${!isNavCollapsed && 'mx-auto'}`}>
              <a className="nav-link active fw-bold" aria-current="page" href="/orders">Orders</a>
            </li>
            <li className={`nav-item ${!isNavCollapsed && 'mx-auto'}`}>
              <a className="nav-link" aria-current="page" href="/items">Items</a>
            </li>
            <li className={`nav-item ${!isNavCollapsed && 'mx-auto'}`}>
              <a className="nav-link" aria-current="page" href="/commands">Commands</a>
            </li>
            <li className={`nav-item ${!isNavCollapsed && 'mx-auto'}`}>
              <a className="nav-link" aria-current="page" href="/analytics">Analytics</a>
            </li>
          </ul>
          <ul className="navbar-nav flex-row flex-wrap ms-md-auto">
            <SearchForm />
          </ul>
        </div>
      </div>
    </nav>

  );
}

export default Navbar;

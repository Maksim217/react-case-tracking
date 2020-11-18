import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.module.css';

const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <NavLink to="/" className="brand-logo">
          Tasks
        </NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/">Create</NavLink>
          </li>
          <li>
            <NavLink to="/tasks">Tasks</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

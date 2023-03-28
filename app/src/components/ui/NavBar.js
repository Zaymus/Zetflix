import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
  return (
    <div className="navbar--container">
      <Link to="/">
        <img src="/logo.png" alt="logo" />
      </Link>
      <span className="links">
        {props.children}
      </span>
    </div>
  )
}

export default NavBar;
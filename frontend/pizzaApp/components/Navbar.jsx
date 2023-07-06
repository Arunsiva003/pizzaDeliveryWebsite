import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";

const Navbar = () => {
  return (
    <div>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <section className="top-nav">
      <div>
      <Link to="/home" style={{ textDecoration: "none" }}>
          <img
            src="../../assets/images/img/logo.png" // Replace with the path to your brand logo
            alt="Brand Logo"
            width="28"
            height="28"
          />
          <span className="navbar_logoname" style={{ color: 'orange', marginLeft:'7px' }}>AmpleSlices</span>
        </Link>
      </div>
      <input id="menu-item-toggle" type="checkbox" />
      <label className="menu-item-button-container" htmlFor="menu-item-toggle">
        <div className="menu-item-button" />
      </label>
      <ul className="menu-item">
          <li>
            <Link to="/menu">
              Menu
            </Link>
          </li>
          <li>
            <Link to="/usercart">
              Cart
            </Link>
          </li>
          <li>
            <Link to="/custompizza">
              CreatePizza
            </Link>
          </li>
          <li>
            <Link to="/userprofile">Account</Link>
          </li>
          <li>
            <Link to="/">
              Logout
            </Link>
          </li>
          <li>
            <Link to="/admin">
              Admin
            </Link>
          </li>
        </ul>
    </section>
  </div>
  );
}

export default Navbar;

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    window.location.href=window.location.href
    navigate("/");
  };

  return (
    <>
      <nav>
        <ul className="menu">
          <li className="menu-list">
            <Link to="/" className="menu-a">
              Home
            </Link>
          </li>
          <li className="menu-list">
            <Link to="/cars" className="menu-a">
              Cars
            </Link>
          </li>
          <li className="menu-list">
            <Link to="/services" className="menu-a">
              Service
            </Link>
          </li>
         {localStorage.getItem('id')?( <li className="menu-list">
            <Link to="/recentbooking" className="menu-a">
              Recent Booking
            </Link>
          </li>):('')}
          <li className="menu-list">
            <Link to="/contact" className="menu-a">
              Contacts
            </Link>
          </li>
          <li className="menu-list">
            <Link to="/about" className="menu-a">
              About
            </Link>
          </li>
          {!localStorage.getItem('id') ? (<li className="menu-list">
            <Link to="/login" className="menu-a">
              Login
            </Link>
          </li>) : (
            <li className="menu-list">
          <Link onClick={logout} className="menu-a">
          Log Out
        </Link></li>
            
          
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

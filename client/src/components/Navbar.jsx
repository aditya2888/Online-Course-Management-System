import React from 'react';
import { Link } from "react-router-dom";
import "./Navbar.css";  // <--- THIS LINE IS REQUIRED TO MAKE IT WORK

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">Course Manager</div>
      
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
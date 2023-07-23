import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-item nav-title">
        DIGI USER
      </Link>
      <div className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>

        <Link to="/login" className="nav-link">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

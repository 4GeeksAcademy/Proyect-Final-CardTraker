import React from "react";
import "../../styles/index.css";
import { Link, Navigate } from "react-router-dom";

export const Header = () => {
    return(
      <div id="navHome" className= "container-fluid">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Navbar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/opportunities">Opportunities</Link>
                </li>
              </ul>
              <div className="d-grid gap-2 d-flex justify-content-end">
                <Link to="/login"><button className="btn btn-primary">Login</button></Link>
			          <Link to="/register"><button className="btn btn-info">Register</button></Link>
              </div>
            </div>
          </div>
      </nav>
    </div>
    )
};

export default Header;
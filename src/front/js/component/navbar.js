import React from "react";
import { Link } from "react-router-dom"

export const Navbar = () => {
    return(
        <nav className="navbar" style="background-color: #e3f2fd;">
            <div className="container-fluid">
                <a className="navbar-brand" to="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-link active" aria-current="page" to="#">About</Link>
                    <Link className="nav-link" to="#">Contact</Link>
                    <Link className="nav-link" to="#">Opportunities</Link>
                </div>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;
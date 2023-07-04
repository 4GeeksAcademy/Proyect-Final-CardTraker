import React from "react";
import { Link } from "react-router-dom"

export const Navbar = () => {
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" class="btn btn-outline-primary">About</button>
                    <button type="button" class="btn btn-outline-primary">Contact</button>
                    <button type="button" class="btn btn-outline-primary">Opportunities</button>
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" class="btn btn-outline-primary me-md-2">Register</button>
                    <button type="button" class="btn btn-outline-primary">Login</button>
                </div>
          </div>
        </div>
      </nav>
    )
};

export default Navbar;
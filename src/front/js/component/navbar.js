
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";



export const Navbar = () => {
    const location = useLocation();
    const { pathname } = location;

    return (
        <>
            <nav className="navbar navbar-light bg-light fixed-top pt-0">
                <div className="container">
                    <Link to="/">
                        <span className="navbar-brand mb-0 display-1" style={{color: "#DD356E", fontSize: "25px"}}>CardTracker</span>
                    </Link>
                    {pathname !== "/login" && (
                    <div className="ml-auto d-flex">
                        <Link to="/login" className="me-2">
                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn" style={{ width: "120px" }}>
                                    <div className="login100-form-bgbtn"></div>
                                        <button className="login100-form-btn">
                                            Login
                                        </button>
                                </div>
                            </div>
                        </Link>
                    </div>)}
                </div>
            </nav>
        </>
    );
};

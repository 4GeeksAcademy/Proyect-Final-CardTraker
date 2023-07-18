import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { CardReg } from "./pages/card_registration";
import { Request } from "./pages/request_reset";
import { Reset } from "./pages/reset_password";
import { CardStbReg } from "./pages/card_stablishments";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Request />} path="/request_reset" />
                        <Route element={<Reset />} path="/reset_password/:token" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<CardReg />} path="/card_registration" />
                        <Route element={<CardStbReg />} path="/card_stablishments" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>                    
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

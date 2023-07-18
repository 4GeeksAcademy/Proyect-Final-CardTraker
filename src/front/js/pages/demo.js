import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";



import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	function handle_logout() {
		actions.logout()
		navigate("/")
	}

	return (
		(store.auth === true ?  
			
		<>
			<div className="header">
                <h1 className="header-text text-center">Enlista tus tarjetas y vinculalas<br/> con un establecimiento para empezar.</h1>
                <div className="text-center">
                    <span className="txt1">
                        Con los siguientes links :)
                    </span>
					<br />
                    <Link to="/card_registration" className="txt2 ms-2">
                            <strong>Registra una nueva tarjeta</strong>
                    </Link>
					<br />
					<Link to="/card_stablishments" className="txt2 ms-2">
                            <strong>Asoscia una tarjeta a un establecimiento.</strong>
                    </Link>
                </div>
            </div>
			<div className="text-center">
				<button
					className="btn btn-danger" 
					onClick={()=>handle_logout()}>
						Logout
				</button>
			</div>
		</>
		: alert("Usted no tiene acceso a esta vista."))
	);
};

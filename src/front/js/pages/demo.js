import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../styles/admin.css";



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
			
		<div className="container" id="body">
			<ul className="list-group">
				{store.demo.map((item, index) => {
					return (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between"
							style={{ background: item.background }}>
							<Link to={"/single/" + index}>
								<span>Link to: {item.title}</span>
							</Link>
							{// Conditional render example
							// Check to see if the background is orange, if so, display the message
							item.background === "orange" ? (
								<p style={{ color: item.initial }}>
									Check store/flux.js scroll to the actions to see the code
								</p>
							) : null}
							<button className="btn btn-success" onClick={() => actions.changeColor(index, "orange")}>
								Change Color
							</button>
						</li>
					);
				})}
			</ul>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
			<Link to="/card_registration">
				<button className="btn btn-primary">Register New Card</button>
			</Link>
			<button 
				className="btn btn-danger float-end" 
				onClick={()=>handle_logout()}>
					Logout
			</button>
		</div>
		: alert("Usted no tiene acceso a esta vista."))
	);
};

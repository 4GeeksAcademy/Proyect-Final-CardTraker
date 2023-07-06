import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import CardReg from "../component/card_registration";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>	
		<CardReg/>
			<div className="text-center mt-5">
				<h1>Hello Rigo!!</h1>
				<p>
					<img src={rigoImageUrl} />
				</p>
				<div className="alert alert-info">
					{store.message || "Loading message from the backend (make sure your python backend is running)..."}
				</div>
				<Link to="/login"><button className="btn btn-primary">Login</button></Link>
			<Link to="/register"><button className="btn btn-info">Register</button></Link>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>

		</>

	);
};

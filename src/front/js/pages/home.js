import React, { useContext } from "react";
import { Context } from "../store/appContext";
<<<<<<< HEAD
=======
import { Link, Navigate } from "react-router-dom";
>>>>>>> 04f015d27cd95949da55ae6839f202e380c8e37c
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
<<<<<<< HEAD
=======
			<Link to="/login"><button className="btn btn-primary">Login</button></Link>
>>>>>>> 04f015d27cd95949da55ae6839f202e380c8e37c
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};

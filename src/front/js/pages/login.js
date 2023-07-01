import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const {actions, store} = useContext(Context)
	
	function sendData(e){
		e.preventDefault();
		actions.login(email, password);
	}

	return (
		<>
		<div className="main d-flex h-100">
			<div className="col-md-6 col-sm-12 m-auto">
				<div className="login-form">
                	<h3 className="text-center mb-3"><strong>Login Page</strong></h3>
					{store.auth === true ? <Navigate to='/demo'/> : 
					<form onSubmit={sendData}>
						<div className="form-group">
							<label className="form-label">Email</label>
							<input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" placeholder="Email"/>
						</div>
						<div className="form-group">
							<label className="form-label">Password</label>
							<input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" placeholder="Password"/>
						</div>
						<button type="submit" className="btn btn-black">Login</button>
						{/* <Link to="/form"><button className="btn btn-secondary">Register</button></Link> */}
					</form>}
				</div>
			</div>
		</div>
		</>
	);
};

import React, { useContext, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const {actions, store} = useContext(Context);
	
	function sendData(e){
		e.preventDefault();
		actions.login(email, password);
	}

	return (
		<>
		<div className="limiter">
			<div className="container-login100">
				<div className="wrap-login100">
				{store.flashMessage && (
					<div className="flash-error-message">{store.flashMessage}</div>
				)}
				{store.auth === true ? <Navigate to='/demo'/> :
					<form className="login100-form validate-form" onSubmit={sendData}>
						<span className="login100-form-title p-b-26">
							Login Page
						</span>
						<span className="login100-form-title p-b-48">
							<i className="zmdi zmdi-font"></i>
						</span>
						<div className="wrap-input100 validate-input" data-validate = "Valid email is: a@b.c">
							<input 
								value={email} 
								onChange={(e)=>setEmail(e.target.value.toLowerCase())}
								className={`input100 ${email.trim() !== '' ? 'has-val' : ''}`} 
								type="email" 
								name="email"
							/>
							<span className="focus-input100" data-placeholder="Email"></span>
						</div>
						<div className="wrap-input100 validate-input" data-validate="Enter password">
							<span className="btn-show-pass">
								<i className="zmdi zmdi-eye"></i>
							</span>
							<input 
								value={password} 
								onChange={(e)=>setPassword(e.target.value)} 
								className={`input100 ${password.trim() !== '' ? 'has-val' : ''}`}
								type="password" 
								name="pass"
							/>
							<span className="focus-input100" data-placeholder="Password"></span>
						</div>
						<div className="container-login100-form-btn">
							<div className="wrap-login100-form-btn">
								<div className="login100-form-bgbtn"></div>
									<button type="submit" className="login100-form-btn">
										Login
									</button>
							</div>
						</div>
						<div className="text-center p-t-115">
							<span className="txt1">
								Don’t have an account? 
							</span>
							<Link to="/register" className="txt2 ms-2">
									<strong>Sign Up</strong>
							</Link>
						</div>
						<div className="text-center">
							<span className="txt1">
								Forgot your password? 
							</span>
							<Link to="/request_reset" className="txt2 ms-2">
									<strong>Recover Password</strong>
							</Link>
						</div>
					</form>
				}
				</div>
			</div>
		</div>
	</>
	);
};

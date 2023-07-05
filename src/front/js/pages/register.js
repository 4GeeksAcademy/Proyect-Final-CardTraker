import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";

export const Register = () => {
	const [email, setEmail] = useState('')
	const [user_name, setUserName] = useState('')
	const [password, setPassword] = useState('')
	const {store,actions} = useContext(Context)
	
	function sendData(e){
		e.preventDefault()
		actions.signup(email, user_name ,password);
	}

	useEffect(() => {
		console.log(store.flashMessageRegister);
	}, [store.flashMessageRegister]);

	return (
		<>
			<div className="limiter">
				<div className="container-login100">
					<div className="wrap-login100">
					{store.flashMessageRegister && (store.flashMessageRegister === "Se ha creado usuario con exito" ? 
						(<div className="flash-success-message">{store.flashMessageRegister}</div>): 
						(<div className="flash-error-message">{store.flashMessageRegister}</div>)
					)}
						<form className="login100-form validate-form" onSubmit={sendData}>
							<span className="login100-form-title p-b-26">
								Register Form
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
							<div className="wrap-input100 validate-input">
								<input 
									value={user_name} 
									onChange={(e)=>setUserName(e.target.value)}
									className={`input100 ${user_name.trim() !== '' ? 'has-val' : ''}`} 
									type="text" 
									name="user"
								/>
								<span className="focus-input100" data-placeholder="User Name"></span>
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
											Register
										</button>
								</div>
							</div>
							<div className="text-center p-t-115">
								<span className="txt1">
									You have an account? 
								</span>
								<Link to="/login" className="txt2 ms-2" onClick={store.flashMessageRegister=null}>
										<strong>Login</strong>
								</Link>
							</div>
							<div className="text-center">
								<span className="txt1">
									Forgot your password? 
								</span>
								<Link to="/reset_password" className="txt2 ms-2" onClick={store.flashMessageRegister=null}>
										<strong>Recover Password</strong>
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

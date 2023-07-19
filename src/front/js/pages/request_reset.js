import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";

export const Request = () => {
	const [email, setEmail] = useState('')
	const {store, actions} = useContext(Context)
	
	function sendData(e){
		e.preventDefault()
		actions.sendEmail(email);
	}

	return (
		<>
			<div className="limiter">
				<div className="container-login100">
					<div className="wrap-login100">
					{store.flashMessage && (store.flashMessage === "No existe este usuario, debe registrarse primero." ? 
						(<div className="flash-error-message">{store.flashMessage}</div>): 
						(<div className="flash-success-message">{store.flashMessage}</div>)
					)}
						<form className="login100-form validate-form" onSubmit={sendData}>
							<span className="login100-form-title p-b-26">
								Recover Password
							</span>
							<span className="login100-form-title p-b-48">
								<i className="zmdi zmdi-font"></i>
							</span>
							<div className="wrap-input100 validate-input" data-validate = "Valid email is: a@b.c">
								<input 
									value={email} 
									onChange={(e)=>setEmail(e.target.value.toLowerCase())}
									className={`input100 ${email.trim() !== '' ? 'has-val' : ''}`} 
									type="text" 
									name="email"
								/>
								<span className="focus-input100" data-placeholder="Email"></span>
							</div>
							<div className="container-login100-form-btn">
								<div className="wrap-login100-form-btn">
									<div className="login100-form-bgbtn"></div>
										<button type="submit" className="login100-form-btn">
											Send Email
										</button>
								</div>
							</div>
							<div className="text-center pt-4">
								<span className="txt1">
									Do you wanna try again? 
								</span>
								<Link to="/login" className="txt2 ms-2" onClick={store.flashMessage=null}>
										<strong>Login</strong>
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

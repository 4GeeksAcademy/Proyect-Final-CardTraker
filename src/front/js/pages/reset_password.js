import React, { useContext, useState, useEffect  } from "react";
import { Link, useParams, Navigate} from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";

export const Reset = () => {
	const [password, setPassword] = useState('')
	const [confrimPassword, setConfirmPassword] = useState('')
	const {store, actions} = useContext(Context)
	const { token } = useParams();

	useEffect(() => {
		actions.validateToken(token);
	  }, []);

	function sendData(e){
		e.preventDefault()
		if (password == confrimPassword){
			let newPassword = password
			actions.resetPassword(newPassword,token);
		} else alert("Las contraseñas no coinciden.")
	}

	return (
		(store.valid_token === false ? <Navigate to='/'/>:
		<>
			<div className="limiter">
				<div className="container-login100">
					<div className="wrap-login100">
					{store.flashMessagePassword && (
						<div className="flash-success-message">{store.flashMessagePassword}</div>
					)}
						<form className="login100-form validate-form" onSubmit={sendData}>
							<span className="login100-form-title p-b-26">
								Reset Password
							</span>
							<span className="login100-form-title p-b-48">
								<i className="zmdi zmdi-font"></i>
							</span>
							<div className="wrap-input100 validate-input" data-validate="Enter password">
								<input 
									value={password} 
									onChange={(e)=>setPassword(e.target.value)} 
									className={`input100 ${password.trim() !== '' ? 'has-val' : ''}`}
									type="password" 
									name="pass"
								/>
								<span className="focus-input100" data-placeholder="Password"></span>
							</div>
							<div className="wrap-input100 validate-input" data-validate="Enter password">
								<input 
									value={confrimPassword} 
									onChange={(e)=>setConfirmPassword(e.target.value)} 
									className={`input100 ${confrimPassword.trim() !== '' ? 'has-val' : ''}`}
									type="password" 
									name="pass"
								/>
								<span className="focus-input100" data-placeholder="Confirm Password"></span>
							</div>
							<div className="container-login100-form-btn">
								<div className="wrap-login100-form-btn">
									<div className="login100-form-bgbtn"></div>
										<button type="submit" className="login100-form-btn">
											Send Request
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
		)
	);
};

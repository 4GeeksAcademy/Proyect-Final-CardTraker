import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { Component, useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";


export const CardReg = () => {

    const [provider, setProvider]=useState("")
    const [lastFour, setLastFour]=useState("")
    const [bankName, setBankName]=useState("")
    const [userID, setUserID]=useState("")
    const { store, actions } = useContext(Context);
	const navigate = useNavigate()


    function createCard(e){
       e.preventDefault()
       console.log('send card')
       console.log(provider, lastFour, bankName, userID)
       actions.addCard(provider, lastFour, bankName, userID)
    }

    function getUser(e){
        e.preventDefault()
        actions.getUserID()
    }
   
	function handle_logout() {
		actions.logout()
		navigate("/")
	}
  

	console.log(store.auth)

	return (store.auth === true ? 
        <>
        <div>
=========
            <button 
                className="btn btn-danger" 
                onClick={()=>handle_logout()}>
                    Logout
            </button>

            <form>
                <div className="container position-absolute top-50 start-50 translate-middle" >
                    <div className="form-row mx-auto">
                        <div className="form-group col-md-6 mx-auto">
                        <label for="cardProvider">Card Provider</label>
                        <input type="text" className="form-control" id="cardProvider" placeholder="Card Provider" 
                        value={provider}
                        onChange={(e)=>setProvider(e.target.value)}/>
                        </div>
                        <div className="form-group col-md-6 mx-auto">
                        <label for="lastDigits">Last Four Digits of the Card</label>
                        <input type="number" className="form-control" id="LastDigits" placeholder="1234"  
                        value={lastFour}
                        onChange={(e)=>setLastFour(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-group col-md-6 mx-auto">
                        <label for="inputAddress">Bank Name</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="Bank Name"
                        value={bankName}
                        onChange={(e)=>setBankName(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-6 mx-auto">
                    <div className="container-login100-form-btn">
							<div className="wrap-login100-form-btn">
								<div className="login100-form-bgbtn"></div>
									<button type="submit" className="login100-form-btn" onClick={createCard}>
										Add Card
									</button>
							</div>
						</div>                    
                    <Link to="/">
                        <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn"></div>
                                        <button type="submit" className="login100-form-btn">
                                        Back home
                                        </button>
                                </div>
                        </div>
                                                
                    </Link>                  
                    
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <label for="inputAddress">Bank Name</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="Bank Name"
                    value={bankName}
                    onChange={(e)=>setBankName(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={createCard}>Add Card</button>
                <button className="btn btn-primary" onClick={getUser}>Get User</button>
            </form>
            <Link to="/">
            <button className="btn btn-primary">Back home</button>
        </Link>
        <button 
            className="btn btn-danger float-end" 
            onClick={()=>handle_logout()}>
                Logout
        </button>
    </div>
=========
                           
        
            
        

        </>
        : alert("Usted no tiene acceso a esta vista."))
    
};


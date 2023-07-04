import React, { Component, useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";

const CardReg =()=>{

    const [provider, setProvider]=useState("")
    const [lastFour, setLastFour]=useState("")
    const [bankName, setBankName]=useState("")
    const [userID, setUserID]=useState("")
    const {actions}=useContext(Context)

    function createCard(e){
       e.preventDefault()
       console.log('send card')
       console.log(provider, lastFour, bankName, userID)
       actions.addCard(provider, lastFour, bankName, userID)
    }


	return (
    <form>
        <div className="form-row">
            <div className="form-group col-md-6">
            <label for="cardProvider">Card Provider</label>
            <input type="text" className="form-control" id="cardProvider" placeholder="Card Provider" 
            value={provider}
            onChange={(e)=>setProvider(e.target.value)}/>
            </div>
            <div className="form-group col-md-6">
            <label for="lastDigits">Last Four Digits of the Card</label>
            <input type="number" className="form-control" id="LastDigits" placeholder="1234" min="1" 
            value={lastFour}
            onChange={(e)=>setLastFour(e.target.value)}/>
            </div>
        </div>
        <div className="form-group col-md-6">
            <label for="inputAddress">Bank Name</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="Bank Name"
            value={bankName}
            onChange={(e)=>setBankName(e.target.value)}/>
        </div>
        <div className="form-group col-md-6">
            <label for="userID">User ID</label>
            <input type="number" className="form-control" id="userID" placeholder="user ID" min="1"
            value={userID}
            onChange={(e)=>setUserID(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={createCard}>Add Card</button>
    </form>)
    
};
export default CardReg;


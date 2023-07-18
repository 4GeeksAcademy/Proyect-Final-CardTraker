import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";



export const Home = () => {
	const [currencyChange, setCurrencyChange] = useState('')
	const [amount, setAmount] = useState('')
	const { store, actions } = useContext(Context);

	function exchange(e){
		e.preventDefault();
		actions.getExchangeRates(currencyChange);
		const rate = store.exchangeRate
		console.log(rate);
	}

	return (
		<>		
			<div className="text-center mt-5">
				<h1>Hello Rigo!!!!!</h1>
				<p>
					<img src={rigoImageUrl} />
				</p>
				<div className="alert alert-info">
					{store.message || "Loading message from the backend (make sure your python backend is running)..."}
				</div>
				<Link to="/login"><button className="btn btn-primary">Login</button></Link>
				<Link to="/register"><button className="btn btn-info">Register</button></Link>
				<button className="btn btn-danger" onClick={actions.getExchangeRates}>Exchange Rates</button>
				<form onSubmit={exchange}>
					<div className="form-row">
						<div className="form-group col-md-6">
						<label for="cardProvider">Currency Symbol</label>
						<input type="text" className="form-control" id="cardProvider" placeholder="Card Provider" 
						value={currencyChange}
						onChange={(e)=>setCurrencyChange(e.target.value)}/>
						</div>
						<div className="form-group col-md-6">
						<label for="lastDigits">Last Four Digits of the Card</label>
						<input type="number" className="form-control" id="LastDigits" placeholder="1234" min="1" 
						value={amount}
						onChange={(e)=>setAmount(e.target.value)}/>
						</div>
					</div>
					{/* <div className="form-group col-md-6">
						<label for="inputAddress">Bank Name</label>
						<input type="text" className="form-control" id="inputAddress" placeholder="Bank Name"
						value={bankName}
						onChange={(e)=>setBankName(e.target.value)}/>
					</div> */}
					<button type="submit" className="btn btn-primary">Get Amount</button>
				</form>
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

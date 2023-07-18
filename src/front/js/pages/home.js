import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import cards from "../../img/cards.jpeg"
import stores from "../../img/tiendas.jpg"
import benefits from "../../img/benefits.jpg"



export const Home = () => {
	const [currencyChange, setCurrencyChange] = useState('')
	const [amount, setAmount] = useState('')
	const [newValue, setNewValue] = useState('')
	const { store, actions } = useContext(Context);

	async function exchange(e){
		e.preventDefault();
		console.log("currencyChange" + currencyChange);
		await actions.getExchangeRates(currencyChange);
		const rate = store.exchangeRate
		console.log("rate" + rate);
		const newValue = rate * amount
		console.log("Nuevo valor "+newValue);
		setNewValue(newValue)
	}

	

	return (
		<>		
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
				<button className="btn btn-danger" onClick={actions.getExchangeRates}>Exchange Rates</button>
				<form onSubmit={exchange}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<div class="form-floating">
								<select
									class="form-select py-0 card-description"
									id="floatingSelect"
									value={currencyChange}
									onChange={(e) => setCurrencyChange(e.target.value)}>
									<option selected>Select the currency you want to change</option>
									<option value="USD">USD</option>
									<option value="EUR">EUR</option>
									<option value="CAD">CAD</option>
								</select>
							</div>
						</div>
						<div className="form-group">
							<label className="m-3 card-description" for="Cops">Valor en Pesos Colombianos</label>
							<input type="money" className="form-control text-center" id="Cops" placeholder="$2000"
							value={amount}
							onChange={(e)=>setAmount(e.target.value)}
							/>
						</div>
					</div>
					{newValue == '' ? '' : 
					<div className="form-group text-center m-2">
						<label className="m-2 card-description" for="inputAddress">Valor en {currencyChange}</label>
						<p className="m-2 card-description">{newValue}</p>
					</div>}
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

import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";



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
			<div class="header">
				<h1 class="header-text text-center">"Aquel que sabe gastar y ahorrar es el más feliz,<br/> porque logra disfrutar de ambas cosas." <br/> -Samuel Johnson-</h1>
				<div className="text-center">
					<span className="txt1">
						No lo dudes mas he inscribite :)
					</span>
					<Link to="/register" className="txt2 ms-2">
							<strong>Sign Up</strong>
					</Link>
				</div>
			</div>


			<div class="card-container my-2">
				<div class="card">
					<h2 class="card-title">Controla tus tarjetas de credito</h2>
					<p class="card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</div>
				<div class="card">
					<h2 class="card-title">Mira en que lugares la tienes vinculadas</h2>
					<p class="card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</div>
			</div>
			<div class="card-container my-2">
				<div class="card">
					<h2 class="card-title">Revisa que tasa te combran por compras internacionales</h2>
					<form onSubmit={exchange}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<div class="form-floating">
								<select
									class="form-select"
									id="floatingSelect"
									aria-label="Floating label select example"
									value={currencyChange}
									onChange={(e) => setCurrencyChange(e.target.value)}>
									<option selected>Select the currency you want to change</option>
									<option value="USD">USD</option>
									<option value="EUR">EUR</option>
									<option value="CAD">CAD</option>
								</select>
								<label for="floatingSelect">Currency</label>
							</div>
						</div>
						<div className="form-group col-md-6">
							<label for="Cops">COPs</label>
							<input type="number" className="form-control" id="Cops" placeholder="1234" min="1" 
							value={amount}
							onChange={(e)=>setAmount(e.target.value)}/>
						</div>
					</div>
					{newValue == '' ? '' : 
					<div className="form-group col-md-6">
						<label for="inputAddress">Valor en {currencyChange}</label>
						<p>{newValue}</p>
					</div>}
					<button type="submit" className="btn btn-primary">Get Amount</button>
					</form>
				</div>
				<div class="card">
					<h2 class="card-title">Averigua que beneficios tienen tus tarjetas</h2>
					<p class="card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</div>
			</div>
		</>

	);
};

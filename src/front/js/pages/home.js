import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
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
			<div class="header">
				<h1 class="header-text text-center">"Aquel que sabe ahorrar y gastar es el más feliz,<br/> porque logra disfrutar de ambas cosas." <br/> -Samuel Johnson-</h1>
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
					<h2 class="card-title">Ten mas control sobre tus tarjetas de credito</h2>
					<div className="row">
						<img src={cards} className="col-6 p-0" />
						<p className="card-description col-6 align-middle">Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</div>
				</div>
				<div class="card">
					<h2 class="card-title">Mira en que lugares la tienes vinculadas</h2>
					<div className="row">
						<img src={stores} className="col-6 p-0" />
						<p className="card-description col-6 align-middle">Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</div>
				</div>
			</div>

			<div class="card-container my-2">
				<div class="card">
					<h2 class="card-title">Revisa que tasa te combran por compras internacionales</h2>
					<form onSubmit={exchange}>
					<div className="form-row m-2">
						<div className="form-group">
							<div class="form-floating m-2">
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
					<button type="submit" className="btn boton m-2">Hacer Cambio</button>
					</form>
				</div>
				<div class="card">
					<h2 class="card-title">Averigua que beneficios tienen tus tarjetas</h2>
					<div className="row">
						<img src={benefits} className="col-6 p-0" />
						<p className="card-description col-6 align-middle">Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</div>
				</div>
			</div>
		</>

	);
};

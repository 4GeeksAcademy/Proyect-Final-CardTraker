import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { Component, useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";

export const CardStbReg = () => {

        const {actions, store} = useContext(Context);
        
        useEffect(() => {
          actions.getUserStablishments();
          actions.getUserCards();          
        }, []);


        const [card, setCard] = useState('');
        const [stablishment, setStablishment] = useState('');

      
        const handleCardChange = (event) => {
          setCard(event.target.value);
        };
        const handleStablishmentChange = (event) => {
          setStablishment(event.target.value);
        };
        function createCardStb(e){
          e.preventDefault()
          console.log('send create relationship')
          console.log(card, stablishment)
          actions.addCardStb(card, stablishment)
        };
       
        
        return (store.auth === true ? 
          <>
            <div className="row">
            <select value={card} onChange={handleCardChange}> 
              <option value="">Select a Card</option> 
              {store.cards == ""
              ?
                <option className="text-white text-center">No Cards</option>
              :
                store.cards.map((item,id) => <option value={item.id} >{item.bank_name + " " +item.card_provider+ " " +item.last_four + "id " + item.id}</option>)
              }               
              
            </select>
            </div>
            <p>Selected value: {card}</p>
            
            <select value={stablishment} onChange={handleStablishmentChange} >
              <option value="">Select an establishment</option>
              {store.stablishments == ""
              ?
                <option className="text-white text-center">No Stablishments</option>
              :
                store.stablishments.map((item,id) => <option value={item.id}>{item.stablishments}</option>)
              }       
            </select>
            <p>Selected value: {stablishment}</p>
            <button type="submit" className="btn btn-primary" onClick={createCardStb}>Link establishment to Card</button>
          </>          
        : alert("Usted no tiene acceso a esta vista."));        
      };


	

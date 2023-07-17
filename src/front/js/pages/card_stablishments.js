import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { Component, useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";

export const CardStbReg = () => {

        const {actions, store} = useContext(Context);
        
        useEffect(() => {
          actions.getUserStablishments();
          console.log("prueba")
          console.log(store.adminStablishments)
          console.log("prueba1")
        }, []);

        
        const [card, setCard] = useState('');
        const [stablishment, setStablishment] = useState('');
      
        const handleCardChange = (event) => {
          setCard(event.target.value);
        };
        const handleStablishmentChange = (event) => {
          setStablishment(event.target.value);
        };
      
        return (
          <>
            <div className="row">
            <select value={card} onChange={handleCardChange}>
              <option value="">Select a Card</option>              
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            </div>
            <p>Selected value: {card}</p>
            
            <select value={stablishment} onChange={handleStablishmentChange}>
              <option value="">Select an establishment</option>
              {store.stablishments == ""
              ?
                <option className="text-white text-center">No Stablishments</option>
              :
                store.stablishments.map((item,id) => <option>{item.stablishments}</option>)
              }       
            </select>
            <p>Selected value: {stablishment}</p>
          </>
        );
      };


	

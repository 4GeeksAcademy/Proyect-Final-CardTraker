import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";

export const Admin = () => {
    const [nameStablishment, setnameStablishment] = useState('')
    const [linkStablishment, setlinkStablishment] = useState('')
        
    function sendData(e){
		e.preventDefault()
        console.log(nameStablishment)
        console.log(linkStablishment)

        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "codespaces_correlation_id=f3f298182028ef00c9bca384497778ff");

var raw = JSON.stringify({
  "name": nameStablishment,
  "link": linkStablishment,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://julian19028-potential-meme-w6x9q9qg9pjh557r-3001.preview.app.github.dev/api/stablishments/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
	}


    
}

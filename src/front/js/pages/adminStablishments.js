import React, { useContext, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";

export const Admin = () => {
  const [stablishments_name, setstablishments_name] = useState('');
	const [stablishments_links, setstablishments_links] = useState('');
	const {actions, store} = useContext(Context);
  console.log(stablishments_name)
	
  function sendData(e){
		e.preventDefault();
		actions.adminStablishments(stablishments_name, stablishments_links);
	}

  useEffect(() => {
		actions.getStablishments();
    console.log("prueba")
    console.log(store.adminStablishments)
    console.log("prueba1")
	}, []);

  return(
<>
<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">List</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Create</button>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
  {store.adminStablishments == ""
				?
				<li className="text-white text-center">No Stablishments</li>
				:
					store.adminStablishments.map((id) => {
						return(
							adminStablishments() 
							?
								<li key={id} className="d-flex justify-content-between align-items-center bookmark-remove-none"><Link to={"/stablishments/"+(id+1)}>{stablishments_name} </Link><i className="far fa-trash-alt text-danger d-inline mx-2" role="button" onClick={()=> actions.adminStablishments(id)}></i></li>
							:
								<li key={id} className="d-flex justify-content-between align-items-center bookmark-remove-none"><Link to={"/stablishments/"+(id+1)}>{stablishments_name} </Link><i className="far fa-trash-alt text-danger d-inline mx-2" role="button" onClick={()=> actions.adminStablishments(id)}></i></li>
					)})
				}
  </div>
  <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
      <form onSubmit={sendData}>
      <div class="mb-3">
        <label for="exampleInputName1" class="form-label">Stablishments name</label>
        <input type="Name" 
        class="form-control"
        id="exampleInputName1" 
        aria-describedby="emailHelp"
        value={stablishments_name} 
								onChange={(e)=>setstablishments_name(e.target.value.toLowerCase())}/>
        <div id="emailHelp" class="form-text">Stablishment for User's overview</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputLink1" class="form-label">Stablishments links</label>
        <input type="Links" class="form-control" id="exampleInputLink1"
         value={stablishments_links} 
								onChange={(e)=>setstablishments_links(e.target.value.toLowerCase())}/>
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
        <label class="form-check-label" for="exampleCheck1">Status</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      </form>
  </div>
</div>
</>
      ) 
}



import React, { useContext, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/admin.css";

export const Admin = () => {
  const [stablishments_name, setstablishments_name] = useState('');
	const [stablishments_links, setstablishments_links] = useState('');

	const {actions, store} = useContext(Context);
  console.log(stablishments_name, stablishments_links)  
  console.log()
	
  function sendData(e){
		e.preventDefault();
		actions.adminStablishments(stablishments_name, stablishments_links);
    actions.getUser()
    actions.deleteStablishments(id)
	}

  useEffect(() => {
		actions.getStablishments();
    actions.getUser();
    console.log(store.adminStablishments)
	}, []);

  return(
<>

      <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
        <li class="nav-item justify-content-center" role="presentation">
          <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true"><strong>List</strong></button>
        </li>
        <li class="nav-item justify-content-center" role="presentation">
          <button class="nav-link" id="user-tab" data-bs-toggle="tab" data-bs-target="#user-tab-pane" type="button" role="tab" aria-controls="user-tab-pane" aria-selected="false"><strong>User</strong></button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false"><strong>Creator</strong></button>
        </li>
      </ul>
      <div class="tab-content " id="myTabContent">
        <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
          <div id="bg">
                <div id="stablishment-table" class="justify-content-center">
                  <table class="table" id="bg-tables">
                      <thead>
                        <tr>
                          <th scope="col"  className="text-white text-center">Stablishment name</th>
                          <th scope="col"  className="text-white text-center">Stablishment Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>  {store.stablishments == ""
                                        ?
                                        <li className="text-white text-center">No Stablishments</li>
                                        :
                                        store.stablishments.map((item) => <li className="text-white text-center"  id="bg-tables">{item.stablishments}</li>)
                                        }</td>
                          <td>  {store.stablishments == ""
                                        ?
                                        <li className="text-white text-center">No Stablishments</li>
                                        :
                                        store.stablishments.map((item,id) => <li className="text-white text-center" id="bg-tables">{item.links}</li>)
                                        }</td>
                        </tr>
                      </tbody>
                  </table>
                </div>
              </div>
          </div>
        <div class="tab-pane fade" id="user-tab-pane" role="tabpanel" aria-labelledby="user-tab" tabindex="0">
           <div id="bg">
              <div id="user-table">
                <table class="table" id="bg-tables">
                        <thead className="text-white">
                          <tr className="text-white">
                            <th scope="col" id="headers" className="text-white text-center">Users</th>
                            <th scope="col" id="headers" className="text-white text-center">Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>  {store.user == ""
                                ?
                        <li className="text-white text-center">No Users</li>
                                :
                        store.user.map((item) => <li className="text-white text-center" id="bg-tables">{item.user_name}</li>)
                                }</td>
                            <td>  {store.user == ""
                                ?
                        <li className="text-white text-center">No Users</li>
                                :
                        store.user.map((item,id) => <li className="text-white text-center" id="bg-tables">{item.email}</li>)
                                }</td>    
                          </tr>
                        </tbody>
                </table>
              </div>  
            </div>
           </div>  
        <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
          <div class="bg-dark" id="bg-body">
            <form onSubmit={sendData} id="creatorform">
            <div class="mb-3 container">
              <label for="exampleInputName1" class="form-label text-white"><strong>Stablishments name</strong></label>
              <input type="Name" 
              class="form-control"
              id="exampleInputName1" 
              aria-describedby="emailHelp"
              value={stablishments_name} 
                      onChange={(e)=>setstablishments_name(e.target.value.toLowerCase())}/>
              <div id="emailHelp" class="form-text text-white">Stablishments for User's overview</div>
            </div>
            <div class="mb-3 container">
              <label for="exampleInputLink1" class="form-label text-white"><strong>Stablishments links</strong></label>
              <input type="Links" class="form-control" id="exampleInputLink1"
              value={stablishments_links} 
                      onChange={(e)=>setstablishments_links(e.target.value.toLowerCase())}/>
            </div>
            <button type="submit" class="btn-danger justify-content-center bd-violet-rgb" id="submit"><strong>Submit</strong></button>
            </form>
          </div>  
        </div>
      </div>
      </>
    ) 
}



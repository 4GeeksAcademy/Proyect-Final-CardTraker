const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			auth: false,
			admin: false,
			flashMessage: null,
			flashMessageRegister: null,
			flashMessagePassword: null,
			valid_token: true,
			stablishments: [],
			cards:[],
		},
		actions: {
			login: (email,password) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type':'application/json'},
					body: JSON.stringify(
						{
							"email": email,
							"password": password
						}
					)
				};
				fetch(process.env.BACKEND_URL+ "/api/login", requestOptions)
					.then(response => {
						if( response.status === 200 ){
								setStore({auth: true}) // Modifico el valor de la variable auth.
								setStore({flashMessage:null})
							}
						return response.json()
					})
					.then(data => {
						if (data.msg) {
							setStore({flashMessage:data.msg});
						}
						localStorage.setItem("token", data.access_token)
						console.log(data)
					});
			},

			logout:() => {
				setStore({auth: false}) 
				localStorage.removeItem("token")
			},

			signup: (email,user_name,password) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type':'application/json'},
					body: JSON.stringify(
						{
							"email": email,
							"user_name": user_name,
							"password": password
						}
					)
				};
				fetch(process.env.BACKEND_URL +"/api/signup", requestOptions)
					.then(response => {
						return response.json().then(data => {
						if (response.ok) {
							return { status: response.status, data: data };
						} else {
							throw { status: response.status, data: data };
						}
						});
					})
				  	.then(({ status, data }) => {
						if (data.flash_message) {
						setStore({ flashMessageRegister: data.flash_message });
						}
						if (status === 200) {
							setStore({ flashMessageRegister: data.flash_message });
						  }
				  	})
					.catch(error => {
					console.error('Error:', error);
					if (error.status === 401) {
						if (error.data.flash_message) {
						setStore({ flashMessageRegister: error.data.flash_message });
						}
					}})
				},

			delete_user: (id) => {
				const requestOptions = {
					method: 'DELETE'
				  };
				  
				  fetch(process.env.BACKEND_URL + "/api/user/" + id, requestOptions)
					.then(response => response.json())
					.then(result => console.log(result))
					.catch(error => console.log('error', error));
			},
//Agregar tarjeta a db desde componente de form OK
			addCard:(card_provider,last_four,bank_name)=>{
				let token = localStorage.getItem("token")
				const requestOptions = {
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(
						{
							"card_provider":card_provider,
							"last_four":last_four,
							"bank_name":bank_name,
							"token":token
						})
					};
				  
				  
				  fetch(process.env.BACKEND_URL+"/api/cards/", requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.catch(error => console.log('error', error));

			},			
// Agregar relación entre tarjeta y establecimiento 
			addCardStb:(card_id,stb_id)=>{
				const requestOptions = {
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(
						{
							"card_id":card_id,
							"last_four":stb_id,							
						})
					};
				  
				  
				  fetch(process.env.BACKEND_URL+"/api/card_stab", requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.catch(error => console.log('error', error));

			},


			getUserID: () =>{
				let token = localStorage.getItem("token") // tengo el token codificado del usuario logeado.
				console.log(token)
				// getid(token)
			},
// Traer Establecimientos Admin
			getStablishments: async () => {
				const requestOptions = {
				method: 'GET',
				};
				let store = getStore() 
				try {
				const response = await fetch(process.env.BACKEND_URL + "/api/stablishments", requestOptions);
				const result = await response.json();
				console.log(result);
				await setStore({stablishments:result});
				console.log(store.stablishments)
				} catch (error) {
				console.log('error', error);
				}
			},
// Traer Establecimientos como usuario Ok
			getUserStablishments: async () => {		
						
				const requestOptions = {
				method: 'GET',
				};
				let store = getStore() 
				try {
				const response = await fetch(process.env.BACKEND_URL + "/api/stablishments", requestOptions);
				const result = await response.json();
				console.log(result);
				await setStore({stablishments:result});
				console.log(store.stablishments)
				} catch (error) {
				console.log('error', error);
				}
			},
// Traer tarjetas como usuario 
			getUserCards: async () => {	
				let token = localStorage.getItem("token")
				// var myHeaders = new Headers();
				// 	myHeaders.append("", "");
				// 	myHeaders.append("Authorization", "Bearer "+ token);			
				const requestOptions = {

				method: 'GET',
				headers: {Authorization:"Bearer "+token},
				
				};
				let store = getStore() 
				try {
				const response = await fetch(process.env.BACKEND_URL + "/api/cards", requestOptions);
				const result = await response.json();
				console.log(result)
				await setStore({cards:result});
				console.log(store.cards)
				} catch (error) {
				console.log('error', error);
				}
			},



			sendEmail: (email) => {
				const requestOptions = {
					method:'POST',
					headers: { 'Content-Type':'application/json'},
					body: JSON.stringify(
						{
							"email": email,
						}
					)
				};
				fetch(process.env.BACKEND_URL+"/api/request_reset", requestOptions)
				.then(response => {
					return response.json().then(data => {
					if (response.ok) {
						return { status: response.status, data: data };
					} else {
						throw { status: response.status, data: data };
					}
					});
				})
				  .then(({ status, data }) => {
					if (data.flash_message) {
					setStore({ flashMessage: data.flash_message });
					}
					if (status === 200) {
						setStore({ flashMessage: data.flash_message });
					  }
				  })
				.catch(error => {
				console.error('Error:', error);
				if (error.status === 401) {
					if (error.data.flash_message) {
					setStore({ flashMessage: error.data.flash_message });
					}
				}})
			},

			validateToken: async (token) => {
				try {
					const response = await fetch(process.env.BACKEND_URL +`/api/validate_token/${token}`);
					const data = await response.json();
					setStore({ valid_token: data.valid_token })
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			
			resetPassword: (password, token) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type':'application/json'},
					body: JSON.stringify(
						{
							"password": password
						}
					)
				};
				fetch(process.env.BACKEND_URL+"api/request_reset/"+token, requestOptions)
					.then(response => {
						return response.json().then(data => {
						if (response.ok) {
							return { status: response.status, data: data };
						} else {
							throw { status: response.status, data: data };
						}
						});
					})
				  	.then(({ status, data }) => {
						if (data.flash_message) {
						setStore({ flashMessagePassword: data.flash_message });
						}
						if (status === 200) {
							setStore({ flashMessagePassword: data.flash_message });
						  }
				  	})
					.catch(error => {
					console.error('Error:', error);
					if (error.status === 401) {
						if (error.data.flash_message) {
						setStore({ flashMessagePassword: error.data.flash_message });
						}
					}})},
			

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					// console.log("Error loading message from backend", error)
				}
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;

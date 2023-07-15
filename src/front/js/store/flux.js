const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			adminStablishments: [],
			stablishments: [],
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
			flashMessageRegister: null
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

			delete_contact: (id) => {
				const requestOptions = {
					method: 'DELETE'
				  };

				  fetch(process.env.BACKEND_URL + "/api/user/" + id, requestOptions)
					.then(response => response.json())
					.then(result => console.log(result))
					.catch(error => console.log('error', error));
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
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
			}, 

			adminStablishments: (stablishments_name,stablishments_links) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type':'application/json'},
					body: JSON.stringify(
						{
							"name": stablishments_name,
							"link": stablishments_links,  
						}
					)
				};
				fetch(process.env.BACKEND_URL+ "/api/stablishments", requestOptions)
					.then(response => response.json())
					.then(data => console.log(data))
					.catch(error => console.log('error', error));
            },

			// getStablishments: async () => {
			// 	const requestOptions = {
			// 		method: 'GET',
			// 	};
				  
			// 	await fetch(process.env.BACKEND_URL+ "/api/stablishments", requestOptions)
			// 		.then(response => response.json())
			// 		.then(result=> console.log(result))
			// 		// .then(result => setStore({adminStablishments:result}))
			// 		.catch(error => console.log('error', error));		
			// }, 

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

			// deleteStablishments: (id) => {
			// 	const requestOptions = {
			// 		method: 'DELETE'
			// 	  };

			// 	  fetch(process.env.BACKEND_URL + "/api/stablishments/" + id, requestOptions)
			// 		.then(response => response.json())
			// 		.then(result => console.log(result))
			// 		.catch(error => console.log('error', error));
			// }
			
		}
	};
};

export default getState;

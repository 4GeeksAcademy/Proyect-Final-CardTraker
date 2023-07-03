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
			admin: false
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
				fetch("https://germanebarbosa-scaling-space-train-g95wp4q4j442vxvx-3001.preview.app.github.dev/api/login", requestOptions)
					.then(response => {
						console.log(response.status); //imprimo la validacion del codigo, 200 es correcto 401 significa error.
						if( response.status === 200 ){
								setStore({auth: true}) // Modifico el valor de la variable auth.
							} else return alert("Usuario o clave incorrecto")
						return response.json()
					})
					.then(data => {
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
				fetch("https://germanebarbosa-scaling-space-train-g95wp4q4j442vxvx-3001.preview.app.github.dev/api/signup", requestOptions)
					.then(response =>response.json())
					.then(data => console.log(data));
			},
//Agregar tarjeta a db desde componente de form
			addCard:(card_provider,last_four,bank_name,card_user_id)=>{
				const requestOptions = {
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(
						{
							"card_provider":card_provider,
							"last_four":last_four,
							"bank_name":bank_name,
							"card_user_id":card_user_id 
						})
					};
				  
				  
				  fetch("https://afbeltranv-symmetrical-funicular-jjr4pvw7gp4cpxwj-3001.preview.app.github.dev/api/cards/", requestOptions)
					.then(response => response.text())
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
			}
		}
	};
};

export default getState;

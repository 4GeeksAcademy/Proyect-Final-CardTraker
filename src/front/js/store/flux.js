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
<<<<<<< HEAD
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
=======
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
>>>>>>> 04f015d27cd95949da55ae6839f202e380c8e37c
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

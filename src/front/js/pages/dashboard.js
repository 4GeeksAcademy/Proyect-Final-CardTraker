import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Dashboard = () => {
	const { store, actions } = useContext(Context);

	return (
		<div nameClass= "container-fluid">
            
        </div>
	);
};

export default Dashboard;
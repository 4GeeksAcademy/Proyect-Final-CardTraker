import React, { Component } from "react";
import { Link } from "react-router-dom"

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<a className="icon-link" href="#">
			Home
		</a>
		<span> | </span>
		<a className="icon-link" href="#">
			About
		</a>
		<span> | </span>
		<a className="icon-link" href="#">
			Contact
		</a>
		<span> | </span>
		<a className="icon-link" href="#">
			Opportunities
		</a>
		<span> | </span>
		<a className="icon-link" href="#">
			Register
		</a>
		<span> | </span>
		<a className="icon-link" href="#">
			Log in
		</a>
	</footer>
);

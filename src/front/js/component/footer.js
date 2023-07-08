import React, { Component } from "react";
import { Link } from "react-router-dom"

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<Link className="icon-link" to="/">
			Home
		</Link>
		<span> | </span>
		<Link className="icon-link" to="/about">
			About
		</Link>
		<span> | </span>
		<Link className="icon-link" to="/contact">
			Contact
		</Link>
		<span> | </span>
		<a className="icon-link" href="/opportunities">
			Opportunities
		</a>
	</footer>
);

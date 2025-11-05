import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
	const { user, logout } = useAuth();

	return (
		<nav className="navbar">
			<h1>ImageSearch</h1>
			{user && (
				<div className="user-info">
					<span>Welcome, {user.displayName}</span>
					<button onClick={logout}>Logout</button>
				</div>
			)}
		</nav>
	);
};

export default Navbar;

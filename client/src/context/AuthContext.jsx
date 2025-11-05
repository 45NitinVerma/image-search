import React, { createContext, useState, useEffect, useContext } from "react";
import { getUser, logoutUser } from "../api";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check if user is logged in on mount
		const checkUser = async () => {
			const userData = await getUser();
			setUser(userData);
			setLoading(false);
		};
		checkUser();
	}, []);

	const logout = async () => {
		await logoutUser();
		setUser(null);
	};

	const value = {
		user,
		loading,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

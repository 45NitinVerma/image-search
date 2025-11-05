import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

import axios from 'axios'; // 1. Import axios

// 2. Set base URL from Vite's environment variables
// 'import.meta.env.VITE_API_URL' will be used in production
// The fallback 'http://localhost:5000' is for your local development
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// 3. Set this globally so all requests send cookies
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<AuthProvider>
		<App />
	</AuthProvider>
);

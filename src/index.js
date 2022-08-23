import "normalize.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <StrictMode>
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	// <StrictMode/>
);

reportWebVitals();

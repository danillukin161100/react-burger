import App from "./components/app/app.jsx";
import { store } from "./services/store.js";
import "./assets/index.css";
import { BrowserRouter } from "react-router";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

const root = document.getElementById("root");

if (root !== null) {
	createRoot(root).render(
		<StrictMode>
			<BrowserRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>
		</StrictMode>
	);
}

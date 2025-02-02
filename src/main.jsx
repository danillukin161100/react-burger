import { StrictMode } from "react";
// import { compose, createStore, applyMiddleware } from "redux";
import { createRoot } from "react-dom/client";
import App from "./components/app/app.jsx";

import "./assets/index.css";

// const composeEnhancers =
// 	typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// 		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
// 		: compose;

// const enhancer = composeEnhancers();
// const store = createStore(rootReducer, enhancer);

createRoot(document.getElementById("root")).render(
	// <StrictMode>
	<App />
	// </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/app.jsx";
import { store } from "./services/store.js";
import { Provider } from "react-redux";
import "./assets/index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);

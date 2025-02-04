import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/app.jsx";
import { store } from "./services/store.js";
import { Provider } from "react-redux";
import "./assets/index.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<DndProvider backend={HTML5Backend}>
				<App />
			</DndProvider>
		</Provider>
	</StrictMode>
);

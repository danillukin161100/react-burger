import { useEffect } from "react";
import AppHeader from "../app-header/app-header.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import BurgerIngridients from "../burger-ingridients/burger-ingridients.jsx";

import styles from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loadIngridients } from "../../services/ingridients/actions.js";
import Loader from "../loader/loader.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
	const dispatch = useDispatch();
	const { loading, ingridients } = useSelector((store) => store.ingridients);

	useEffect(() => {
		dispatch(loadIngridients());
	}, []);

	return (
		<>
			<AppHeader />
			<main className={`${styles.wrap} container`}>
				{loading ? (
					<Loader fullscreen={true} />
				) : (
					<DndProvider backend={HTML5Backend}>
						<BurgerIngridients />
						<BurgerConstructor />
					</DndProvider>
				)}
			</main>
		</>
	);
}

export default App;

import { useEffect } from "react";
import AppHeader from "../app-header/app-header.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";

import styles from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loadIngredients } from "../../services/ingredients/actions.js";
import Loader from "../loader/loader.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
	const dispatch = useDispatch();
	const { loading } = useSelector((store) => store.ingredients);

	useEffect(() => {
		dispatch(loadIngredients());
	}, []);

	return (
		<>
			<AppHeader />
			<main className={`${styles.wrap} container`}>
				{loading ? (
					<Loader fullscreen={true} />
				) : (
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients />
						<BurgerConstructor />
					</DndProvider>
				)}
			</main>
		</>
	);
}

export default App;

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients.tsx";
import BurgerConstructor from "../components/burger-constructor/burger-constructor.tsx";
import styles from "./home.module.css";

export function HomePage() {
	return (
		<section className={styles.wrap}>
			<DndProvider backend={HTML5Backend}>
				<BurgerIngredients />
				<BurgerConstructor />
			</DndProvider>
		</section>
	);
}

import { useEffect, useState } from "react";
import AppHeader from "../app-header/app-header.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import BurgerIngridients from "../burger-ingridients/burger-ingridients.jsx";

import styles from "./app.module.css";
import { INGRIDIENTS_API_URL, categories } from "../../utils/data.js";

function App() {
	const [ingridientsData, setIngridientsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			setIsLoading(true);
			await fetch(INGRIDIENTS_API_URL)
				.then((res) =>
					res.ok ? res.json() : Promise.reject(`Error ${res.status}`)
				)
				.then((res) => {
					setIngridientsData(res.data);
					localStorage.setItem(
						"constructorIngridients",
						JSON.stringify(res.data)
					);
					setIsLoading(false);
				});
		} catch (error) {
			setIsLoading(false);
			console.error("Error get Data from API", error);
		}
	};

	return (
		<>
			<AppHeader />
			<div className={`${styles.wrap} container`}>
				{isLoading ? (
					"Загрузка..."
				) : (
					<>
						<BurgerIngridients
							categories={categories}
							ingridients={ingridientsData}
						/>
						<BurgerConstructor ingridients={ingridientsData} />
					</>
				)}
			</div>
		</>
	);
}

export default App;

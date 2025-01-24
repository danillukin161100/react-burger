import { useEffect, useState } from "react";
import AppHeader from "./components/app-header/app-header";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import BurgerIngridients from "./components/burger-ingridients/burger-ingridients";

import { INGRIDIENTS_API_URL, categories, constructorIngridients } from "./utils/data.js";

function App() {
	const [ingridientsData, setIngridientsData] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			await fetch(INGRIDIENTS_API_URL)
				.then((res) => res.json())
				.then((res) => {
					setIngridientsData(res.data);
				});
		} catch (error) {
			console.error("Error get Data from API", error);
		}
	};

	return (
		<>
			<AppHeader />
			<div
				className="container"
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(2, 1fr)",
				}}
			>
				<BurgerIngridients
					categories={categories}
					ingridients={ingridientsData}
				/>
				<BurgerConstructor ingridients={constructorIngridients} />
			</div>
		</>
	);
}

export default App;

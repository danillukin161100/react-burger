import { useEffect, useState } from "react";
import AppHeader from "../app-header/app-header.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import BurgerIngridients from "../burger-ingridients/burger-ingridients.jsx";

import { INGRIDIENTS_API_URL, categories, constructorIngridients } from "../../utils/data.js";

function App() {
	const [ingridientsData, setIngridientsData] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			await fetch(INGRIDIENTS_API_URL)
				.then((res) => res.ok ? res.json() : Promise.reject(`Error ${res.status}`))
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

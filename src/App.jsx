import AppHeader from "./components/app-header/app-header";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import BurgerIngridients from "./components/burger-ingridients/burger-ingridients";
import Modal from "./components/modal/modal.jsx";

import data from "./utils/data.js";

function App() {
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
					categories={data.categories}
					ingridients={data.ingridients}
				/>
				<BurgerConstructor ingridients={data.constructorIngridients} />
			</div>
		</>
	);
}

export default App;

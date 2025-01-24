import Tabs from "./tabs/tabs";
import Ingridients from "./ingridients/ingridients";
import React, { useRef, useCallback, useState, useEffect } from "react";

import styles from "./burger-ingridients.module.css";

function BurgerIngridients({ ingridients, categories, currentIngridients }) {
	const categoryRefs = new Map(
		categories.map((category) => [category.key, React.createRef()])
	);
	return (
		<div
			className={`text text_type_main-default ${styles.burgerIngridients} pt-10 pl-5 pr-5`}
		>
			<h2 className="mb-5 text text_type_main-large">Соберите бургер</h2>

			<Tabs categories={categories} categoryRefs={categoryRefs} />
			<Ingridients
				ingridients={ingridients}
				currentIngridients={currentIngridients}
				categories={categories}
				categoryRefs={categoryRefs}
			/>
		</div>
	);
}

export default BurgerIngridients;

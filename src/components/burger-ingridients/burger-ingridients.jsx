// import Categories from "./categories/categories";
import Tabs from "./categories/tabs";
import Ingridients from "./ingridients/ingridients";
import React, { useRef, useCallback, useState, useEffect } from "react";

import styles from "./burger-ingridients.module.css";

function BurgerIngridients(props) {
	const categoryRefs = new Map(
		props.categories.map((category) => [category.key, React.createRef()])
	);

	return (
		<div
			className={`text text_type_main-default ${styles.burgerIngridients} pt-10 pl-5 pr-5`}
		>
			<h2 className="mb-5 text text_type_main-large">Соберите бургер</h2>

			<Tabs categories={props.categories} categoryRefs={categoryRefs} />
			<Ingridients
				ingridients={props.ingridients}
				categories={props.categories}
				categoryRefs={categoryRefs}
			/>
		</div>
	);
}

export default BurgerIngridients;

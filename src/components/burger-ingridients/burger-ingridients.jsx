import React from "react";
import PropTypes from "prop-types";

import Tabs from "./tabs/tabs";
import Ingridients from "./ingridients/ingridients";

import styles from "./burger-ingridients.module.css";
import { ingridientType } from "../../utils/types";

function BurgerIngridients({ ingridients, categories }) {
	const categoryRefs = new Map(
		categories.map((category) => [category.key, React.createRef()])
	);
	return (
		<section
			className={`text text_type_main-default ${styles.burgerIngridients} pt-10 pl-5 pr-5`}
		>
			<h2 className="mb-5 text text_type_main-large">Соберите бургер</h2>

			<Tabs categories={categories} categoryRefs={categoryRefs} />
			<Ingridients
				ingridients={ingridients}
				categories={categories}
				categoryRefs={categoryRefs}
			/>
		</section>
	);
}

BurgerIngridients.propTypes = {
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		})
	),
	ingridients: PropTypes.arrayOf(PropTypes.shape(ingridientType)),
};

export default BurgerIngridients;

import React from "react";
import PropTypes from "prop-types";

import Tabs from "./tabs/tabs";
import Ingridients from "./ingridients/ingridients";

import styles from "./burger-ingridients.module.css";

function BurgerIngridients({ ingridients, categories,  }) {
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
				categories={categories}
				categoryRefs={categoryRefs}
			/>
		</div>
	);
}

BurgerIngridients.propTypes = {
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		})
	),
	ingridients: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
			proteins: PropTypes.number,
			fat: PropTypes.number,
			carbohydrates: PropTypes.number,
			calories: PropTypes.number,
			price: PropTypes.number.isRequired,
			image: PropTypes.string.isRequired,
			image_mobile: PropTypes.string,
			image_large: PropTypes.string.isRequired,
			__v: PropTypes.number,
		})
	),
};

export default BurgerIngridients;

import React from "react";
import PropTypes from "prop-types";

import Tabs from "./tabs/tabs";
import Ingredients from "./ingredients/ingredients";

import styles from "./burger-ingredients.module.css";
import { ingredientType } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { getModalIngredient } from "../../services/ingredients/reducer";
import { removeModalIngredient } from "../../services/ingredients/actions";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredients/ingredients-in-category/ingredient/ingredient-details/ingredient-details";

function BurgerIngredients() {
	const dispatch = useDispatch();
	const modal = useSelector(getModalIngredient);

	const modalCloseHandler = (e) => {
		e.stopPropagation();
		dispatch(removeModalIngredient());
	};

	return (
		<section className={`text text_type_main-default ${styles.burgerIngredients} pt-10 pl-5 pr-5`}>
			<h2 className="mb-5 text text_type_main-large">Соберите бургер</h2>

			<Tabs />
			<Ingredients />

			{modal && (
				<Modal
					onClose={modalCloseHandler}
					header="Детали ингридиента"
				>
					<IngredientDetails {...modal} />
				</Modal>
			)}
		</section>
	);
}

BurgerIngredients.propTypes = {
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		}),
	),
	ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)),
};

export default BurgerIngredients;

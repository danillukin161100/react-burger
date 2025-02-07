import React from "react";
import PropTypes from "prop-types";

import Tabs from "./tabs/tabs";
import Ingridients from "./ingridients/ingridients";

import styles from "./burger-ingridients.module.css";
import { ingridientType } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { getModalIngridient } from "../../services/ingridients/reducer";
import {
	removeModalIngridient,
} from "../../services/ingridients/actions";
import Modal from "../modal/modal";
import IngridientDetails from "./ingridients/ingridients-in-category/ingridient/ingridient-details/ingridient-details";

function BurgerIngridients() {
	const dispatch = useDispatch();
	const modal = useSelector(getModalIngridient);
	
	const modalCloseHandler = (e) => {
		e.stopPropagation();
		dispatch(removeModalIngridient());
	};

	return (
		<section
			className={`text text_type_main-default ${styles.burgerIngridients} pt-10 pl-5 pr-5`}
		>
			<h2 className="mb-5 text text_type_main-large">Соберите бургер</h2>

			<Tabs />
			<Ingridients />

			{modal && (
				<Modal onClose={modalCloseHandler} header="Детали ингридиента">
					<IngridientDetails {...modal} />
				</Modal>
			)}
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

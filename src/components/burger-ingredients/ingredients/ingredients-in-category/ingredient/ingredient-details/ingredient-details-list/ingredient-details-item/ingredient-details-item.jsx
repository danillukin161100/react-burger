import PropTypes from "prop-types";

import styles from "./ingredient-details-item.module.css";

function IngredientDetailsItem({ name, value }) {
	return (
		<div className="text text_type_main-default text_color_inactive">
			<span className="mb-2">{name}</span>
			<span className={`${styles.value} text text_type_digits-default`}>{value}</span>
		</div>
	);
}

IngredientDetailsItem.propTypes = {
	name: PropTypes.string,
	value: PropTypes.number,
};

export default IngredientDetailsItem;

import PropTypes from "prop-types";

import IngredientDetailsList from "./ingredient-details-list/ingredient-details-list";

import { ingredientType } from "../../../../../../utils/types";
import styles from "./ingredient-details.module.css";

function IngredientDetails(props) {
	return (
		<div className={styles.wrap}>
			<img
				src={props.image_large}
				className="mb-4"
				alt={props.name}
			/>
			<p className={`${styles.title} text text_type_main-medium`}>{props.name}</p>
			<IngredientDetailsList
				calories={props.calories}
				proteins={props.proteins}
				carbohydrates={props.carbohydrates}
				fat={props.fat}
			/>
		</div>
	);
}

IngredientDetails.propTypes = ingredientType;

export default IngredientDetails;

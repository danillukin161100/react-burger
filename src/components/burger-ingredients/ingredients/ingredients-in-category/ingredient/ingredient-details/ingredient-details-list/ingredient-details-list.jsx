import PropTypes from "prop-types";

import IngredientDetailsItem from "./ingredient-details-item/ingredient-details-item";

import { ingredientParams } from "../../../../../../../utils/data";
import styles from "./ingredient-details-list.module.css";

function IngredientDetailsList(props) {
	return (
		<div className={`${styles.wrap} mt-8`}>
			{Object.keys(props).map((key) => {
				const value = props[key];
				const name = ingredientParams[key];

				return (
					<IngredientDetailsItem
						name={name}
						value={value}
						key={key}
					/>
				);
			})}
		</div>
	);
}

IngredientDetailsList.propTypes = {
	calories: PropTypes.number,
	proteins: PropTypes.number,
	carbohydrates: PropTypes.number,
	fat: PropTypes.number,
};

export default IngredientDetailsList;

import { useSelector } from "react-redux";
import IngredientDetailsList from "./ingredient-details-list/ingredient-details-list";
import styles from "./ingredient-details.module.css";
import { getModalIngredient } from "../../../../../../services/ingredients/reducer";

function IngredientDetails() {
	const ingredient = useSelector(getModalIngredient);
	return (
		<div className={styles.wrap}>
			<img
				src={ingredient.image_large}
				className="mb-4"
				alt={ingredient.name}
			/>
			<p className={`${styles.title} text text_type_main-medium`}>{ingredient.name}</p>
			<IngredientDetailsList
				calories={ingredient.calories}
				proteins={ingredient.proteins}
				carbohydrates={ingredient.carbohydrates}
				fat={ingredient.fat}
			/>
		</div>
	);
}

export default IngredientDetails;

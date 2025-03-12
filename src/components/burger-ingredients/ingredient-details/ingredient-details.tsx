import { useSelector } from "react-redux";
import styles from "./ingredient-details.module.css";
import { getIngredientById, getModalIngredient } from "../../../services/ingredients/reducer";
import { useLocation, useParams } from "react-router";
import { NotFoundPage } from "../../../pages";

function IngredientDetails() {
	// const ingredient = useSelector(getModalIngredient);
	const { id } = useParams();
	const ingredient = useSelector((state) => getIngredientById(state, id));

	if (!ingredient) return <NotFoundPage />;

	const { state } = useLocation();
	const { calories, proteins, carbohydrates, fat } = ingredient;

	return (
		<>
			<div className={`text text_type_main-large ${styles.header} ${!state?.backgroundLocation && styles.headerPage}`}>Детали ингредиента</div>
			<div className={`${styles.wrap}`}>
				<img src={ingredient.image_large} className="mb-4" alt={ingredient.name} />
				<p className={`${styles.title} text text_type_main-medium`}>{ingredient.name}</p>

				<div className={`${styles.list} mt-8`}>
					{calories && (
						<div className="text text_type_main-default text_color_inactive">
							<span className={styles.propsTitle}>Калории,ккал</span>
							<span className={`${styles.value} text text_type_digits-default`}>{calories}</span>
						</div>
					)}
					{proteins && (
						<div className="text text_type_main-default text_color_inactive">
							<span className={styles.propsTitle}>Белки, г</span>
							<span className={`${styles.value} text text_type_digits-default`}>{proteins}</span>
						</div>
					)}
					{fat && (
						<div className="text text_type_main-default text_color_inactive">
							<span className={styles.propsTitle}>Жиры, г</span>
							<span className={`${styles.value} text text_type_digits-default`}>{fat}</span>
						</div>
					)}
					{carbohydrates && (
						<div className="text text_type_main-default text_color_inactive">
							<span className={styles.propsTitle}>Углеводы, г</span>
							<span className={`${styles.value} text text_type_digits-default`}>{carbohydrates}</span>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default IngredientDetails;

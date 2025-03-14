import PropTypes from "prop-types";
import Ingredient from "../ingredient/ingredient.tsx";
import styles from "./ingredients-in-category.module.css";
import { useSelector } from "react-redux";
import { getIngredientsByCategory, IngredientsState } from "../../../services/ingredients/reducer";
import { Category, Ingredient as IngredientInterface } from "../../../utils/types.ts";
import { RefObject } from "react";

function IngredientsInCategory(props: { category: Category; categoryRefs: Map<string, RefObject<HTMLDivElement>> }) {
	const { category, categoryRefs } = props;
	const ingredients: IngredientInterface[] = useSelector((state) => getIngredientsByCategory(state as IngredientsState, category.key));
	const categoryRef = categoryRefs.get(category.key);

	return (
		<div ref={categoryRef}>
			<h3 className="mb-6 text text_type_main-medium">{category.title}</h3>

			<div className={`${styles.list} pl-4 pr-4 pb-10`}>
				{ingredients.map((ingredient) => (
					<Ingredient key={ingredient._id} {...ingredient} />
				))}
			</div>
		</div>
	);
}

IngredientsInCategory.propTypes = {
	category: PropTypes.shape({
		key: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	}),
	categoryRefs: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]).isRequired,
};

export default IngredientsInCategory;

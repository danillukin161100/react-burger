import PropTypes from "prop-types";
import Ingredient from "./ingredient/ingredient";
import styles from "./ingredients-in-category.module.css";
import { useSelector } from "react-redux";
import { getIngredientsByCategory } from "../../../../services/ingredients/reducer";

function IngredientsInCategory(props) {
	const { category, categoryRefs } = props;
	const ingredients = useSelector((state) => getIngredientsByCategory(state, category.key));
	const categoryRef = categoryRefs.get(category.key);

	return (
		<div ref={categoryRef}>
			<h3 className="mb-6 text text_type_main-medium">{category.title}</h3>

			<div className={`${styles.list} pl-4 pr-4 pb-10`}>
				{ingredients.map((ingredient) => (
					<Ingredient
						key={ingredient._id}
						{...ingredient}
					/>
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

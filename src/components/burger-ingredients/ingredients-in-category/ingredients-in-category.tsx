import Ingredient from "../ingredient/ingredient.tsx";
import styles from "./ingredients-in-category.module.css";
import { getIngredientsByCategory } from "../../../services/ingredients/reducer";
import { Category, Ingredient as IngredientInterface } from "../../../utils/types.ts";
import { FC, RefObject } from "react";
import { useAppSelector } from "../../../hooks/index.ts";

const IngredientsInCategory: FC<{ category: Category; categoryRefs: Map<string, RefObject<HTMLDivElement>> }> = (props) => {
	const { category, categoryRefs } = props;
	const ingredients: IngredientInterface[] = useAppSelector((state) => getIngredientsByCategory(state, category.key));
	const categoryRef = categoryRefs.get(category.key);

	return (
		<div ref={categoryRef} data-testid={`ingredients-in-cat-${category.key}`}>
			<h3 className="mb-6 text text_type_main-medium">{category.title}</h3>

			<div className={`${styles.list} pl-4 pr-4 pb-10`}>
				{ingredients.map((ingredient) => (
					<Ingredient key={ingredient._id} {...ingredient} />
				))}
			</div>
		</div>
	);
};

export default IngredientsInCategory;

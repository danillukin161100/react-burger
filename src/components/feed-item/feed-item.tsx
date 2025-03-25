import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-item.module.css";
import { FC, useCallback } from "react";
import { Ingredient, Order } from "../../utils/types";
import { orderStatus } from "../../utils/data";
import { useSelector } from "react-redux";
import { getIngredientsById, IngredientsState } from "../../services/ingredients/reducer";

export const FeedItem: FC<Order> = ({ number, name, ingredients, status, createdAt }) => {
	const fullIngredients: { count: number; ingredients: Ingredient[] } = useSelector((state: IngredientsState) =>
		getIngredientsById(state, ingredients, 6)
	);

	const getSum = useCallback(() => {
		return fullIngredients.ingredients.reduce((acc, ingredient) => ingredient.price + acc, 0);
	}, [fullIngredients]);

	return (
		<div className={styles.wrap}>
			<div className={`text text_type_digits-default ${styles.number}`}>#{number}</div>
			<div className={`text_color_inactive ${styles.date}`}>
				<FormattedDate date={new Date(createdAt)} />
			</div>
			<div className={`text text_type_main-medium ${styles.title}`}>{name}</div>
			{false && <div className={styles.status}>{orderStatus[status]}</div>}

			<ul className={`${styles.ingredients} ${fullIngredients.count > 0 && styles.advanced}`} data-more={`+${fullIngredients.count}`}>
				{fullIngredients.ingredients.map((ingredient) => (
					<li key={ingredient.id} className={styles.ingredient}>
						<img src={ingredient.image} />
					</li>
				))}
			</ul>

			<div className={`text text_type_digits-default ${styles.currency}`}>
				{getSum()}
				<CurrencyIcon type="primary" />
			</div>
		</div>
	);
};

import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-item.module.css";
import { FC } from "react";
import { Ingredient, Order } from "../../utils/types";
import { orderStatus } from "../../utils/data";
import { getIngredientsById } from "../../services/ingredients/reducer";
import { Link, useLocation } from "react-router";
import { useAppSelector, useIngredientsSum } from "../../hooks";

export const FeedItem: FC<Order> = ({ number, name, ingredients, status, createdAt, isShowStatus }) => {
	const location = useLocation();
	const fullIngredients: { count: number; ingredients: Ingredient[] } = useAppSelector((state) => getIngredientsById(state, ingredients, 6));

	const getSum = useIngredientsSum(fullIngredients.ingredients);

	return (
		<Link to={`${location.pathname}/${number}`} className={styles.wrap} state={{ backgroundLocation: location }}>
			<div className={`text text_type_digits-default ${styles.number}`}>#{number}</div>
			<div className={`text_color_inactive ${styles.date}`}>
				<FormattedDate date={new Date(createdAt)} />
			</div>
			<div className={`text text_type_main-medium ${styles.title}`}>{name}</div>
			{isShowStatus && <div className={styles.status}>{orderStatus[status]}</div>}

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
		</Link>
	);
};

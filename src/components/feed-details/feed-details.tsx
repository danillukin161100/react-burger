import { FC, useEffect, useState } from "react";
import styles from "./feed-details.module.css";
import { useLocation, useParams } from "react-router";
import { useSelector } from "react-redux";
import { getOrderByNumber } from "../../services/orders/reducer";
import { useAppDispatch, useIngredientsSum } from "../../hooks";
import { getOrder } from "../../services/orders/actions";
import { Ingredient, Order, RootState } from "../../utils/types";
import { orderStatus } from "../../utils/data";
import Loader from "../loader/loader";
import { getIngredientsById, IngredientsState } from "../../services/ingredients/reducer";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderState } from "../../services/orders/reducer";

export const FeedDetails: FC = () => {
	const { id } = useParams();
	if (id === undefined) return;
	const dispatch = useAppDispatch();
	const orderFromOrders: Order | undefined = useSelector((state: OrderState) => getOrderByNumber(state, id));
	const currentOrder = useSelector((state: RootState) => state.orders.currentOrder);
	const [order, setOrder] = useState<Order | null>(null);
	const { state } = useLocation();

	const ingredientsById: { count: number; ingredients: Ingredient[] } = useSelector((state: IngredientsState) =>
		getIngredientsById(state, order?.ingredients)
	);

	const getSum = useIngredientsSum(ingredientsById?.ingredients);

	useEffect(() => {
		if (orderFromOrders !== undefined) {
			setOrder(orderFromOrders);
			return;
		}
		if (currentOrder !== null) {
			setOrder(currentOrder);
			return;
		}
		dispatch(getOrder(id));
	}, [orderFromOrders, currentOrder]);

	if (!order) {
		return <Loader fullscreen={true} />;
	}

	return (
		<div className={`text text_type_main-default ${state?.backgroundLocation ? "mt-6" : "mt-30"} ${styles.wrap}`}>
			<div className="mb-15">
				<div className={`text text_type_digits-default ${styles.number}`}>#{order.number}</div>
				<div className={`text text_type_main-medium mb-3 ${styles.title}`}>{order.name}</div>
				<div className={styles.status}>{orderStatus[order.status]}</div>
			</div>

			{ingredientsById !== undefined && (
				<>
					<div className={`text text_type_main-medium mb-6`}>Состав:</div>
					<div className={styles.list}>
						{ingredientsById.ingredients.map((ingredient) => (
							<div key={ingredient.id} className={styles.item}>
								<div className={styles.image}>
									<img src={ingredient.image} />
								</div>
								<div>{ingredient.name}</div>
								<div className={styles.price}>
									{`${ingredient.count} x ${ingredient.price}`}
									<CurrencyIcon type={"primary"} />
								</div>
							</div>
						))}
					</div>
				</>
			)}
			<div className={`${styles.footer} mt-10`}>
				<FormattedDate date={new Date(order.createdAt)} className="text_color_inactive" />
				<div className={styles.price}>
					{getSum()}
					<CurrencyIcon type={"primary"} />
				</div>
			</div>
		</div>
	);
};

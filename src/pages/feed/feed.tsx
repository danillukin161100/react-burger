import { useEffect, useRef, useState } from "react";
import { FeedItem } from "../../components/feed-item/feed-item";
import styles from "./feed.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { connect, disconnect } from "../../services/orders/actions";
import { BASE_WSS_URL } from "../../utils/data";
import { Order, RootState } from "../../utils/types";
import { getLastOrdersByStatus } from "../../services/orders/reducer";
import Loader from "../../components/loader/loader";

export const FeedPage = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [maxHeight, setMaxHeight] = useState(0);
	const dispatch = useAppDispatch();
	const { orders, total, totalToday } = useAppSelector((state: RootState) => state.orders);
	const ordersDone: Order[] = useAppSelector((state: RootState) => getLastOrdersByStatus(state, "done"));
	const ordersPending: Order[] = useAppSelector((state: RootState) => getLastOrdersByStatus(state, "pending"));

	useEffect(() => {
		dispatch(connect(`${BASE_WSS_URL}orders/all`));

		return () => {
			dispatch(disconnect());
		};
	}, []);

	useEffect(() => {
		const updateHeight = () => {
			if (ref.current === null) return;
			const newHeight = window.innerHeight - ref.current.getBoundingClientRect().top - 40;
			setMaxHeight(newHeight);
		};

		updateHeight();

		window.addEventListener("resize", updateHeight);

		return () => {
			window.removeEventListener("resize", updateHeight);
		};
	}, [ref.current]);

	if (!orders?.length) return <Loader fullscreen={true} />;

	return (
		<section className={styles.wrap}>
			<h1 className={`text text_type_main-large ${styles.title}`}>Лента заказов</h1>

			<div className={styles.feed} ref={ref} style={{ maxHeight }}>
				{orders.map((order) => (
					<FeedItem key={order._id} {...order} />
				))}
			</div>

			<div className={styles.info}>
				<div>
					<div className="text text_type_main-medium mb-6">Готовы:</div>
					<ul className={`text text_type_digits-default ${styles.numbers}`} style={{ color: "#00CCCC" }}>
						{ordersDone.map((order) => (
							<li key={order.number}>{order.number}</li>
						))}
					</ul>
				</div>
				<div>
					<div className={`text text_type_main-medium mb-6`}>В работе:</div>
					<ul className={`text text_type_digits-default ${styles.numbers}`}>
						{ordersPending.map((order) => (
							<li key={order.number}>{order.number}</li>
						))}
					</ul>
				</div>

				{total !== null && (
					<div className={styles.sumOrders}>
						<div className={`text text_type_main-medium`}>Выполнено за все время:</div>
						<span className={`text text_type_digits-large ${styles.lightingColor}`}>{total.toLocaleString("ru-RU")}</span>
					</div>
				)}

				{totalToday !== null && (
					<div className={styles.sumOrders}>
						<div className={`text text_type_main-medium`}>Выполнено за сегодня:</div>
						<span className={`text text_type_digits-large ${styles.lightingColor}`}>{totalToday.toLocaleString("ru-RU")}</span>
					</div>
				)}
			</div>
		</section>
	);
};

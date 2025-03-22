import { useEffect, useRef, useState } from "react";
import { FeedItem } from "../components/feed-item/feed-item";
import styles from "./feed.module.css";

export const FeedPage = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [maxHeight, setMaxHeight] = useState(0);

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

	return (
		<section className={styles.wrap}>
			<h1 className={`text text_type_main-large ${styles.title}`}>Лента заказов</h1>

			<div className={styles.feed} ref={ref} style={{ maxHeight }}>
				<FeedItem />
				<FeedItem />
				<FeedItem />
				<FeedItem />
				<FeedItem />
				<FeedItem />
			</div>

			<div className={styles.info}>
				<div>
					<div className="text text_type_main-medium mb-6">Готовы:</div>
					<ul className={`text text_type_digits-default ${styles.numbers}`} style={{ color: "#00CCCC" }}>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
					</ul>
				</div>
				<div>
					<div className={`text text_type_main-medium mb-6`}>В работе:</div>
					<ul className={`text text_type_digits-default ${styles.numbers}`}>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
						<li>034533</li>
					</ul>
				</div>

				<div className={styles.sumOrders}>
					<div className={`text text_type_main-medium`}>Выполнено за все время:</div>
					<span className={`text text_type_digits-large ${styles.lightingColor}`}>28 752</span>
				</div>

				<div>
					<div className={`text text_type_main-medium`}>Выполнено за сегодня:</div>
					<span className={`text text_type_digits-large ${styles.lightingColor}`}>138</span>
				</div>
			</div>
		</section>
	);
};

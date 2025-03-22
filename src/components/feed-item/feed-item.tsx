import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import bunImage from "../../assets/bun-01.png";
import styles from "./feed-item.module.css";

export const FeedItem = () => {
    const today = new Date();
	return (
		<div className={styles.wrap}>
			<div className={`text text_type_digits-default ${styles.number}`}>#034535</div>
			<div className={`text_color_inactive ${styles.date}`}>
				<FormattedDate date={new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes() - 1, 0)} />
			</div>
			<div className={`text text_type_main-medium ${styles.title}`}>Death Star Starship Main бургер</div>
			{false && <div className={styles.status}>Готовится</div>}
			<ul className={styles.ingredients} data-more="+3">
				<li className={styles.ingredient}>
					<img src={bunImage} />
				</li>
				<li className={styles.ingredient}>
					<img src={bunImage} />
				</li>
				<li className={styles.ingredient}>
					<img src={bunImage} />
				</li>
				<li className={styles.ingredient}>
					<img src={bunImage} />
				</li>
				<li className={styles.ingredient}>
					<img src={bunImage} />
				</li>
				<li className={styles.ingredient}>
					<img src={bunImage} />
				</li>
			</ul>
			<div className={`text text_type_digits-default ${styles.currency}`}>
				480
				<CurrencyIcon type="primary" />
			</div>
		</div>
	);
};

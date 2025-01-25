import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
	Counter,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../../modal/modal.jsx";
import IngridientDetails from "./ingridient-details/ingridient-details.jsx";

import styles from "./ingridient.module.css";
import { ingridientType } from "../../../../../utils/types.js";

function Ingridient(props) {
	const [count, setCount] = useState(0);
	const [currentIngridient, setCurrentIngridient] = useState(null);

	useEffect(() => {
		/**
		 * Пока не реализован функционал добавления в конструктор
		 * реализовал через localStorage в качестве временного решения
		 */
		const currentIngirdients = JSON.parse(
			localStorage.getItem("constructorIngridients")
		)?.filter((ingridient) => props._id === ingridient._id);
		setCount(currentIngirdients.length);
	}, []);

	const onClose = (e) => {
		e.stopPropagation();
		setCurrentIngridient(null);
	};

	return (
		<div
			className={styles.card}
			onClick={() => setCurrentIngridient(props)}
		>
			{count > 0 && <Counter count={count} size="default" />}
			<img
				src={props.image}
				alt={props.name}
				className="pl-4 pr-4 mb-1"
			/>
			<span
				className={`${styles.price} text text_type_digits-default mb-1`}
			>
				{props.price} <CurrencyIcon className="ml-1" />
			</span>
			<p className={`${styles.title} text text_type_main-default`}>
				{props.name}
			</p>

			{currentIngridient && (
				<Modal onClose={onClose} header="Детали ингридиента">
					<IngridientDetails {...props} />
				</Modal>
			)}
		</div>
	);
}

Ingridient.propTypes = ingridientType;

export default Ingridient;

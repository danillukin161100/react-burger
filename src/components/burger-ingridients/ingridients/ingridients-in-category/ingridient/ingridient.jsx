import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
	Counter,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../../modal/modal.jsx";
import IngridientDetails from "./ingridient-details/ingridient-details.jsx";

import styles from "./ingridient.module.css";

function Ingridient(props) {
	const [count, setCount] = useState(0);
	const [currentIngridient, setCurrentIngridient] = useState(null);

	useEffect(() => {
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

Ingridient.propTypes = {
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	proteins: PropTypes.number,
	fat: PropTypes.number,
	carbohydrates: PropTypes.number,
	calories: PropTypes.number,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	image_mobile: PropTypes.string,
	image_large: PropTypes.string.isRequired,
	__v: PropTypes.number,
};

export default Ingridient;

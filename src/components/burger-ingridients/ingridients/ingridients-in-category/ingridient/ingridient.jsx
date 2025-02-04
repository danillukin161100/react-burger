import { useEffect, useState } from "react";

import {
	Counter,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../../modal/modal.jsx";
import IngridientDetails from "./ingridient-details/ingridient-details.jsx";

import styles from "./ingridient.module.css";
import { ingridientType } from "../../../../../utils/types.js";
import { useSelector } from "react-redux";
import { getIngridientCount } from "../../../../../services/burger-constructor/reducer.js";
import { useDrag } from "react-dnd";

function Ingridient(props) {
	const count = useSelector(state => {
		getIngridientCount(state, props)
	})
	const [currentIngridient, setCurrentIngridient] = useState(null);

	const [{isDrag}, dragRef] = useDrag({
		type: 'ingridient',
		item: props,
		collect: monitor => ({
			isDrag: monitor.isDragging(),
		})
	});

	const onClose = (e) => {
		e.stopPropagation();
		setCurrentIngridient(null);
	};

	return (
		<div
			className={styles.card}
			onClick={() => setCurrentIngridient(props)}
			ref={dragRef}
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

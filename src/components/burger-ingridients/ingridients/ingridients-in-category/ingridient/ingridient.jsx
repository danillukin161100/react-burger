import { useEffect, useState } from "react";

import {
	Counter,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../../modal/modal.jsx";
import IngridientDetails from "./ingridient-details/ingridient-details.jsx";

import styles from "./ingridient.module.css";
import { ingridientType } from "../../../../../utils/types.js";
import { useDispatch, useSelector } from "react-redux";
import { getIngridientCount } from "../../../../../services/burger-constructor/reducer.js";
import { useDrag } from "react-dnd";
import { addIngridient } from "../../../../../services/burger-constructor/actions.js";
import { nanoid } from "@reduxjs/toolkit";

function Ingridient(props) {
	const dispatch = useDispatch();
	const count = useSelector((state) => {
		getIngridientCount(state, props);
	});
	const [dragId, setDragId] = useState(null);
	const [currentIngridient, setCurrentIngridient] = useState(null);

	const [isDragging, dragRef] = useDrag({
		type: "constructorIngridient",
		item: { ...props, id: dragId },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	useEffect(() => {
		setDragId(nanoid());
	}, [isDragging]);

	const onClose = (e) => {
		e.stopPropagation();
		setCurrentIngridient(null);
	};

	const contextMenuHandler = (ingridient) => {
		dispatch(addIngridient({ ...ingridient, id: nanoid() }));
	};

	return (
		<div
			className={styles.card}
			onClick={() => setCurrentIngridient(props)}
			onContextMenu={(e) => {
				e.preventDefault();
				contextMenuHandler(props);
			}}
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

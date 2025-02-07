import { useEffect, useState } from "react";

import {
	Counter,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./ingridient.module.css";
import { ingridientType } from "../../../../../utils/types.js";
import { useDispatch, useSelector } from "react-redux";
import { getIngridientCount } from "../../../../../services/burger-constructor/reducer.js";
import { useDrag } from "react-dnd";
import { addIngridient } from "../../../../../services/burger-constructor/actions.js";
import { nanoid } from "@reduxjs/toolkit";
import { setModalIngridient } from "../../../../../services/ingridients/actions.js";

function Ingridient(props) {
	const dispatch = useDispatch();
	const [dragId, setDragId] = useState(null);
	const count = useSelector((state) => {
		getIngridientCount(state, props);
	});

	const contextMenuHandler = (ingridient) => {
		dispatch(addIngridient({ ...ingridient, id: nanoid() }));
	};

	const modalOpenHandler = (e) => {
		e.stopPropagation();
		dispatch(setModalIngridient(props));
	};

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

	return (
		<div
			className={styles.card}
			onClick={(e) => {
				modalOpenHandler(e);
			}}
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
		</div>
	);
}

Ingridient.propTypes = ingridientType;

export default Ingridient;

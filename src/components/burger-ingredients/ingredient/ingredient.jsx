import { useEffect, useState } from "react";

import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./ingredient.module.css";
import { ingredientType } from "../../../utils/types.js";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientCount } from "../../../services/burger-constructor/reducer.js";
import { useDrag } from "react-dnd";
import { addIngredient } from "../../../services/burger-constructor/actions.js";
import { nanoid } from "@reduxjs/toolkit";
import { setModalIngredient } from "../../../services/ingredients/actions.js";
import { Link, useLocation } from "react-router";

function Ingredient(props) {
	const dispatch = useDispatch();
	const location = useLocation();
	const [dragId, setDragId] = useState(null);

	const count = useSelector((state) => getIngredientCount(state, props));

	const contextMenuHandler = (ingredient) => {
		dispatch(addIngredient({ ...ingredient, id: nanoid() }));
	};

	const modalOpenHandler = (e) => {
		// e.stopPropagation();
		// dispatch(setModalIngredient(props));
	};

	const [isDragging, dragRef] = useDrag({
		type: "constructorIngredient",
		item: { ...props, id: dragId },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	useEffect(() => {
		setDragId(nanoid());
	}, [isDragging]);

	return (
		<Link
			to={`/ingredients/${props._id}`}
			state={{ backgroundLocation: location }}
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
			<img src={props.image} alt={props.name} className="pl-4 pr-4 mb-1" />
			<span className={`${styles.price} text text_type_digits-default mb-1`}>
				{props.price} <CurrencyIcon className="ml-1" />
			</span>
			<p className={`${styles.title} text text_type_main-default`}>{props.name}</p>
		</Link>
	);
}

Ingredient.propTypes = ingredientType;

export default Ingredient;

import { useEffect, useState } from "react";

import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./ingredient.module.css";
import { Ingredient as IngredientInterface, ingredientType } from "../../../utils/types.ts";
import { BurgerConstructorState, getIngredientCount } from "../../../services/burger-constructor/reducer.ts";
import { useDrag } from "react-dnd";
import { addIngredient } from "../../../services/burger-constructor/actions.ts";
import { nanoid } from "@reduxjs/toolkit";
import { Link, useLocation } from "react-router";
import { useAppDispatch } from "../../../hooks/index.ts";
import { useSelector } from "react-redux";

function Ingredient(props: IngredientInterface) {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const [dragId, setDragId] = useState<null | string>(null);

	const count = useSelector((state) => getIngredientCount(state as BurgerConstructorState, props));

	const contextMenuHandler = (ingredient: IngredientInterface) => {
		dispatch(addIngredient({ ...ingredient, id: nanoid() }));
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
			onContextMenu={(e) => {
				e.preventDefault();
				contextMenuHandler(props);
			}}
			ref={dragRef}
		>
			{count > 0 && <Counter count={count} size="default" />}
			<img src={props.image} alt={props.name} className="pl-4 pr-4 mb-1" />
			<span className={`${styles.price} text text_type_digits-default mb-1`}>
				{props.price} <CurrencyIcon className="ml-1" type={"primary"} />
			</span>
			<p className={`${styles.title} text text_type_main-default`}>{props.name}</p>
		</Link>
	);
}

Ingredient.propTypes = ingredientType;

export default Ingredient;

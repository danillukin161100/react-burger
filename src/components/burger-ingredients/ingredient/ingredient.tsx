import { FC, useEffect, useState } from "react";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { Ingredient as IngredientInterface } from "../../../utils/types.ts";
import { getIngredientCount } from "../../../services/burger-constructor/reducer.ts";
import { useDrag } from "react-dnd";
import { addIngredient } from "../../../services/burger-constructor/actions.ts";
import { nanoid } from "@reduxjs/toolkit";
import { Link, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks/index.ts";

const Ingredient: FC<IngredientInterface> = (props) => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const [dragId, setDragId] = useState<null | string>(null);

	const count = useAppSelector((state) => getIngredientCount(state, props));

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
			data-testid="ingredient-card"
		>
			{count > 0 && <Counter count={count} size="default" />}
			<img src={props.image} alt={props.name} className="pl-4 pr-4 mb-1" />
			<span className={`${styles.price} text text_type_digits-default mb-1`}>
				{props.price} <CurrencyIcon className="ml-1" type={"primary"} />
			</span>
			<p className={`${styles.title} text text_type_main-default`} data-testid="ingredient-card-title">{props.name}</p>
		</Link>
	);
};

export default Ingredient;

import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-ingredient.module.css";
import { addIngredient, removeIngredient, sortIngredients } from "../../../services/burger-constructor/actions.ts";
import { useDrag, useDrop } from "react-dnd";
import { FC, useRef } from "react";
import { Ingredient } from "../../../utils/types.ts";
import { useAppDispatch } from "../../../hooks/index.ts";

const ConstructorIngredient: FC<Ingredient & { formType: "top" | "bottom" | undefined }> = (props) => {
	const dispatch = useAppDispatch();
	const ref = useRef<HTMLDivElement | null>(null);

	const removeHandler = (id: string | undefined) => {
		if (id !== undefined) dispatch(removeIngredient(id));
	};

	const [{ isDragging }, dragRef] = useDrag({
		type: "constructorIngredient",
		item: props,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, dropRef] = useDrop({
		accept: "constructorIngredient",
		hover: (item: Ingredient) => {
			dispatch(addIngredient(item));
			dispatch(sortIngredients({ item, props }));
		},
	});

	dragRef(dropRef(ref));

	const opacity = isDragging ? 0 : 1;

	return (
		<div className={styles.item} ref={ref} style={{ opacity }} data-testid={`constructor-ingredient-${props.type}`}>
			{props.type !== "bun" && <DragIcon type={"primary"} />}
			<ConstructorElement
				type={props.formType}
				isLocked={!!props.formType}
				text={`${props.name} ${props.formType === "top" ? "(верх)" : props.formType === "bottom" && "(низ)"}`}
				price={props.price}
				thumbnail={props.image}
				handleClose={() => removeHandler(props.id)}
			/>
		</div>
	);
};

export default ConstructorIngredient;

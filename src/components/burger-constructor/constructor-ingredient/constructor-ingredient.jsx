import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-ingredient.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, removeIngredient, sortIngredients } from "../../../services/burger-constructor/actions";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { getBun } from "../../../services/burger-constructor/reducer";

function ConstructorIngredient(props) {
	const dispatch = useDispatch();
	const ref = useRef();

	const removeHandler = (id) => {
		dispatch(removeIngredient(id));
	};

	const [{ isDragging }, dragRef] = useDrag({
		type: "constructorIngredient",
		item: props,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const bun = useSelector(getBun);

	const [, dropRef] = useDrop({
		accept: "constructorIngredient",
		hover: (item, monitor) => {
			dispatch(addIngredient(item));
			dispatch(sortIngredients({ item, props }));
		},
	});

	dragRef(dropRef(ref));

	const opacity = isDragging ? 0 : 1;
	return (
		<div
			className={styles.item}
			ref={ref}
			style={{ opacity }}
		>
			<DragIcon />
			<ConstructorElement
				type={props.type}
				isLocked={!!props.formType}
				text={props.name}
				price={props.price}
				thumbnail={props.image}
				handleClose={() => removeHandler(props.id)}
			/>
		</div>
	);
}

export default ConstructorIngredient;

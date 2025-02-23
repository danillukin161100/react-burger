import PropTypes from "prop-types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-ingredient.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, removeIngredient, sortIngredients } from "../../../services/burger-constructor/actions";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { ingredientType } from "../../../utils/types";

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
			{props.type !== 'bun' && <DragIcon />}
			<ConstructorElement
				type={props.formType}
				isLocked={!!props.formType}
				text={`${props.name} ${props.formType === 'top' ? '(верх)' : props.formType === 'bottom' && '(низ)'}`}
				price={props.price}
				thumbnail={props.image}
				handleClose={() => removeHandler(props.id)}
			/>
		</div>
	);
}

ConstructorIngredient.propTypes = {
	...ingredientType,
	formType: PropTypes.string,
};

export default ConstructorIngredient;

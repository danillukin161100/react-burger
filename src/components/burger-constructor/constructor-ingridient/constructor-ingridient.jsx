import {
	ConstructorElement,
	DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-ingridient.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
	addIngridient,
	removeIngridient,
	sortIngridients,
} from "../../../services/burger-constructor/actions";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { getBun } from "../../../services/burger-constructor/reducer";

function ConstructorIngridient(props) {
	const dispatch = useDispatch();
	const ref = useRef();

	const removeHandler = (id) => {
		dispatch(removeIngridient(id));
	};

	const [{ isDragging }, dragRef] = useDrag({
		type: "constructorIngridient",
		item: props,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const bun = useSelector(getBun);

	const [, dropRef] = useDrop({
		accept: "constructorIngridient",
		hover: (item, monitor) => {
			dispatch(addIngridient(item));
			dispatch(sortIngridients({ item, props }));
		},
	});

	dragRef(dropRef(ref));

	const opacity = isDragging ? 0 : 1;
	return (
		<div className={styles.item} ref={ref} style={{ opacity }}>
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

export default ConstructorIngridient;

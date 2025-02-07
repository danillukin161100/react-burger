import { useDispatch, useSelector } from "react-redux";
import styles from "./empty-element.module.css";
import { useDrop } from "react-dnd";
import { addIngredient } from "../../../services/burger-constructor/actions";
import { getBun } from "../../../services/burger-constructor/reducer";

function EmptyElement(props) {
	const { type, text } = props;
	const dispatch = useDispatch();
	const bun = useSelector(getBun);
	const [, dropRef] = useDrop({
		accept: "constructorIngredient",
		hover: (item, monitor) => {
			dispatch(addIngredient(item));
		},
	});
	return (
		<div
			className={`${styles.element} constructor-element ${type === "top" || type === "bottom" ? "constructor-element_pos_" + type : ""}`}
			ref={dropRef}
		>
			<span className="constructor-element__row">
				<span className="constructor-element__text">{text}</span>
				<span className="constructor-element__price"></span>
			</span>
		</div>
	);
}

export default EmptyElement;

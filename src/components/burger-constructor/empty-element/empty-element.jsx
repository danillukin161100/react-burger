import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import styles from "./empty-element.module.css";
import { useDrop } from "react-dnd";
import { addIngredient } from "../../../services/burger-constructor/actions";

function EmptyElement(props) {
	const { type, text } = props;
	const dispatch = useDispatch();
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

EmptyElement.propTypes = {
	type: PropTypes.string,
	text: PropTypes.string.isRequired,
};

export default EmptyElement;

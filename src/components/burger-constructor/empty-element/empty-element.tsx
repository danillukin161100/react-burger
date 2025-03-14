import PropTypes from "prop-types";
import styles from "./empty-element.module.css";
import { useDrop } from "react-dnd";
import { addIngredient } from "../../../services/burger-constructor/actions.ts";
import { useAppDispatch } from "../../../hooks/index.ts";
import { Ingredient } from "../../../utils/types.ts";

function EmptyElement(props: { type: "top" | "bottom" | null; text: any; }) {
	const { type, text } = props;
	const dispatch = useAppDispatch();
	const [, dropRef] = useDrop({
		accept: "constructorIngredient",
		hover: (item: Ingredient) => {
			dispatch(addIngredient(item));
		},
	});
	return (
		<div
			className={`${styles.element} constructor-element ${type !== null ? "constructor-element_pos_" + type : ""}`}
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

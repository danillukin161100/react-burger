import styles from "./empty-element.module.css";

function EmptyElement(props) {
	const { type, text } = props;
	return (
		<div
			className={`${styles.element} constructor-element ${
				type === "top" || type === "bottom"
					? "constructor-element_pos_" + type
					: ""
			}`}
		>
			<span className="constructor-element__row">
				<span className="constructor-element__text">{text}</span>
				<span className="constructor-element__price"></span>
			</span>
		</div>
	);
}

export default EmptyElement;

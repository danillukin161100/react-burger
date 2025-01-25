import PropTypes from "prop-types";

import Ingridient from "./ingridient/ingridient";

import styles from "./ingridients-in-category.module.css";
import { ingridientType } from "../../../../utils/types";

function IngridientsInCategory(props) {
	const elementRef = props.categoryRefs.get(props.category.key);
	return (
		<>
			<h3 ref={elementRef} className="mb-6 text text_type_main-medium">
				{props.category.title}
			</h3>

			<div className={`${styles.list} pl-4 pr-4 pb-10`}>
				{props.ingridients.map((ingridient, key) => (
					<Ingridient key={ingridient._id} {...ingridient} />
				))}
			</div>
		</>
	);
}

IngridientsInCategory.propTypes = {
	category: PropTypes.shape({
		key: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	}),
	categoryRefs: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	]),
	ingridients: PropTypes.arrayOf(
		PropTypes.shape(ingridientType)
	),
};

export default IngridientsInCategory;

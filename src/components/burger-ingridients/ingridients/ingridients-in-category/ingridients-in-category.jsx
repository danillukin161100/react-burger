import PropTypes from "prop-types";

import Ingridient from "./ingridient/ingridient";

import styles from "./ingridients-in-category.module.css";

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
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
			proteins: PropTypes.number,
			fat: PropTypes.number,
			carbohydrates: PropTypes.number,
			calories: PropTypes.number,
			price: PropTypes.number.isRequired,
			image: PropTypes.string.isRequired,
			image_mobile: PropTypes.string,
			image_large: PropTypes.string.isRequired,
			__v: PropTypes.number,
		})
	),
};

export default IngridientsInCategory;

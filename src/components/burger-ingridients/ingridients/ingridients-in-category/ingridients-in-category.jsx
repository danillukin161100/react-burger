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

export default IngridientsInCategory;

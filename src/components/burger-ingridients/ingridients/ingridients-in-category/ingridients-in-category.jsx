import PropTypes from "prop-types";
import Ingridient from "./ingridient/ingridient";
import styles from "./ingridients-in-category.module.css";
import { ingridientType } from "../../../../utils/types";
import { useSelector } from "react-redux";
import { getIngridientsByCategory } from "../../../../services/ingridients/reducer";
import { useEffect } from "react";

function IngridientsInCategory(props) {
	const { category, categoryRefs } = props;
	const ingridients = useSelector((state) =>
		getIngridientsByCategory(state, category.key)
	);
	const categoryRef = categoryRefs.get(category.key);

	return (
		<div ref={categoryRef}>
			<h3 className="mb-6 text text_type_main-medium">
				{category.title}
			</h3>

			<div className={`${styles.list} pl-4 pr-4 pb-10`}>
				{ingridients.map((ingridient) => (
					<Ingridient key={ingridient._id} {...ingridient} />
				))}
			</div>
		</div>
	);
}

export default IngridientsInCategory;

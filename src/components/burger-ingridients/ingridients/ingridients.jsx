import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import IngridientsInCategory from "./ingridients-in-category/ingridients-in-category";

import styles from "./ingridients.module.css";
import { ingridientType } from "../../../utils/types";

function Ingridients(props) {
	const ref = useRef(null);
	const [maxHeight, setMaxHeight] = useState(0);

	useEffect(() => {
		if (!ref.current) return;

		const calcHeight = (element) => {
			return (
				window.innerHeight - element.getBoundingClientRect().top - 40
			);
		};

		const updateHeight = () => {
			setMaxHeight(calcHeight(ref.current));
		};

		updateHeight();

		window.addEventListener("resize", updateHeight);

		return () => {
			window.removeEventListener("resize", updateHeight);
		};
	}, [ref.current]);

	return (
		<div
			ref={ref}
			className={`${styles.ingridients}`}
			style={{ maxHeight }}
		>
			{props.categories.map((category, key) => {
				const ingridientsInCat = props.ingridients.filter(
					(ingridient) => {
						return ingridient.type === category.key;
					}
				);

				return (
					<IngridientsInCategory
						key={key}
						category={category}
						ingridients={ingridientsInCat}
						categoryRefs={props.categoryRefs}
					/>
				);
			})}
		</div>
	);
}

Ingridients.propTypes = {
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		})
	),
	categoryRefs: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	]),
	ingridients: PropTypes.arrayOf(
		PropTypes.shape(ingridientType)
	),
};

export default Ingridients;

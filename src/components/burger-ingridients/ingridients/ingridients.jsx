import { createRef, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import IngridientsInCategory from "./ingridients-in-category/ingridients-in-category";

import styles from "./ingridients.module.css";
import { ingridientType } from "../../../utils/types";
import { categories } from "../../../utils/data";
import { useDispatch } from "react-redux";
import { setCurrentCategory } from "../../../services/ingridients/actions";

function Ingridients(props) {
	const ref = useRef();
	const categoryRefs = new Map(categories.map((category) => [category.key, createRef()]));
	const [maxHeight, setMaxHeight] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!ref.current) return;

		const calcHeight = (element) => {
			return window.innerHeight - element.getBoundingClientRect().top - 40;
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

	useEffect(() => {
		const scrollHandler = () => {
			const parentTop = ref.current.scrollTop;

			for (const [key, categoryRef] of categoryRefs) {
				if (!categoryRef.current) return;

				const categoryBottom = categoryRef.current.getBoundingClientRect().bottom;

				if (categoryBottom > parentTop) {
					// диспач на currentIngridient
					dispatch(setCurrentCategory(key));
					break;
				}
			}
		};

		ref.current?.addEventListener("scroll", scrollHandler);

		return () => {
			ref.current?.removeEventListener("scroll", scrollHandler);
		};
	}, [categoryRefs]);

	// useEffect(() => {
	// 	categoryRefs.forEach((categoryRef, key) => {
	// 		console.log(key);
	// 		setCategoriesTop({ ...categoriesTop, [key]: 1 });
	// 	});
	// }, []);

	return (
		<div
			ref={ref}
			className={`${styles.ingridients}`}
			style={{ maxHeight }}
		>
			{categories.map((category, key) => {
				return (
					<IngridientsInCategory
						key={key}
						category={category}
						categoryRefs={categoryRefs}
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
		}),
	),
	ingridients: PropTypes.arrayOf(PropTypes.shape(ingridientType)),
};

export default Ingridients;

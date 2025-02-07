import { createRef, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import IngredientsInCategory from "./ingredients-in-category/ingredients-in-category";

import styles from "./ingredients.module.css";
import { ingredientType } from "../../../utils/types";
import { categories } from "../../../utils/data";
import { useDispatch } from "react-redux";
import { setCurrentCategory } from "../../../services/ingredients/actions";

function Ingredients() {
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

	return (
		<div
			ref={ref}
			className={`${styles.ingredients}`}
			style={{ maxHeight }}
		>
			{categories.map((category, key) => {
				return (
					<IngredientsInCategory
						key={key}
						category={category}
						categoryRefs={categoryRefs}
					/>
				);
			})}
		</div>
	);
}

export default Ingredients;

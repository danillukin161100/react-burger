import { createRef, useEffect, useRef, useState } from "react";
import styles from "./burger-ingredients.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentCategoryKey } from "../../services/ingredients/reducer";
import { categories } from "../../utils/data";
import { setCurrentCategory } from "../../services/ingredients/actions";
import IngredientsInCategory from "./ingredients-in-category/ingredients-in-category";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients() {
	const ref = useRef();
	const categoryRefs = new Map(categories.map((category) => [category.key, createRef()]));
	const [maxHeight, setMaxHeight] = useState(0);
	const dispatch = useDispatch();
	const currentCategoryKey = useSelector(getCurrentCategoryKey);

	useEffect(() => {
		if (!ref.current) return;

		const updateHeight = () => {
			const newHeight = window.innerHeight - ref.current.getBoundingClientRect().top - 40;
			setMaxHeight(newHeight);
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
	}, [categoryRefs, ref]);

	return (
		<section className={`text text_type_main-default ${styles.burgerIngredients} pt-10 pl-5 pr-5`}>
			<h2 className="mb-5 text text_type_main-large">Соберите бургер</h2>

			<div className={`${styles.tabs} mb-10`}>
				{categories.map((category) => {
					return (
						<Tab
							key={category.key}
							value={category.key}
							active={currentCategoryKey === category.key}
						>
							{category.title}
						</Tab>
					);
				})}
			</div>

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
		</section>
	);
}

export default BurgerIngredients;

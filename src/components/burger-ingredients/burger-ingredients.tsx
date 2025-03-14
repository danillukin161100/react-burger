import { createRef, RefObject, useEffect, useRef, useState } from "react";
import styles from "./burger-ingredients.module.css";
import { getCurrentCategoryKey } from "../../services/ingredients/reducer";
import { categories } from "../../utils/data";
import { setCurrentCategory } from "../../services/ingredients/actions";
import IngredientsInCategory from "./ingredients-in-category/ingredients-in-category.tsx";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "../../hooks";
import { useSelector } from "react-redux";

function BurgerIngredients() {
	const ref = useRef<HTMLDivElement | null>(null);
	const categoryRefs = new Map<string, RefObject<HTMLDivElement>>(categories.map((category) => [category.key, createRef()]));
	const [maxHeight, setMaxHeight] = useState(0);
	const dispatch = useAppDispatch();
	const currentCategoryKey = useSelector(getCurrentCategoryKey);

	useEffect(() => {
		const updateHeight = () => {
			if (ref.current === null) return;
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
			if (ref.current === null) return;
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
						// @ts-ignore: error message
						<Tab key={category.key} value={category.key} active={currentCategoryKey === category.key}>
							{category.title}
						</Tab>
					);
				})}
			</div>

			<div ref={ref} className={`${styles.ingredients}`} style={{ maxHeight }}>
				{categories.map((category, key) => {
					return <IngredientsInCategory key={key} category={category} categoryRefs={categoryRefs} />;
				})}
			</div>
		</section>
	);
}

export default BurgerIngredients;

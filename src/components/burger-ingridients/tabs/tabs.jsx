import { useState, useCallback } from "react";
import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./tabs.module.css";

function Tabs(props) {
	const [current, setCurrent] = useState(props.categories[0]?.key);

	const handleCategoryClick = useCallback(
		(categoryKey) => {
			const elementRef = props.categoryRefs.get(categoryKey);
			elementRef?.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		},
		[props.categoryRefs]
	);

	return (
		<div className={`${styles.wrap} mb-10`}>
			{props.categories?.map((category) => {
				return (
					<Tab
						key={category.key}
						value={category.key}
						active={current === category.key}
						onClick={(current) => {
							setCurrent(current);
							handleCategoryClick(current);
						}}
					>
						{category.title}
					</Tab>
				);
			})}
		</div>
	);
}

Tabs.propType = {
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
};

export default Tabs;

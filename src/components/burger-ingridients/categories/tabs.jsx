import { useState, useCallback } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

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
		<div className="mb-10" style={{ display: "flex" }}>
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

export default Tabs;

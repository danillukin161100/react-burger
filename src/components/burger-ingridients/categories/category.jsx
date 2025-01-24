import styles from "./categories.module.css";
import React, { useState } from "react";

function Category(props) {
	const [isActive, setActive] = useState(false);

	return (
		<li
			className={`${styles.item} ${isActive ? styles.active : ''}`}
			onClick={() => {
				props.onCategoryClick(props.category.key);
			}}
		>
			{props.category.title}
		</li>
	);
}

export default Category;

import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./tabs.module.css";
import { categories } from "../../../utils/data";
import { useSelector } from "react-redux";
import { getCurrentCategoryKey } from "../../../services/ingridients/reducer";

function Tabs() {
	const currentCategoryKey = useSelector(getCurrentCategoryKey);

	return (
		<div className={`${styles.wrap} mb-10`}>
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
	);
}

export default Tabs;

import PropTypes from "prop-types";

import styles from "./ingridient-details-item.module.css";

function IngridientDetailsItem({ name, value }) {
	return (
		<div className="text text_type_main-default text_color_inactive">
			<span className="mb-2">{name}</span>
			<span className={`${styles.value} text text_type_digits-default`}>
				{value}
			</span>
		</div>
	);
}

IngridientDetailsItem.propTypes = {
	name: PropTypes.string,
	value: PropTypes.number,
};

export default IngridientDetailsItem;

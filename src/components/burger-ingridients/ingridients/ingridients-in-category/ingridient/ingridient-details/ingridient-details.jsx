import PropTypes from "prop-types";

import IngridientDetailsList from "./ingridient-details-list/ingridient-details-list";

import { ingridientType } from "../../../../../../utils/types";
import styles from "./ingridient-details.module.css";

function IngridientDetails(props) {
	return (
		<div className={styles.wrap}>
			<img src={props.image_large} className="mb-4" alt={props.name} />
			<p className={`${styles.title} text text_type_main-medium`}>
				{props.name}
			</p>
			<IngridientDetailsList
				calories={props.calories}
				proteins={props.proteins}
				carbohydrates={props.carbohydrates}
				fat={props.fat}
			/>
		</div>
	);
}

IngridientDetails.propTypes = ingridientType;

export default IngridientDetails;

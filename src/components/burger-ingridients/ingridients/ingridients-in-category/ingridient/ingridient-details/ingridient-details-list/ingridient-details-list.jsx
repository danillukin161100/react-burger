import PropTypes from "prop-types";

import IngridientDetailsItem from "./ingridient-details-item/ingridient-details-item";

import { ingridientParams } from "../../../../../../../utils/data";
import styles from "./ingridient-details-list.module.css";

function IngridientDetailsList(props) {
	return (
		<div className={`${styles.wrap} mt-8`}>
			{Object.keys(props).map((key) => {
				const value = props[key];
				const name = ingridientParams[key];

				return (
					<IngridientDetailsItem
						name={name}
						value={value}
						key={key}
					/>
				);
			})}
		</div>
	);
}

IngridientDetailsList.propTypes = {
	calories: PropTypes.number,
	proteins: PropTypes.number,
	carbohydrates: PropTypes.number,
	fat: PropTypes.number,
};

export default IngridientDetailsList;

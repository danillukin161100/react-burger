import { useEffect, useState } from "react";
import styles from "./ingridient-details-list.module.css";
import IngridientDetailsItem from "./ingridient-details-item/ingridient-details-item";

function IngridientDetailsList(props) {
	const [params, setParams] = useState([]);

	useEffect(() => {
		let newParams = [];

		for (const key in props) {
			const value = props[key];
			const currentIngridientParam = ingridientParams.find(
				(param) => param.key === key
			);

			newParams.push({ key, name: currentIngridientParam.name, value });
		}

		setParams(newParams);
	}, []);

	const ingridientParams = [
		{ key: "calories", name: "Калории,ккал" },
		{ key: "proteins", name: "Белки, г" },
		{ key: "fat", name: "Жиры, г" },
		{ key: "carbohydrates", name: "Углеводы, г" },
	];

	return (
		<div className={`${styles.wrap} mt-8`}>
			{params.map((param) => (
				<IngridientDetailsItem name={param.name} value={param.value} key={param.key} />
			))}
		</div>
	);
}

export default IngridientDetailsList;

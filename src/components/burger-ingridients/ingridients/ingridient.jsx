import { useCallback, useEffect, useState } from "react";
import {
	Counter,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../../modal/modal.jsx";
import { constructorIngridients } from "../../../utils/data.js";

function Ingridient(props) {
	const [count, setCount] = useState(0);
	const [modalActive, setModalActive] = useState(false);

	useEffect(() => {
		let currentIngirdients = constructorIngridients.filter(
			(ingridient) => props._id === ingridient._id
		);
		setCount(currentIngirdients.length);
	}, [constructorIngridients]);

	const openModal = (e) => {
		e.stopPropagation();
		setModalActive(true);
	};

	const closeModal = (e) => {
		e.stopPropagation();
		setModalActive(false);
	};

	// const openModal = useCallback((e) => {
	// 	e.stopPropagation();
	// 	setModalActive(true);
	// }, []);

	// const closeModal = useCallback((e) => {
	// 	e.stopPropagation();
	// 	setModalActive(false);
	// }, []);

	return (
		<div
			className="card"
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				position: "relative",
			}}
			onClick={openModal}
		>
			{count > 0 && <Counter count={count} size="default" />}
			<img
				src={props.image}
				alt={props.name}
				className="pl-4 pr-4 mb-1"
			/>
			<span
				className="text text_type_digits-default mb-1"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{props.price} <CurrencyIcon className="ml-1" />
			</span>
			<p
				className="text text_type_main-default"
				style={{
					textAlign: "center",
				}}
			>
				{props.name}
			</p>
			{modalActive && (
				<Modal header="Детали ингридиента" closeHandler={closeModal}>
					<div
						style={{
							display: "flex",
							marginLeft: "auto",
							marginRight: "auto",
							flexDirection: "column",
							maxWidth: 520,
						}}
					>
						<img src={props.image_large} className="mb-4" />
						<p
							className="text text_type_main-medium"
							style={{
								textAlign: "center",
							}}
						>
							{props.name}
						</p>
						<div
							className="mt-8"
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(4, 1fr)",
								columnGap: 20,
								textAlign: "center",
							}}
						>
							{props.calories && (
								<div className="text_color_inactive">
									<span className="mb-2">Калории,ккал</span>
									<span
										className="text text_type_digits-default"
										style={{ display: "block" }}
									>
										{props.calories}
									</span>
								</div>
							)}
							{props.proteins && (
								<div className="text_color_inactive">
									<span className="mb-2">Белки, г</span>
									<span
										className="text text_type_digits-default"
										style={{ display: "block" }}
									>
										{props.proteins}
									</span>
								</div>
							)}
							{props.fat && (
								<div className="text_color_inactive">
									<span className="mb-2">Жиры, г</span>
									<span
										className="text text_type_digits-default"
										style={{ display: "block" }}
									>
										{props.fat}
									</span>
								</div>
							)}
							{props.carbohydrates && (
								<div className="text_color_inactive">
									<span className="mb-2">Углеводы, г</span>
									<span
										className="text text_type_digits-default"
										style={{ display: "block" }}
									>
										{props.carbohydrates}
									</span>
								</div>
							)}
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
}

export default Ingridient;

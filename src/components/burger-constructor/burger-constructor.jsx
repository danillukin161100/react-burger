import {
	ConstructorElement,
	CurrencyIcon,
	Button,
	DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useEffect, useRef, useState } from "react";
import Modal from "../modal/modal";
import IconSuccess from "../icons/icon-success";
import styles from "./burger-constructor.module.css";

function BurgerConstructor(props) {
	const firstIngridient = props.ingridients[0];
	const lastIngridient = props.ingridients[props.ingridients.length - 1];
	const listRef = useRef();
	const constructorRef = useRef();
	const [maxHeight, setMaxHeight] = useState(0);
	const [orderModalActive, setOrderModalActive] = useState(false);

	const updateHeight = useCallback(() => {
		let windowHeight = window.innerHeight;
		let listRect = listRef.current.getBoundingClientRect();
		let constructorRect = constructorRef.current.getBoundingClientRect();
		let body = document.body;
		let html = document.documentElement;
		let documentHeight = Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight
		);

		let offsetTop = (listRect.top / windowHeight) * 100;
		let listOffsetBottom = documentHeight - listRect.y - listRect.height;
		let constructorOffsetBottom =
			documentHeight - constructorRect.y - constructorRect.height;
		let offsetBottom =
			((listOffsetBottom - constructorOffsetBottom) / windowHeight) * 100;
		let result = 100 - offsetBottom - offsetTop;

		setMaxHeight(result);
	});

	const getIngridientSum = () => {
		return props.ingridients.reduce(
			(sum, ingridient) => sum + ingridient.price,
			0
		);
	};

	const openOrderModal = (e) => {
		e.stopPropagation();
		setOrderModalActive(true);
	};

	const closeOrderModal = (e) => {
		e.stopPropagation();
		setOrderModalActive(false);
	};

	useEffect(() => {
		updateHeight();
		window.addEventListener("resize", updateHeight);

		return () => {
			window.removeEventListener("resize", updateHeight);
		};
	});

	return (
		<div
			className="burger-constructor pt-25 pl-5 pr-9 pb-10"
			style={{
				display: "grid",
				gap: 16,
				alignContent: "flex-start",
				justifyItems: "flex-end",
			}}
			ref={constructorRef}
		>
			<ConstructorElement
				type={"top"}
				isLocked={true}
				text={firstIngridient.name}
				price={firstIngridient.price}
				thumbnail={firstIngridient.image}
			/>
			<div
				style={{
					display: "grid",
					gap: "inherit",
					maxHeight: `${maxHeight}vh`,
					overflowX: "hidden",
					overflowY: "auto",
					marginRight: -20,
					width: "calc(100% + 20px)",
				}}
				ref={listRef}
			>
				{props.ingridients?.map((ingridient, index) => {
					if (index === 0 || index === props.ingridients.length - 1) {
						return;
					}

					return (
						<div
							key={index}
							style={{
								display: "flex",
								alignItems: "center",
								columnGap: 8,
								justifyContent: "flex-end",
							}}
						>
							<DragIcon />
							<ConstructorElement
								isLocked={false}
								text={ingridient.name}
								price={ingridient.price}
								thumbnail={ingridient.image}
							/>
						</div>
					);
				})}
			</div>
			<ConstructorElement
				type={"bottom"}
				isLocked={true}
				text={lastIngridient.name}
				price={lastIngridient.price}
				thumbnail={lastIngridient.image}
			/>

			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
				}}
				className="pt-6"
			>
				<span className="text text_type_digits-medium mr-10">
					{getIngridientSum()} <CurrencyIcon />
				</span>
				<Button onClick={openOrderModal} htmlType="button" size="large">
					Оформить заказ
				</Button>

				{orderModalActive && (
					<Modal closeHandler={closeOrderModal}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								maxWidth: 520,
								marginLeft: "auto",
								marginRight: "auto",
							}}
							className="pb-15"
						>
							<div
								className={`${styles.orderID} text text_type_digits-large mb-8`}
							>
								034536
							</div>
							<div className="text text_type_main-medium mb-15">
								идентификатор заказа
							</div>
							<IconSuccess className="mb-15" />
							<div className="text text_type_main-default mb-2">
								Ваш заказ начали готовить
							</div>
							<div className="text text_type_main-default text_color_inactive">
								Дождитесь готовности на орбитальной станции
							</div>
						</div>
					</Modal>
				)}
			</div>
		</div>
	);
}

export default BurgerConstructor;

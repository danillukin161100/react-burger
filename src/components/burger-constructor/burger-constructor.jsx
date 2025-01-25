import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import {
	ConstructorElement,
	CurrencyIcon,
	Button,
	DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";

import { ingridientType } from "../../utils/types";
import styles from "./burger-constructor.module.css";

function BurgerConstructor({ ingridients }) {
	const bun = ingridients.find((ingridient) => ingridient.type === "bun");
	const listRef = useRef();
	const constructorRef = useRef();
	const [maxHeight, setMaxHeight] = useState(0);
	const [orderModalActive, setOrderModalActive] = useState(false);

	const updateHeight = useCallback(() => {
		const windowHeight = window.innerHeight;
		const listRect = listRef.current.getBoundingClientRect();
		const constructorRect = constructorRef.current.getBoundingClientRect();
		const body = document.body;
		const html = document.documentElement;
		const documentHeight = Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight
		);

		const offsetTop = (listRect.top / windowHeight) * 100;
		const listOffsetBottom = documentHeight - listRect.y - listRect.height;
		const constructorOffsetBottom =
			documentHeight - constructorRect.y - constructorRect.height;
		const offsetBottom =
			((listOffsetBottom - constructorOffsetBottom) / windowHeight) * 100;
		const result = 100 - offsetBottom - offsetTop;

		setMaxHeight(result);
	});

	const getIngridientSum = () => {
		return ingridients.reduce(
			(sum, ingridient) => sum + ingridient.price,
			0
		);
	};

	const openOrderModal = (e) => {
		e.stopPropagation();
		setOrderModalActive(true);
	};

	useEffect(() => {
		updateHeight();
		window.addEventListener("resize", updateHeight);

		return () => {
			window.removeEventListener("resize", updateHeight);
		};
	}, []);

	return (
		<section
			className={`${styles.wrap} burger-constructor pt-25 pl-5 pr-9 pb-10`}
			ref={constructorRef}
		>
			<ConstructorElement
				type={"top"}
				isLocked={true}
				text={bun.name}
				price={bun.price}
				thumbnail={bun.image}
			/>
			<div
				className={styles.list}
				style={{
					maxHeight: `${maxHeight}vh`,
				}}
				ref={listRef}
			>
				{ingridients?.map((ingridient, index) => {
					if (ingridient.type === "bun") {
						return;
					}

					return (
						<div key={`${ingridient._id}`} className={styles.item}>
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
				text={bun.name}
				price={bun.price}
				thumbnail={bun.image}
			/>

			<div className={`${styles.footer} pt-6`}>
				<span className="text text_type_digits-medium mr-10">
					{getIngridientSum()} <CurrencyIcon />
				</span>
				<Button onClick={openOrderModal} htmlType="button" size="large">
					Оформить заказ
				</Button>

				{orderModalActive && (
					<Modal onClose={() => setOrderModalActive(false)}>
						<OrderDetails />
					</Modal>
				)}
			</div>
		</section>
	);
}

BurgerConstructor.propTypes = {
	ingridients: PropTypes.arrayOf(
		PropTypes.shape(ingridientType)
	),
};

export default BurgerConstructor;

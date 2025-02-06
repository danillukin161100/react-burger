import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
	ConstructorElement,
	CurrencyIcon,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import { ingridientType } from "../../utils/types";
import styles from "./burger-constructor.module.css";
import { useSelector } from "react-redux";
import {
	getBun,
	getIngridients,
	getTotal,
} from "../../services/burger-constructor/reducer";
import EmptyElement from "./empty-element/empty-element";
import ConstructorIngridient from "./constructor-ingridient/constructor-ingridient";

function BurgerConstructor() {
	const bun = useSelector(getBun);
	const total = useSelector((state) => getTotal(state));
	const ingridients = useSelector(getIngridients);
	const listRef = useRef();
	const constructorRef = useRef();

	const [maxHeight, setMaxHeight] = useState(100);
	const [isScroll, setIsScroll] = useState(false);
	const [orderModalActive, setOrderModalActive] = useState(false);
	const openOrderModal = (e) => {
		e.stopPropagation();
		setOrderModalActive(true);
	};

	const updateHeight = useCallback(() => {
		if (!listRef?.current || !constructorRef?.current) return;

		const windowHeight = window.innerHeight;
		const listRect = listRef.current.getBoundingClientRect();
		const constructorRect = constructorRef.current?.getBoundingClientRect();
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
	useEffect(() => {
		updateHeight();
		window.addEventListener("resize", updateHeight);

		return () => {
			window.removeEventListener("resize", updateHeight);
		};
	}, []);

	useEffect(() => {
		if (!listRef?.current) return;
		
		setIsScroll(
			listRef.current.scrollHeight > listRef.current.clientHeight
		);
	}, [ingridients?.length]);

	return (
		<section
			className={`${styles.wrap} burger-constructor pt-25 pl-5 pr-9 pb-10`}
			ref={constructorRef}
		>
			{bun ? (
				<ConstructorIngridient {...bun} formType="top" />
			) : (
				<EmptyElement type="top" text="Выбирете булку" />
			)}
			<div
				className={`${styles.list} ${isScroll && styles.hasScroll}`}
				style={{
					maxHeight: `${maxHeight}vh`,
				}}
				ref={listRef}
			>
				{ingridients.length ? (
					ingridients.map((ingridient) => (
						<ConstructorIngridient
							{...ingridient}
							key={ingridient.id}
						/>
					))
				) : (
					<EmptyElement type="middle" text="Выбирете ингридиент" />
				)}
			</div>
			{bun ? (
				<ConstructorIngridient {...bun} formType="bottom" />
			) : (
				<EmptyElement type="bottom" text="Выбирете булку" />
			)}

			<div className={`${styles.footer} pt-6`}>
				<span className="text text_type_digits-medium mr-10">
					{total} <CurrencyIcon />
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
	ingridients: PropTypes.arrayOf(PropTypes.shape(ingridientType)),
};

export default BurgerConstructor;

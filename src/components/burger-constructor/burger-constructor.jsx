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
import { useDispatch, useSelector } from "react-redux";
import {
	getBun,
	getIngridients,
	getTotal,
} from "../../services/burger-constructor/reducer";
import EmptyElement from "./empty-element/empty-element";
import { useDrop } from "react-dnd";
import {
	addIngridient,
	removeIngridient,
} from "../../services/burger-constructor/actions";

function BurgerConstructor() {
	const dispatch = useDispatch();
	const bun = useSelector(getBun);
	const total = useSelector((state) => getTotal(state));
	const ingridients = useSelector(getIngridients);
	const listRef = useRef();
	const constructorRef = useRef();
	const [, drop] = useDrop({
		accept: "ingridient",
		drop(ingridient) {
			dispatch(addIngridient(ingridient));
		},
	});

	// const [maxHeight, setMaxHeight] = useState(0);
	const [maxHeight, setMaxHeight] = useState(100);
	const [orderModalActive, setOrderModalActive] = useState(false);

	const onDelete = (key) => {
		dispatch(removeIngridient(key));
	};
	const openOrderModal = (e) => {
		e.stopPropagation();
		setOrderModalActive(true);
	};

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
	useEffect(() => {
		updateHeight();
		window.addEventListener("resize", updateHeight);

		return () => {
			window.removeEventListener("resize", updateHeight);
		};
	}, []);

	drop(constructorRef);

	return (
		<section
			className={`${styles.wrap} burger-constructor pt-25 pl-5 pr-9 pb-10`}
			ref={constructorRef}
		>
			{bun ? (
				<ConstructorElement
					type={"top"}
					isLocked={true}
					text={`${bun.name} (верх)`}
					price={bun.price}
					thumbnail={bun.image}
				/>
			) : (
				<EmptyElement type="top" text="Выбирете булку" />
			)}
			<div
				className={styles.list}
				style={{
					maxHeight: `${maxHeight}vh`,
				}}
				ref={listRef}
			>
				{ingridients.length ? (
					ingridients.map((ingridient) => (
						<div key={`${ingridient.key}`} className={styles.item}>
							<DragIcon />
							<ConstructorElement
								isLocked={false}
								text={ingridient.name}
								price={ingridient.price}
								thumbnail={ingridient.image}
								handleClose={(e, key = ingridient.key) =>
									onDelete(key)
								}
							/>
						</div>
					))
				) : (
					<EmptyElement type="middle" text="Выбирете ингридиент" />
				)}
			</div>
			{bun ? (
				<ConstructorElement
					type={"bottom"}
					isLocked={true}
					text={`${bun.name} (низ)`}
					price={bun.price}
					thumbnail={bun.image}
				/>
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

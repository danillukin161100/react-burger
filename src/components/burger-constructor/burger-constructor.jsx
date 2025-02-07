import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import { ingredientType } from "../../utils/types";
import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getBun, getIngredients, getTotal } from "../../services/burger-constructor/reducer";
import EmptyElement from "./empty-element/empty-element";
import ConstructorIngredient from "./constructor-ingredient/constructor-ingredient";
import Loader from "../loader/loader";
import { createOrder, openOrder } from "../../services/orders/actions";

function BurgerConstructor() {
	const dispatch = useDispatch();

	const bun = useSelector(getBun);
	const total = useSelector((state) => getTotal(state));
	const ingredients = useSelector(getIngredients);

	const listRef = useRef();
	const constructorRef = useRef();

	const { loading, modal, order } = useSelector((state) => state.orders);

	const [maxHeight, setMaxHeight] = useState(100);
	const [isScroll, setIsScroll] = useState(false);

	const updateHeight = useCallback(() => {
		if (!listRef?.current || !constructorRef?.current) return;

		const windowHeight = window.innerHeight;
		const listRect = listRef.current.getBoundingClientRect();
		const constructorRect = constructorRef.current?.getBoundingClientRect();
		const body = document.body;
		const html = document.documentElement;
		const documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

		const offsetTop = (listRect.top / windowHeight) * 100;
		const listOffsetBottom = documentHeight - listRect.y - listRect.height;
		const constructorOffsetBottom = documentHeight - constructorRect.y - constructorRect.height;
		const offsetBottom = ((listOffsetBottom - constructorOffsetBottom) / windowHeight) * 100;
		const result = 100 - offsetBottom - offsetTop;
		setMaxHeight(result);
	});

	const createOrderHandler = () => {
		let orderIngredients = [...ingredients.map((ingredient) => ingredient._id)];
		if (bun) orderIngredients = [bun._id, ...orderIngredients, bun._id];
		console.log(orderIngredients);
		dispatch(createOrder({ingredients: orderIngredients}));
	};

	const openOrderHandler = () => {
		dispatch(openOrder());
	};

	const closeOrderHandler = () => {
		dispatch(closeOrderHandler());
	};

	useEffect(() => {
		updateHeight();
		window.addEventListener("resize", updateHeight);

		return () => {
			window.removeEventListener("resize", updateHeight);
		};
	}, []);

	useEffect(() => {
		if (!listRef?.current) return;

		setIsScroll(listRef.current.scrollHeight > listRef.current.clientHeight);
	}, [ingredients?.length]);

	return (
		<section
			className={`${styles.wrap} burger-constructor pt-25 pl-5 pr-9 pb-10`}
			ref={constructorRef}
		>
			{bun ? (
				<ConstructorIngredient
					{...bun}
					formType="top"
				/>
			) : (
				<EmptyElement
					type="top"
					text="Выбирете булку"
				/>
			)}
			<div
				className={`${styles.list} ${isScroll && styles.hasScroll}`}
				style={{
					maxHeight: `${maxHeight}vh`,
				}}
				ref={listRef}
			>
				{ingredients.length ? (
					ingredients.map((ingredient) => (
						<ConstructorIngredient
							key={ingredient.id}
							{...ingredient}
						/>
					))
				) : (
					<EmptyElement
						type="middle"
						text="Выбирете ингридиент"
					/>
				)}
			</div>
			{bun ? (
				<ConstructorIngredient
					{...bun}
					formType="bottom"
				/>
			) : (
				<EmptyElement
					type="bottom"
					text="Выбирете булку"
				/>
			)}

			<div className={`${styles.footer} pt-6`}>
				<span className="text text_type_digits-medium mr-10">
					{total} <CurrencyIcon />
				</span>

				{loading ? (
					<Loader />
				) : order ? (
					<Button
						onClick={openOrderHandler}
						htmlType="button"
						size="large"
					>
						Показать заказ
					</Button>
				) : (
					<Button
						onClick={createOrderHandler}
						htmlType="button"
						size="large"
					>
						Оформить заказ
					</Button>
				)}

				{modal && (
					<Modal onClose={() => setOrderModalActive(false)}>
						<OrderDetails />
					</Modal>
				)}
			</div>
		</section>
	);
}

export default BurgerConstructor;

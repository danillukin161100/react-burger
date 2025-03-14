import { useCallback, useEffect, useRef, useState } from "react";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal.tsx";
import OrderDetails from "./order-details/order-details.tsx";
import styles from "./burger-constructor.module.css";
import { useSelector } from "react-redux";
import { BurgerConstructorState, getBun, getIngredients, getTotal } from "../../services/burger-constructor/reducer.ts";
import EmptyElement from "./empty-element/empty-element.tsx";
import ConstructorIngredient from "./constructor-ingredient/constructor-ingredient.tsx";
import Loader from "../loader/loader.tsx";
import { closeOrder, createOrder } from "../../services/orders/actions.ts";
import { useNavigate } from "react-router";
import { getCookie } from "../../utils/cookies.ts";
import { useAppDispatch } from "../../hooks/index.ts";
import { Ingredient, RootState } from "../../utils/types.ts";

function BurgerConstructor() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const bun = useSelector(getBun);
	const total = useSelector((state: BurgerConstructorState) => getTotal(state));
	const ingredients: Ingredient[] = useSelector(getIngredients);

	const listRef = useRef<HTMLDivElement | null>(null);
	const constructorRef = useRef<HTMLDivElement | null>(null);

	const { loading, modal } = useSelector((state: RootState) => state.orders);

	const [maxHeight, setMaxHeight] = useState(100);
	const [isScroll, setIsScroll] = useState(false);

	const updateHeight = useCallback(() => {
		if (!listRef?.current || !constructorRef?.current) return;

		const windowHeight = window.innerHeight;
		const listRect = listRef.current.getBoundingClientRect();
		const constructoRect = constructorRef.current.getBoundingClientRect();

		const bottomElementsHeight = windowHeight - listRect.bottom - (windowHeight - constructoRect.bottom);
		const res = windowHeight - listRect.top - bottomElementsHeight;

		setMaxHeight(res);
	}, [listRef, constructorRef]);

	const createOrderHandler = () => {
		if (!bun || !ingredients.length) return false;
		let orderIngredients = [...ingredients.map((ingredient) => ingredient._id)].filter((id) => id !== undefined);
		if (bun) orderIngredients = [bun._id, ...orderIngredients, bun._id];

		if (getCookie("isAuth") !== undefined) dispatch(createOrder({ ingredients: orderIngredients }));
		else navigate("/login");
	};

	const closeOrderHandler = () => {
		dispatch(closeOrder());
	};

	useEffect(() => {
		updateHeight();
		window.addEventListener("resize", updateHeight);

		return () => {
			window.removeEventListener("resize", updateHeight);
		};
	}, [ingredients]);

	useEffect(() => {
		if (!listRef?.current) return;

		setIsScroll(listRef.current.scrollHeight > listRef.current.clientHeight);
	}, [ingredients?.length]);

	return (
		<section className={`${styles.wrap} burger-constructor pt-25 pl-5 pr-9 pb-10`} ref={constructorRef}>
			{bun ? <ConstructorIngredient {...bun} formType="top" /> : <EmptyElement type="top" text="Выбирете булку" />}
			<div
				className={`${styles.list} ${isScroll && styles.hasScroll}`}
				style={{
					maxHeight: maxHeight,
				}}
				ref={listRef}
			>
				{ingredients.length ? (
					ingredients.map((ingredient) => <ConstructorIngredient formType={undefined} key={ingredient.id} {...ingredient} />)
				) : (
					<EmptyElement text="Выбирете ингридиент" type={null} />
				)}
			</div>
			{bun ? <ConstructorIngredient {...bun} formType="bottom" /> : <EmptyElement type="bottom" text="Выбирете булку" />}

			<div className={`${styles.footer} pt-6`}>
				<span className="text text_type_digits-medium mr-10">
					{total} <CurrencyIcon type={"primary"} />
				</span>

				{loading ? (
					<Loader fullscreen={false} />
				) : (
					<Button onClick={createOrderHandler} htmlType="button" size="large">
						Оформить заказ
					</Button>
				)}

				{modal && (
					<Modal onClose={() => closeOrderHandler()}>
						<OrderDetails />
					</Modal>
				)}
			</div>
		</section>
	);
}

export default BurgerConstructor;

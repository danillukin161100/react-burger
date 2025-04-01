import { useRef, useState, useEffect } from "react";
import { FeedItem } from "../../components/feed-item/feed-item";
import Loader from "../../components/loader/loader";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { BASE_WSS_URL } from "../../utils/data";
import { connect, disconnect } from "../../services/orders/actions";
import styles from "./profile.module.css";

export const ProfileOrdersPage = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [maxHeight, setMaxHeight] = useState(0);
	const dispatch = useAppDispatch();
	const { orders } = useAppSelector((state) => state.orders);

	useEffect(() => {
		dispatch(connect(`${BASE_WSS_URL}orders`));

		return () => {
			dispatch(disconnect());
		};
	}, []);

	useEffect(() => {
		const updateHeight = () => {
			if (ref.current === null) return;
			const newHeight = window.innerHeight - ref.current.getBoundingClientRect().top - 40;
			setMaxHeight(newHeight);
		};

		updateHeight();

		window.addEventListener("resize", updateHeight);

		return () => {
			window.removeEventListener("resize", updateHeight);
		};
	}, [ref.current]);

	if (!orders?.length) return <Loader fullscreen={true} />;
	return (
		<div className={styles.feed} ref={ref} style={{ maxHeight }}>
			{orders.map((order) => (
				<FeedItem key={order._id} {...order} isShowStatus={true} />
			))}
		</div>
	);
};

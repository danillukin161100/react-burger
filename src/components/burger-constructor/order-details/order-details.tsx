import { useSelector } from "react-redux";
import IconSuccess from "../../icons/icon-success.tsx";

import styles from "./order-details.module.css";
import Loader from "../../loader/loader.tsx";
import { RootState } from "../../../utils/types.ts";

function OrderDetails() {
	const { currentOrder } = useSelector((state: RootState) => state.orders);

	if (currentOrder === null) return <Loader fullscreen={true} />;

	return (
		<div className={`${styles.wrap} pb-15`}>
			<div className={`${styles.orderID} text text_type_digits-large mb-8`}>{currentOrder.number}</div>
			<div className="text text_type_main-medium mb-15">идентификатор заказа</div>
			<IconSuccess className="mb-15" />
			<div className="text text_type_main-default mb-2">Ваш заказ начали готовить</div>
			<div className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</div>
		</div>
	);
}

export default OrderDetails;

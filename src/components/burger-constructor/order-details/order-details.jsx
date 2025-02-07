import { useSelector } from "react-redux";
import IconSuccess from "../../icons/icon-success";

import styles from "./order-details.module.css";
import { getOrderNumber } from "../../../services/orders/reducer";

function OrderDetails() {
	const orderNumber = useSelector(getOrderNumber);

	return (
		<div className={`${styles.wrap} pb-15`}>
			<div className={`${styles.orderID} text text_type_digits-large mb-8`}>{orderNumber}</div>
			<div className="text text_type_main-medium mb-15">идентификатор заказа</div>
			<IconSuccess className="mb-15" />
			<div className="text text_type_main-default mb-2">Ваш заказ начали готовить</div>
			<div className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</div>
		</div>
	);
}

export default OrderDetails;

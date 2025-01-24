import IconSuccess from "../../icons/icon-success";

import styles from "./order-details.module.css";

function OrderDetails() {
	return (
		<div className={`${styles.wrap} pb-15`}>
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
	);
}

export default OrderDetails;

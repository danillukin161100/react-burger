import styles from "./menu-item.module.css";

function MenuItem(props) {
	const isActiveClass = props.active ? styles.active : "";
	return (
		<li className={`${styles.item} ${isActiveClass} p-5`}>
			{props.children}
		</li>
	);
}

export default MenuItem;

import styles from "./menu-list.module.css";
function MenuList(props) {
	return (
		<ul className={`${styles.menu} ${styles[props.justify]}`}>
			{props.children}
		</ul>
	);
}

export default MenuList;

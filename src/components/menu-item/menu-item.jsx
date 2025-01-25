import PropTypes from "prop-types";

import styles from "./menu-item.module.css";

function MenuItem(props) {
	const isActiveClass = props.active ? styles.active : "";
	const link = props.link ? props.link : "#!";

	return (
		<li className={`${styles.item}`}>
			<a className={`${styles.link} ${isActiveClass} p-5`} href={link}>{props.children}</a>
		</li>
	);
}

MenuItem.propTypes = {
	active: PropTypes.bool,
	link: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default MenuItem;

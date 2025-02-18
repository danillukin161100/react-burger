import PropTypes from "prop-types";

import styles from "./menu-item.module.css";
import { Link, NavLink } from "react-router";

function MenuItem(props) {
	const isActiveClass = props.active ? styles.active : "";
	const link = props.link ? props.link : "#!";

	return (
		<li className={`${styles.item}`}>
			<NavLink to={props.link} className={({ isActive }) => (`${isActive ? styles.active : ""} ${styles.link} p-5`)}>
				{props.children}
			</NavLink>
		</li>
	);
}

MenuItem.propTypes = {
	active: PropTypes.bool,
	link: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default MenuItem;

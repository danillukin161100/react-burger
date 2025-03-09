import PropTypes from "prop-types";

import styles from "./menu-list.module.css";

function MenuList(props) {
	return (
		<ul className={`${styles.menu} ${styles[props.justify]}`}>
			{props.children}
		</ul>
	);
}

MenuList.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default MenuList;

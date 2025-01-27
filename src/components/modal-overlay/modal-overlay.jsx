import PropTypes from "prop-types";

import styles from './modal-overlay.module.css';

function ModalOverlay({onClick, isActive}) {
	return <div onClick={onClick} className={`${styles.overlay} ${isActive && styles.overlayActive}`} />;
}

ModalOverlay.propTypes = {
	isActive: PropTypes.bool,
	onClick: PropTypes.func,
}

export default ModalOverlay;

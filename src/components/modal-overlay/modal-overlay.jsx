import styles from './modal-overlay.module.css';

function ModalOverlay({onClick, isActive}) {
	return <div onClick={onClick} className={`${styles.overlay} ${isActive && styles.overlayActive}`} />;
}

export default ModalOverlay;

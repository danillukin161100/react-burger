import styles from "./modal-overlay.module.css";
import { FC } from "react";

const ModalOverlay: FC<{ onClick<event>(event: event): void; isActive: boolean }> = ({ onClick, isActive }) => {
	return <div onClick={onClick} className={`${styles.overlay} ${isActive && styles.overlayActive}`} />;
};

export default ModalOverlay;

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./modal.module.css";

function Modal({ onClose, header, children }) {
	const [isActive, setActive] = useState(false);

	useEffect(() => {
		const onKeyDown = (e) => {
			if (e.code === "Escape") onClose(e);
		};

		setActive(true);

		document.addEventListener("keydown", onKeyDown);

		return () => {
			setActive(false);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, []);

	return createPortal(
		<div className={`${styles.modal}`}>
			<ModalOverlay
				onClick={onClose}
				isActive={isActive}
			/>
			<div className={`${styles.modalWindow} ${isActive && styles.modalWindowActive} p-10 ${header ? "pt-10" : "pt-30"} pb-15`}>
				{header && <div className={`text text_type_main-large ${styles.header}`}>{header}</div>}
				<button
					type="button"
					className={styles.close}
					onClick={onClose}
				>
					<CloseIcon />
				</button>
				{children}
			</div>
		</div>,
		document.getElementById("modals"),
	);
}

Modal.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
	header: PropTypes.string,
	onClose: PropTypes.func,
};

export default Modal;

import { useEffect, useState } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";

import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";

function Modal({ onClose, header, children, ...props }) {
	const [isActive, setActive] = useState(false);

	useEffect(() => {
		setActive(true);
		document.addEventListener("keydown", onKeyDown);

		return () => {
			setActive(false);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, []);

	const onKeyDown = (e) => {
		if (e.code === "Escape") onClose(e);
	};

	return createPortal(
		<div className={`${styles.modal}`}>
			<ModalOverlay onClick={onClose} isActive={isActive} />
			<div
				className={`${styles.modalWindow} ${
					isActive && styles.modalWindowActive
				} p-10 ${header ? "pt-10" : "pt-30"} pb-15`}
			>
				{header && (
					<div
						className={`text text_type_main-large ${styles.header}`}
					>
						{header}
					</div>
				)}
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
		document.getElementById("modals")
	);
}

export default Modal;

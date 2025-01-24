import { useEffect, useState } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";

import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";

function Modal({ closeHandler, header, children, ...props }) {
	const [isActive, setActive] = useState(false);

	useEffect(() => {
		setActive(true);

		return () => {
			setActive(false);
		};
	}, []);

	return createPortal(
		<div className={`${styles.modal}`}>
			<ModalOverlay onClick={closeHandler} isActive={isActive} />
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
					onClick={closeHandler}
					style={{ cursor: "pointer" }}
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

import { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import ModalOverlay from "../modal-overlay/modal-overlay.tsx";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./modal.module.css";

const Modal: FC<{ children: ReactNode; header: boolean; onClose<event>(event: event): void }> = ({ onClose, header, children }) => {
	const modals = document.getElementById("modals");
	if (modals === null) return;
	const [isActive, setActive] = useState(false);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
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
			<ModalOverlay onClick={onClose} isActive={isActive} />
			<div className={`${styles.modalWindow} ${isActive && styles.modalWindowActive} p-10 ${header ? "pt-10" : "pt-30"} pb-15`}>
				<button type="button" className={styles.close} onClick={onClose} data-testid="close-modal-button">
					<CloseIcon type={"primary"} />
				</button>
				{children}
			</div>
		</div>,
		modals
	);
};

export default Modal;

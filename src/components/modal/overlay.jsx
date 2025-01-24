import { useState } from "react";
import { useEffect } from "react";

import styles from './modal.module.css';

function Overlay({onClick, isActive}) {
	return <div onClick={onClick} className={`${styles.overlay} ${isActive && styles.overlayActive}`} />;
}

export default Overlay;

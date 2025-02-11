import styles from "./loader.module.css";

function Loader(props) {
	const { fullscreen } = props;
	return <span className={`${styles.loader} ${fullscreen && styles.fullscreen}`}></span>;
}

export default Loader;

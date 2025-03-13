import styles from "./loader.module.css";

function Loader(props: { fullscreen: boolean; }) {
	const { fullscreen } = props;
	return <span className={`${styles.loader} ${fullscreen && styles.fullscreen}`}></span>;
}

export default Loader;

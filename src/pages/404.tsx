import styles from "./404.module.css";

export function NotFoundPage() {
	return (
		<div className={`${styles.wrap}`}>
			<h1 className="text text_type_digits-large mb-2">404</h1>
			<p className="text text_type_main-medium">Страница не найдена</p>
		</div>
	);
}

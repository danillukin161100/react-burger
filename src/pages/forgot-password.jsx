import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./form-page.module.css";
import { Link } from "react-router";
import { useState } from "react";

export function ForgotPasswordPage() {
	const initialFormData = { login: "" };
	const [formData, setFormData] = useState(initialFormData);

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<form className={styles.wrap}>
			<h1>Восстановление пароля</h1>
			<EmailInput type="email" placeholder="Укажите e-mail" name="login" value={formData.login} onChange={changeHandler} extraClass="mb-6" />
			<Button htmlType="submit">Восстановить</Button>

			<div className="mt-20 text_color_inactive">
				<p>
					Вспомнили пароль?{" "}
					<Link className={styles.link} to="/login">
						Войти
					</Link>
				</p>
			</div>
		</form>
	);
}

import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./form-page.module.css";
import { Link } from "react-router";
import { useState } from "react";

export function ResetPasswordPage() {
	const initialFormData = { password: "", emailCode: "" };
	const [formData, setFormData] = useState(initialFormData);

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<form className={styles.wrap}>
			<h1>Восстановление пароля</h1>
			<PasswordInput placeholder="Введите новый пароль" onChange={changeHandler} value={formData.password} name="password" extraClass="mb-6" />
			<Input
				type="text"
				placeholder="Введите код из письма"
				name="emailCode"
				value={formData.emailCode}
				onChange={changeHandler}
				extraClass="mb-6"
			/>
			<Button htmlType="submit">Сохранить</Button>

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

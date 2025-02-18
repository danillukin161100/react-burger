import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./form-page.module.css";
import { Link } from "react-router";
import { useState } from "react";

export function RegisterPage() {
	const initialFormData = { login: "", password: "", name: "" };
	const [formData, setFormData] = useState(initialFormData);

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<form className={styles.wrap}>
			<h1>Регистрация</h1>
			<Input type="text" placeholder="Имя" name="name" value={formData.name} onChange={changeHandler} extraClass="mb-6" />
			<EmailInput type="email" placeholder="E-mail" name="login" value={formData.login} onChange={changeHandler} extraClass="mb-6" />
			<PasswordInput onChange={changeHandler} value={formData.password} name="password" extraClass="mb-6" />
			<Button htmlType="submit">Зарегистрироваться</Button>

			<div className="mt-20 text_color_inactive">
				<p>
					Уже зарегистрированы?{" "}
					<Link className={styles.link} to="/login">
						Войти
					</Link>
				</p>
			</div>
		</form>
	);
}

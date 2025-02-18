import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./form-page.module.css";
import { Link } from "react-router";
import { useState } from "react";

export function LoginPage() {
	const [passwordType, setPasswordType] = useState("password");
	const initialFormData = { login: "", password: "" };
	const [formData, setFormData] = useState(initialFormData);

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onPasswordIconClick = () => {
		setPasswordType(passwordType === "password" ? "text" : "password");
	};

	return (
		<form className={styles.wrap}>
			<h1>Вход</h1>
			<Input type="email" placeholder="E-mail" name="login" value={formData.login} onChange={changeHandler} extraClass="mb-6" />
			<Input
				type={passwordType}
				placeholder="Пароль"
				name="password"
				value={formData.password}
				onChange={changeHandler}
				onIconClick={onPasswordIconClick}
				icon={passwordType === 'password' ? 'ShowIcon' : 'HideIcon'}
				extraClass="mb-6"
			/>
			<Button htmlType="submit">Войти</Button>

			<div className="mt-20 text_color_inactive">
				<p>
					Вы — новый пользователь?{" "}
					<Link className={styles.link} to="/register">
						Зарегистрироваться
					</Link>
				</p>
				<p>
					Забыли пароль?{" "}
					<Link className={styles.link} to="/forgot-password">
						Восстановить пароль
					</Link>
				</p>
			</div>
		</form>
	);
}

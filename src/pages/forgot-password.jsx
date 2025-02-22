import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./form-page.module.css";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { forgotPasswordRequest } from "../utils/norma-api";

export function ForgotPasswordPage() {
	const initialFormData = { email: "" };
	const [formData, setFormData] = useState(initialFormData);
	const navigate = useNavigate();

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		forgotPasswordRequest(formData).then((res) => {
			if (res.success) navigate("/reset-password");
		});
	};

	return (
		<form className={styles.wrap} onSubmit={submitHandler}>
			<h1>Восстановление пароля</h1>
			<EmailInput type="email" placeholder="Укажите e-mail" name="email" value={formData.email} onChange={changeHandler} extraClass="mb-6" />
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

import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./form-page.module.css";
import { Link, useNavigate } from "react-router";
import { forgotPasswordRequest } from "../../utils/norma-api";
import { useForm } from "../../hooks";
import { FormEvent } from "react";

export function ForgotPasswordPage() {
	const initialFormData = { email: "" };
	const { formData, changeHandler } = useForm(initialFormData);
	const navigate = useNavigate();

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		forgotPasswordRequest(formData).then((res) => {
			if (typeof res === "boolean") return res;
			if (res.success) navigate("/reset-password");
		});
	};

	return (
		<form className={styles.wrap} onSubmit={submitHandler}>
			<h1>Восстановление пароля</h1>
			<EmailInput placeholder="Укажите e-mail" name="email" value={formData.email} onChange={changeHandler} extraClass="mb-6" />
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

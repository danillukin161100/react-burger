import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./form-page.module.css";
import { Link } from "react-router";
import { resetPasswordRequest } from "../utils/norma-api";
import { useForm } from "../hooks/useForm";

export function ResetPasswordPage() {
	const initialFormData = { password: "", token: "" };
	const { formData, changeHandler } = useForm(initialFormData);

	const submitHandler = (e) => {
		e.preventDefault();
		resetPasswordRequest(formData).then((res) => {
			if (res.success) navigate("/login");
		});
	};

	return (
		<form className={styles.wrap} onSubmit={submitHandler}>
			<h1>Восстановление пароля</h1>
			<PasswordInput placeholder="Введите новый пароль" onChange={changeHandler} value={formData.password} name="password" extraClass="mb-6" />
			<Input type="text" placeholder="Введите код из письма" name="token" value={formData.token} onChange={changeHandler} extraClass="mb-6" />
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

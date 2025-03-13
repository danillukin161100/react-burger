import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./form-page.module.css";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../services/user/actions";
import { useAppDispatch, useForm } from "../hooks";
import { FormEvent } from "react";

export function RegisterPage() {
	const initialFormData = { email: "", password: "", name: "" };
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { formData, changeHandler } = useForm(initialFormData);

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(registerUser(formData))
			.unwrap()
			.then((res) => {
				if (typeof res === 'boolean') return;
				if (res.success) navigate("/");
			});
	};

	return (
		<form className={styles.wrap} onSubmit={submitHandler}>
			<h1>Регистрация</h1>
			<Input type="text" placeholder="Имя" name="name" value={formData.name} onChange={changeHandler} extraClass="mb-6" />
			<EmailInput placeholder="E-mail" name="email" value={formData.email} onChange={changeHandler} extraClass="mb-6" />
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

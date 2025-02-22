import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./form-page.module.css";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { loginUser } from "../services/user/actions";
import { useDispatch, useSelector } from "react-redux";

export function LoginPage() {
	const initialFormData = { email: "", password: "" };
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const [formData, setFormData] = useState(initialFormData);

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(loginUser(formData));
	};

	useEffect(() => {
		if (user.email) navigate("/");
	}, [user]);

	return (
		<form className={styles.wrap} onSubmit={submitHandler}>
			<h1>Вход</h1>
			<EmailInput type="email" placeholder="E-mail" name="email" value={formData.email} onChange={changeHandler} extraClass="mb-6" />
			<PasswordInput onChange={changeHandler} value={formData.password} name="password" extraClass="mb-6" />
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

import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import styles from "./profile.module.css";
import { logoutUser, updateUser } from "../services/user/actions";
import { useAppDispatch, useAppSelector, useForm } from "../hooks";

export function ProfilePage() {
	const { email, name } = useAppSelector((state) => state.user);
	const initialFormData = {
		password: "",
		email: typeof email === "string" ? email : "",
		name: typeof name === "string" ? name : "",
	};
	const [isChanged, setIsChanged] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { formData, changeHandler, setFormData } = useForm(initialFormData, () => {
		setIsChanged(true);
	});

	useEffect(() => {
		if (typeof formData === "object") setFormData({ ...formData, email, name });
	}, [email, name]);

	const logoutHandler = (e) => {
		e.preventDefault();
		dispatch(logoutUser());
		navigate("/login");
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateUser(formData));
		setIsChanged(false);
	};

	const resetHandler = () => {
		setFormData(initialFormData);
		setIsChanged(false);
	};

	return (
		<section className={`${styles.wrap}`}>
			<div className={styles.sidebar}>
				<nav className={`${styles.menu} text text_type_main-medium`}>
					<NavLink to="/profile" className={({ isActive }) => `${!isActive && "text_color_inactive"} pt-4 pb-4`}>
						Профиль
					</NavLink>
					<NavLink to="/profile/order" className={({ isActive }) => `${!isActive && "text_color_inactive"} pt-4 pb-4`}>
						История заказов
					</NavLink>
					<Link onClick={logoutHandler} className="pt-4 pb-4 text_color_inactive" to={""}>
						Выход
					</Link>
				</nav>

				<p className={styles.description}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
			</div>

			<form onSubmit={submitHandler}>
				<Input type="text" placeholder="Имя" name="name" value={formData.name || ""} onChange={changeHandler} extraClass="mb-6" />
				<EmailInput
					name="email"
					placeholder="Логин"
					value={formData.email || ""}
					onChange={changeHandler}
					extraClass="mb-6"
				/>
				<PasswordInput
					name="password"
					value={formData.password || ""}
					onChange={changeHandler}
				/>

				{isChanged && (
					<div className={styles.footer}>
						<Button htmlType="button" type="secondary" onClick={resetHandler}>
							Отменить
						</Button>
						<Button htmlType="submit" type="primary">
							Сохранить
						</Button>
					</div>
				)}
			</form>
		</section>
	);
}

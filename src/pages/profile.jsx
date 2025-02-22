import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import styles from "./profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../services/user/actions";

export function ProfilePage() {
	const { email, name } = useSelector((state) => state.user);
	const initialFormData = { email, password: "", name };
	// {
	// 	email: { value: email, disabled: true },
	// 	password: { value: "", disabled: true },
	// 	name: { value: name, disabled: true },
	// }
	const [formData, setFormData] = useState(initialFormData);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		setFormData({ ...formData, email, name });
	}, [email, name]);

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onIconClick = (e) => {};

	const logoutHandler = (e) => {
		e.preventDefault();
		dispatch(logoutUser());
		navigate("/");
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
					<Link onClick={logoutHandler} className="pt-4 pb-4 text_color_inactive">
						Выход
					</Link>
				</nav>

				<p className={styles.description}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
			</div>

			<div>
				<Input
					type="text"
					disabled={true}
					placeholder="Имя"
					name="name"
					value={formData.name || ""}
					onChange={changeHandler}
					onIconClick={onIconClick}
					extraClass="mb-6"
					icon="EditIcon"
				/>
				<EmailInput
					type="email"
					placeholder="Логин"
					name="email"
					value={formData.email || ""}
					onChange={changeHandler}
					isIcon={true}
					extraClass="mb-6"
				/>
				<Input
					placeholder="Пароль"
					disabled={true}
					type="password"
					onChange={changeHandler}
					onIconClick={onIconClick}
					value={formData.password}
					name="password"
					icon="EditIcon"
				/>
			</div>
		</section>
	);
}

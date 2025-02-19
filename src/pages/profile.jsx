import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { NavLink } from "react-router";
import styles from "./profile.module.css";

export function ProfilePage() {
	const initialFormData = { login: "", password: "", name: "" };
	const [formData, setFormData] = useState(initialFormData);

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onIconClick = (e) => {};
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
					<NavLink to="/" className={({ isActive }) => `${!isActive && "text_color_inactive"} pt-4 pb-4`}>
						Выход
					</NavLink>
				</nav>

				<p className={styles.description}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
			</div>

			<div>
				<Input
					type="text"
					disabled={true}
					placeholder="Имя"
					name="name"
					value={formData.name}
					onChange={changeHandler}
					onIconClick={onIconClick}
					extraClass="mb-6"
					icon="EditIcon"
				/>
				<EmailInput
					type="email"
					placeholder="Логин"
					name="login"
					value={formData.login}
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

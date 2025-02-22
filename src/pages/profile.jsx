import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import styles from "./profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../services/user/actions";

export function ProfilePage() {
	const { email, name } = useSelector((state) => state.user);
	// const [formData, setFormData] = useState({
	// 	password: { value: "", disabled: true },
	// 	email: { value: "", disabled: true },
	// 	name: { value: "", disabled: true },
	// });
	const [formData, setFormData] = useState({ password: "", email, name });
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const nameRef = useRef();
	const passRef = useRef();

	// useEffect(() => {
	// 	setFormData({ ...formData, email, name });
	// }, [email, name]);

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onIconClick = (e, key) => {
		// setFormData({ ...formData, [key]: { ...formData[key], disabled: false } });
		e.target.closest(".input__icon").previousElementSibling.focus();
		// e.target.closest(".input__icon").previousElementSibling.focus();
		// switch (key) {
		// 	case "name":
		// 		nameRef.current.focus();
		// 	case "password":
		// 		passRef.current.focus();
		// }
	};

	const logoutHandler = (e) => {
		e.preventDefault();
		dispatch(logoutUser());
		navigate("/");
	};

	const focusHandler = (e) => {
		console.log(e.target.name);
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
					disabled={formData.name?.disabled}
					placeholder="Имя"
					name="name"
					onIconClick={(e) => {
						onIconClick(e, "name");
					}}
					value={formData.name?.value || ""}
					onChange={changeHandler}
					extraClass="mb-6"
					icon="EditIcon"
					ref={nameRef}
					onFocus={focusHandler}
				/>
				<EmailInput
					type="email"
					placeholder="Логин"
					name="email"
					value={formData.email?.value || ""}
					onChange={changeHandler}
					isIcon={true}
					extraClass="mb-6"
				/>
				<Input
					placeholder="Пароль"
					disabled={formData.password?.disabled}
					type="password"
					onChange={changeHandler}
					onIconClick={(e) => {
						onIconClick(e, "password");
					}}
					value={formData.password?.value || ""}
					name="password"
					icon="EditIcon"
					ref={passRef}
					onFocus={focusHandler}
				/>
			</div>
		</section>
	);
}

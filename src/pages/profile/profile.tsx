import { FC, FormEvent, PropsWithChildren } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import styles from "./profile.module.css";
import { logoutUser } from "../../services/user/actions";
import { useAppDispatch } from "../../hooks";
import { ProfileLogin } from "../../components/profile/profile-login";

export const ProfilePage: FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const logoutHandler = (e: FormEvent) => {
		e.preventDefault();
		dispatch(logoutUser());
		navigate("/login");
	};

	return (
		<section className={`${styles.wrap}`}>
			<div className={styles.sidebar}>
				<nav className={`${styles.menu} text text_type_main-medium`}>
					<NavLink to="/profile" className={`${pathname !== "/profile" && "text_color_inactive"} pt-4 pb-4`}>
						Профиль
					</NavLink>
					<NavLink to="/profile/orders" className={({ isActive }) => `${!isActive && "text_color_inactive"} pt-4 pb-4`}>
						История заказов
					</NavLink>
					<Link onClick={logoutHandler} className="pt-4 pb-4 text_color_inactive" to={""}>
						Выход
					</Link>
				</nav>

				<p className={styles.description}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
			</div>

			{children === undefined ? <ProfileLogin /> : children}
		</section>
	);
};

// import styles from "./app-header.module.css";
import styles from "./app-header.module.css";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink, useLocation } from "react-router";
import { useAppSelector } from "../../hooks";

function AppHeader() {
	const { pathname } = useLocation();
	const user = useAppSelector((state) => state.user);

	return (
		<header className={`text text_type_main-default ${styles.header}`}>
			<div className="container">
				<div className={styles.inner}>
					<nav className={styles.menu}>
						<NavLink to="/" className={({ isActive }) => `${isActive && styles.active} ${styles.link} p-5`}>
							<BurgerIcon type={pathname === "/" ? "primary" : "secondary"} className="mr-2" />
							Конструктор
						</NavLink>
						<NavLink to="/feed" className={({ isActive }) => `${isActive && styles.active} ${styles.link} p-5`}>
							<ListIcon type={pathname === "/orders" ? "primary" : "secondary"} className="mr-2" />
							Лента заказов
						</NavLink>
					</nav>
					<Link to="/" className={styles.logo}>
						<Logo />
					</Link>
					<nav className={`${styles.menu} ${styles.right}`}>
						<NavLink to="/profile" className={({ isActive }) => `${isActive && styles.active} ${styles.link} p-5`}>
							<ProfileIcon type={pathname === "/profile" ? "primary" : "secondary"} className="mr-2" />
							{user.name ? user.name : "Личный кабинет"}
						</NavLink>
					</nav>
				</div>
			</div>
		</header>
	);
}

export default AppHeader;

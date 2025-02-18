import styles from "./app-header.module.css";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation } from "react-router";

function AppHeader() {
	const { pathname } = useLocation();

	console.log(pathname);
	return (
		<header className={`text text_type_main-default ${styles.header}`}>
			<div className="container">
				<div className={styles.inner}>
					<nav className={styles.menu}>
						<NavLink to="/" className={({ isActive }) => `${isActive && styles.active} ${styles.link} p-5`}>
							<BurgerIcon type={pathname === "/" ? "primary" : "secondary"} className="mr-2" />
							Конструктор
						</NavLink>
						<NavLink to="/orders" className={({ isActive }) => `${isActive && styles.active} ${styles.link} p-5`}>
							<ListIcon type={pathname === "/orders" ? "primary" : "secondary"} className="mr-2" />
							Лента заказов
						</NavLink>
					</nav>
					<Logo className={styles.logo} />
					<nav className={`${styles.menu} ${styles.right}`}>
						<NavLink to="/profile" className={({ isActive }) => `${isActive && styles.active} ${styles.link} p-5`}>
							<ProfileIcon type={pathname === "/profile" ? "primary" : "secondary"} className="mr-2" />
							Личный кабинет
						</NavLink>
					</nav>
				</div>
			</div>
		</header>
	);
}

export default AppHeader;

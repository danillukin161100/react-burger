import styles from "./app-header.module.css";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import MenuList from "../menu-list/menu-list";
import MenuItem from "../menu-item/menu-item";

function AppHeader() {
	return (
		<header className={`text text_type_main-default ${styles.header}`}>
			<div className="container">
				<div className={styles.inner}>
					<MenuList>
						<MenuItem active={true}>
							<BurgerIcon
								type="primary"
								className="mr-2"
							/>
							Конструктор
						</MenuItem>
						<MenuItem>
							<ListIcon
								type="secondary"
								className="mr-2"
							/>
							Лента заказов
						</MenuItem>
					</MenuList>
					<Logo className={styles.logo} />
					<MenuList justify="right">
						<MenuItem>
							<ProfileIcon
								type="secondary"
								className="mr-2"
							/>
							Личный кабинет
						</MenuItem>
					</MenuList>
				</div>
			</div>
		</header>
	);
}

export default AppHeader;

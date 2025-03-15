import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../../hooks";
import { FC, ReactElement } from "react";

const ProtectedRoute: FC<{ element: ReactElement; anonymous?: boolean }> = ({ element, anonymous = false }) => {
	const isLoggedIn = useAppSelector((store) => store.user.isLoggedIn);
	const location = useLocation();
	const from = location.state?.from || "/";
	// Если разрешен неавторизованный доступ, а пользователь авторизован...
	if (anonymous && isLoggedIn) {
		// ...то отправляем его на предыдущую страницу
		return <Navigate to={from} />;
	}

	// Если требуется авторизация, а пользователь не авторизован...
	if (!anonymous && !isLoggedIn) {
		// ...то отправляем его на страницу логин
		return <Navigate to="/login" state={{ from: location }} />;
	}

	// Если все ок, то рендерим внутреннее содержимое
	return element;
}

export default ProtectedRoute;

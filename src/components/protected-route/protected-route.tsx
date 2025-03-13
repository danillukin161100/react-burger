import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../../hooks";
import { ReactElement } from "react";

function ProtectedRoute({ element, anonymous = false }: { element: ReactElement; anonymous?: boolean }) {
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

ProtectedRoute.propTypes = {
	element: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
	to: PropTypes.string,
};

export default ProtectedRoute;

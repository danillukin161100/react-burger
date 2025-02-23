import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { getCookie } from "../../utils/cookies";

function ProtectedRoute({ element, to }) {
	const navigate = useNavigate();
	const isAuth = +getCookie("isAuth");
	const { pathname } = useLocation();
	useEffect(() => {
		if (!isAuth) {
			navigate("/login", { state: { backlink: pathname === "/profile" ? "/" : pathname } });
		} else {
			navigate("/profile");
		}
	}, []);
	return element;
}

ProtectedRoute.propTypes = {
	element: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
	to: PropTypes.string,
};

export default ProtectedRoute;

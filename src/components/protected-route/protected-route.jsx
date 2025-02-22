import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getCookie } from "../../utils/cookies";

function ProtectedRoute({ element, to }) {
	const navigate = useNavigate();
	const isAuth = +getCookie("isAuth");
	useEffect(() => {
		if (isAuth) navigate("/profile");
		else navigate("/login");
	}, []);
	return element;
}

ProtectedRoute.propTypes = {
	element: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
	to: PropTypes.string,
};

export default ProtectedRoute;

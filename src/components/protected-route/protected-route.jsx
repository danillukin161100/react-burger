import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getCookie } from "../../utils/cookies";

function ProtectedRoute({ element, to }) {
	const navigate = useNavigate();
	const isAuth = +getCookie('isAuth');
	if (!to) to = "/login";
	useEffect(() => {
		if (!isAuth) navigate(to);
	}, []);
	return element;
}

export default ProtectedRoute;

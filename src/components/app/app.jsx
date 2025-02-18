import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { HomePage, NotFoundPage, ProfilePage, ResetPasswordPage, ForgotPasswordPage, RegisterPage, LoginPage } from "../../pages/";
import AppHeader from "../app-header/app-header.jsx";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadIngredients } from "../../services/ingredients/actions.js";
import Loader from "../loader/loader.jsx";
import Modal from "../modal/modal.jsx";

function App() {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const { state } = location;
	const { loading } = useSelector((store) => store.ingredients);

	useEffect(() => {
		dispatch(loadIngredients());
	}, []);

	if (loading) return <Loader fullscreen={true} />;

	return (
		<>
			<AppHeader />
			<main className="container text text_type_main-default">
				{state?.backgroundLocation && (
					<Routes>
						<Route
							path="/ingredients/:id"
							element={
								<Modal
									header={true}
									onClose={() => {
										navigate(-1);
									}}
								>
									<IngredientDetails />
								</Modal>
							}
						/>
					</Routes>
				)}
				<Routes location={state?.backgroundLocation || location}>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/forgot-password" element={<ForgotPasswordPage />} />
					<Route path="/reset-password" element={<ResetPasswordPage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/ingredients/:id" element={<IngredientDetails />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
		</>
	);
}

export default App;

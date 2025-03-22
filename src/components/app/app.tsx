import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { HomePage, NotFoundPage, ProfilePage, ResetPasswordPage, ForgotPasswordPage, RegisterPage, LoginPage, FeedPage } from "../../pages/index.ts";
import AppHeader from "../app-header/app-header.jsx";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details.tsx";
import { useEffect } from "react";
import { loadIngredients } from "../../services/ingredients/actions.ts";
import Loader from "../loader/loader.tsx";
import Modal from "../modal/modal.tsx";
import { getUser } from "../../services/user/actions.ts";
import ProtectedRoute from "../protected-route/protected-route.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/index.ts";

function App() {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const { state } = location;
	const { loading } = useAppSelector((store) => store.ingredients);

	useEffect(() => {
		dispatch(loadIngredients());
		dispatch(getUser());
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
					<Route path="/login" element={<ProtectedRoute element={<LoginPage />} anonymous={true} />} />
					<Route path="/register" element={<ProtectedRoute element={<RegisterPage />} anonymous={true} />} />
					<Route path="/forgot-password" element={<ProtectedRoute element={<ForgotPasswordPage />} anonymous={true} />} />
					<Route path="/reset-password" element={<ProtectedRoute element={<ResetPasswordPage />} anonymous={true} />} />
					<Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
					<Route path="/ingredients/:id" element={<IngredientDetails />} />
					<Route path="/feed/" element={<FeedPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
		</>
	);
}

export default App;

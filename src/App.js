import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./app/components/auth/Login";
import Register from "./app/components/auth/Register";
import ResetPassword from "./app/components/auth/ResetPassword";
import { GlobalProvider } from "./app/contexts/globalContext";
import { pathAuth, pathDashboard } from "./app/routes/Path";
import ProtectedRoute from "./app/shared/utils/protected-routes/ProtectedRoute";
import RestrictAuth from "./app/shared/utils/protected-routes/RestrictAuth";
import { AppModule } from "./modules";

function App() {
	return (
		<GlobalProvider>
			<Routes>
				<Route
					path={`${pathDashboard}/*`}
					element={
						<ProtectedRoute>
							<AppModule />
						</ProtectedRoute>
					}
				/>
				<Route path={`${pathAuth}/*`}>
					<Route
						path="login"
						element={
							<RestrictAuth>
								<Login />
							</RestrictAuth>
						}
					/>
					<Route
						path="register"
						element={
							<RestrictAuth>
								<Register />
							</RestrictAuth>
						}
					/>
					<Route
						path="reset-password"
						element={
							<RestrictAuth>
								<ResetPassword />
							</RestrictAuth>
						}
					/>
				</Route>
				<Route
					path="*"
					element={<Navigate to={`${pathDashboard}`} replace />}
				/>
			</Routes>
		</GlobalProvider>
	);
}

export default App;

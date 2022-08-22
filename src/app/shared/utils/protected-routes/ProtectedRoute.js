import { Navigate, useLocation } from "react-router-dom";
import { useGlobal } from "../../../contexts/globalContext";
import { pathAuth, pathDashboard } from "../../../routes/Path";

export default function ProtectedRoute({ children }) {
	const { user, isConfComplete } = useGlobal();
	const location = useLocation();
	const intoConf = location.pathname.split("/").includes("configuracion");

	if (user !== undefined) {
		if (!user) return <Navigate to={`${pathAuth}/login`} />;
		if (!isConfComplete && !intoConf)
			return <Navigate to={`${pathDashboard}/configuracion`} />;
		return <>{children}</>;
	}
}

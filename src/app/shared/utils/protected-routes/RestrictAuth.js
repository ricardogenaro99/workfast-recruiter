import { Navigate } from "react-router-dom";
import { useGlobal } from "../../../contexts/globalContext";
import { pathDashboard } from "../../../routes/Path";

export default function RestrictAuth({ children }) {
	const { user } = useGlobal();
	if (user) return <Navigate to={`${pathDashboard}`} />;
	return <>{children}</>;
}

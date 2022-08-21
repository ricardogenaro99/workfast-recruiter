import { Navigate } from "react-router-dom";
import { useGlobal } from "../../../contexts/globalContext";
import { pathAuth } from "../../../routes/Path";

export default function ProtectedRoute({ children }) {
	const { user } = useGlobal();

	if (user !== undefined) {
		if (!user) return <Navigate to={`${pathAuth}/login`} />;
		return <>{children}</>;
	}
}

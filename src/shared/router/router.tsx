import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/use-general.context";

export const PrivateRoute = () => {
	const { tokenContext } = useAuthContext();

	return tokenContext ? <Outlet /> : <Navigate to="/" />;
};

export const PublicRoute = () => {
	const { tokenContext } = useAuthContext();
	return !tokenContext ? <Outlet /> : <Navigate to="/planes" />;
};

import { Navigate, Outlet } from "react-router-dom"
import auth from "../lib/auth"

const requireAuth = () => {
	if (!auth.isSignedIn()) {
		return <Navigate to="/sign-in" replace />
	} else {
		return <Outlet />
	}
}

export default requireAuth

import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import userStore from "../store/userStore";
import useAlertStore from "../store/alertStore";

export default function ProtectedRoute() {
  const token = userStore((state) => state.token);
  const hasHydrated = userStore((state) => state.hasHydrated);
  const setAlert = useAlertStore((state) => state.setAlert);

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (hasHydrated && !token) {
      setAlert("danger", "Please login to access this page.");
      setRedirect(true);
    }
  }, [hasHydrated, token, setAlert]);

  if (!hasHydrated) return null;

  if (!token && redirect) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

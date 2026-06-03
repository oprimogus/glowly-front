import { Navigate, useLocation } from "react-router";
import { useAuth, ALLOWED_ROUTES } from "../contexts/AuthContext";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  const allowed = ALLOWED_ROUTES[user.role];
  const currentPath = location.pathname;

  // Verifica se a rota atual (ou prefixo) está permitida
  const isAllowed = allowed.some(
    (route) => currentPath === route || currentPath.startsWith(route + "/")
  );

  if (!isAllowed) {
    return <Navigate to="/portal" replace />;
  }

  return <>{children}</>;
}

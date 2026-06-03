import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { ArrowLeft, LogOut } from "lucide-react";
import { useAuth, ROLE_LABELS, UserRole } from "../contexts/AuthContext";

const ROLE_COLORS: Record<UserRole, string> = {
  client: "bg-pink-100 text-pink-700",
  professional: "bg-blue-100 text-blue-700",
  admin: "bg-purple-100 text-purple-700",
};

interface PageHeaderProps {
  backTo?: string;
  backLabel?: string;
}

export function PageHeader({ backTo = "/portal", backLabel = "Voltar ao Portal" }: PageHeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <Link to={backTo}>
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {backLabel}
        </Button>
      </Link>

      {user && (
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold overflow-hidden ${ROLE_COLORS[user.role]}`}>
            {user.avatar.startsWith("http") ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user.avatar
            )}
          </div>
          <span className="text-sm text-gray-600 hidden sm:inline">{user.name}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full hidden sm:inline ${ROLE_COLORS[user.role]}`}>
            {ROLE_LABELS[user.role]}
          </span>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-400 hover:text-gray-600 p-1">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

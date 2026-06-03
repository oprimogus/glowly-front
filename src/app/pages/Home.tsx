import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Calendar, Scissors, Users, LayoutDashboard, LogOut, ChevronRight } from "lucide-react";
import { useAuth, UserRole, ROLE_LABELS } from "../contexts/AuthContext";

const ROLE_COLORS: Record<UserRole, string> = {
  client: "bg-pink-100 text-pink-700",
  professional: "bg-blue-100 text-blue-700",
  admin: "bg-purple-100 text-purple-700",
};

const ROLE_GREETINGS: Record<UserRole, string> = {
  client: "O que você gostaria de fazer hoje?",
  professional: "Sua agenda de trabalho",
  admin: "Painel de gerenciamento",
};

export function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  if (!user) return null;

  const roleColor = ROLE_COLORS[user.role];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 max-w-6xl flex items-center justify-between">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Glowly
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold overflow-hidden ${roleColor}`}>
                {user.avatar.startsWith("http") ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.avatar
                )}
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900 leading-none">{user.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{ROLE_LABELS[user.role]}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-500 hover:text-gray-700">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline ml-1">Sair</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Olá, {user.name.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-500 mt-1">{ROLE_GREETINGS[user.role]}</p>
        </div>

        {/* Cards para CLIENTE */}
        {user.role === "client" && (
          <div className="grid md:grid-cols-2 gap-5 max-w-2xl">
            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <div className="w-11 h-11 bg-pink-100 rounded-xl flex items-center justify-center mb-3">
                  <Calendar className="w-5 h-5 text-pink-600" />
                </div>
                <CardTitle className="text-lg">Agendar Serviço</CardTitle>
                <CardDescription>Escolha seu serviço e horário preferido</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/agendar">
                  <Button className="w-full" style={{ background: "linear-gradient(135deg, #ec4899, #9333ea)" }}>
                    Agendar Agora
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                  <Scissors className="w-5 h-5 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Meus Agendamentos</CardTitle>
                <CardDescription>Veja e gerencie seus horários marcados</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/meus-agendamentos">
                  <Button variant="outline" className="w-full">
                    Ver Agendamentos
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Cards para PROFISSIONAL */}
        {user.role === "professional" && (
          <div className="max-w-sm">
            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Minha Agenda</CardTitle>
                <CardDescription>Veja seus atendimentos e confirme horários</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/profissional/agenda">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Abrir Agenda
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Cards para ADMIN */}
        {user.role === "admin" && (
          <div className="grid md:grid-cols-3 gap-5">
            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                  <LayoutDashboard className="w-5 h-5 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Dashboard</CardTitle>
                <CardDescription>Métricas e próximos agendamentos</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/admin">
                  <Button className="w-full" style={{ background: "linear-gradient(135deg, #9333ea, #4c0d5f)" }}>
                    Abrir Painel
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <div className="w-11 h-11 bg-pink-100 rounded-xl flex items-center justify-center mb-3">
                  <Scissors className="w-5 h-5 text-pink-600" />
                </div>
                <CardTitle className="text-lg">Serviços</CardTitle>
                <CardDescription>Gerencie serviços e preços</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/admin/servicos">
                  <Button variant="outline" className="w-full">
                    Gerenciar
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Profissionais</CardTitle>
                <CardDescription>Gerencie a equipe e horários</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/admin/profissionais">
                  <Button variant="outline" className="w-full">
                    Gerenciar
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

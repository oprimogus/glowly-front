import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { Card, CardContent } from "../components/ui/card";
import { useAuth, DEFAULT_ROUTE } from "../contexts/AuthContext";
import { Scissors, Mail, Lock, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function Login() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = (location.state as { from?: string })?.from;

  useEffect(() => {
    let navTimer: any;

    if (user && !loading) {
      const destination = from && from !== "/login" ? from : DEFAULT_ROUTE[user.role];
      console.log("Redirecting to:", destination);
      
      // Pequeno atraso para garantir que o router está pronto
      navTimer = setTimeout(() => {
        navigate(destination, { replace: true });
      }, 100);
    }

    return () => {
      if (navTimer) clearTimeout(navTimer);
    };
  }, [user, loading, navigate, from]);

  const handleGoogleLogin = async () => {
    try {
      setIsLoggingIn(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/login",
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error("Erro ao entrar com Google: " + error.message);
      setIsLoggingIn(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    try {
      setIsLoggingIn(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setIsLoggingIn(false);
        throw error;
      }
      toast.success("Login realizado com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao entrar: " + error.message);
      setIsLoggingIn(false);
    }
  };

  if (loading || (user && isLoggingIn)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center pt-12 pb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Glowly
          </h1>
          <p className="text-gray-500 text-sm mt-1">Salão de Beleza</p>
        </div>
      </div>

      {/* Card principal */}
      <div className="flex-1 flex items-start justify-center px-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardContent className="pt-8 pb-8 px-8">
              <div className="text-center mb-8">
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #ec4899, #9333ea)" }}
                >
                  <Scissors className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Bem-vindo</h2>
                <p className="text-gray-500 mt-2 text-sm">
                  Acesse sua conta para gerenciar seus agendamentos
                </p>
              </div>

              {/* Login por Email */}
              <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoggingIn}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <button type="button" className="text-xs text-pink-600 hover:text-pink-700 font-medium">
                      Esqueceu a senha?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoggingIn}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : "Entrar"}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100" />
                </div>
                <div className="relative flex justify-center text-xs text-gray-400 bg-white px-2 w-fit mx-auto">
                  ou
                </div>
              </div>

              {/* Botão Google */}
              

              <div className="mt-8 text-center text-sm text-gray-500">
                Não tem uma conta?{" "}
                <Link to="/signup" className="text-pink-600 hover:text-pink-700 font-medium">
                  Cadastre-se
                </Link>
              </div>

              <div className="mt-4 text-center text-xs text-gray-400">
                Ao entrar, você concorda com nossos Termos de Uso e Política de Privacidade.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="py-6 text-center text-xs text-gray-400">
        © 2026 Glowly · Todos os direitos reservados
      </div>
    </div>
  );
}

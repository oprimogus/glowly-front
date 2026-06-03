import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Card, CardContent } from "../components/ui/card";
import { useAuth, UserRole } from "../contexts/AuthContext";
import { Scissors, Mail, Lock, User, Loader2, Briefcase } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";

export function Signup() {
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isProfessional, setIsProfessional] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !phone) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    const role: UserRole = isProfessional ? "professional" : "client";

    try {
      setIsSigningUp(true);
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone: phone,
            role: role,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Criar perfil manualmente se o trigger não estiver configurado
        await supabase.from("profiles").upsert({
          id: data.user.id,
          name: name,
          email: email,
          phone: phone,
          role: role,
        });

        if (data.session) {
          toast.success("Conta criada com sucesso!");
          navigate("/portal");
        } else {
          toast.success("Verifique seu e-mail para confirmar a conta!");
          navigate("/login");
        }
      }
    } catch (error: any) {
      toast.error("Erro ao criar conta: " + error.message);
    } finally {
      setIsSigningUp(false);
    }
  };

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

      <div className="flex-1 flex items-start justify-center px-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardContent className="pt-8 pb-8 px-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Criar conta</h2>
                <p className="text-gray-500 mt-2 text-sm">
                  Junte-se ao Glowly e agende seus serviços
                </p>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      placeholder="Seu nome"
                      className="pl-10"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSigningUp}
                    />
                  </div>
                </div>

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
                      disabled={isSigningUp}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(11) 98765-4321"
                      className="pl-10"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isSigningUp}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="No mínimo 6 caracteres"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isSigningUp}
                    />
                  </div>
                </div>

                {/* Opção Profissional */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100 text-pink-600">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Sou um profissional</p>
                      <p className="text-xs text-gray-500">Quero gerenciar minha agenda</p>
                    </div>
                  </div>
                  <Switch
                    checked={isProfessional}
                    onCheckedChange={setIsProfessional}
                    disabled={isSigningUp}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSigningUp}
                  className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSigningUp ? <Loader2 className="w-5 h-5 animate-spin" /> : "Criar conta"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-pink-600 hover:text-pink-700 font-medium">
                  Faça login
                </Link>
              </p>
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

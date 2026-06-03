import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../../lib/supabase";

export type UserRole = "client" | "professional" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (user: AuthUser) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Função única para processar qualquer mudança de sessão
    const handleAuth = async (session: any) => {
      if (!mounted) return;

      try {
        if (session?.user) {
          // Passamos o status de 'mounted' para a função
          await fetchProfile(session.user.id, session.user.email || "", () => mounted);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Erro no processamento de auth:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    // 1. Verificar sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleAuth(session);
    });

    // 2. Ouvir mudanças
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleAuth(session);
    });

    // 3. Timeout de segurança absoluto
    const safetyTimer = setTimeout(() => {
      if (mounted && loading) {
        console.warn("Safety timeout atingido");
        setLoading(false);
      }
    }, 8000);

    return () => {
      mounted = false;
      clearTimeout(safetyTimer);
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string, email: string, isMounted: () => boolean) => {
    try {
      // Tenta buscar o perfil
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle(); // maybeSingle evita erro se não encontrar nada

      if (error) {
        console.warn("Aviso ao buscar perfil (pode ser tabela inexistente):", error.message);
        throw error;
      }

      if (isMounted() && data) {
        setUser({
          id: data.id,
          name: data.name || email.split("@")[0],
          email: data.email || email,
          phone: data.phone || "",
          role: (data.role as UserRole) || "client",
          avatar: data.avatar_url || (data.name ? data.name[0].toUpperCase() : email[0].toUpperCase()),
        });
        return;
      }
    } catch (error) {
      console.error("Erro em fetchProfile:", error);
    }

    // Fallback se algo der errado ou perfil não existir
    if (isMounted()) {
      setUser({
        id: userId,
        email,
        name: email.split("@")[0],
        phone: "",
        role: "client",
        avatar: email[0].toUpperCase(),
      });
    }
  };

  const login = (u: AuthUser) => setUser(u);
  
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  client: "Cliente",
  professional: "Profissional",
  admin: "Dono do Salão",
};

// Rotas permitidas por papel
export const ALLOWED_ROUTES: Record<UserRole, string[]> = {
  client: ["/portal", "/agendar", "/meus-agendamentos"],
  professional: ["/portal", "/profissional/agenda"],
  admin: ["/portal", "/admin", "/admin/servicos", "/admin/profissionais"],
};

// Rota de entrada padrão por papel
export const DEFAULT_ROUTE: Record<UserRole, string> = {
  client: "/portal",
  professional: "/profissional/agenda",
  admin: "/admin",
};

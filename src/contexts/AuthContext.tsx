import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se o usuário já está logado (via localStorage)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Verificando autenticação...");
        const storedUser = localStorage.getItem("erp_user");
        if (storedUser) {
          console.log("Usuário encontrado no localStorage");
          setUser(JSON.parse(storedUser));
        } else {
          console.log("Nenhum usuário encontrado no localStorage");
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Função de login simulada
  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("Iniciando processo de login no AuthContext...");
    setIsLoading(true);

    try {
      // Simulando uma chamada de API com delay
      return await new Promise((resolve) => {
        setTimeout(() => {
          // Credenciais simuladas para demonstração
          if (email === "usuario@exemplo.com" && password === "senha123") {
            console.log("Credenciais válidas, criando sessão...");
            const userData: User = {
              id: "1",
              name: "Usuário Demo",
              email: "usuario@exemplo.com",
              role: "admin",
            };

            setUser(userData);
            localStorage.setItem("erp_user", JSON.stringify(userData));
            console.log("Sessão criada com sucesso");
            resolve(true);
          } else {
            console.log("Credenciais inválidas");
            resolve(false);
          }
        }, 1000);
      });
    } catch (error) {
      console.error("Erro durante o login:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("erp_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

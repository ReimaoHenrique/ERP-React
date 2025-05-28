import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("senha123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Efeito para logar quando o email muda
  useEffect(() => {
    console.log("Email atualizado:", email);
  }, [email]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    console.log("Alterando email para:", newEmail);
    setEmail(newEmail);
  };

  // Obtém a rota de origem, se existir
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    console.log("Iniciando processo de login...");

    try {
      console.log("Tentando fazer login com:", { email });
      const success = await login(email, password);
      console.log("Resultado do login:", success);

      if (success) {
        console.log("Login bem sucedido, redirecionando para:", from);
        navigate(from, { replace: true });
      } else {
        console.log("Login falhou: credenciais inválidas");
        setError("Credenciais inválidas. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro durante o login:", err);
      setError(
        "Ocorreu um erro ao tentar fazer login. Por favor, tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Se estiver carregando o estado de autenticação, mostra um indicador
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <p className="text-lg">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">ERP React</h1>
          <p className="mt-2 text-muted-foreground">
            Faça login para acessar o sistema
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleEmailChange}
                onFocus={() => console.log("Campo de email focado")}
                onBlur={() => console.log("Campo de email perdeu o foco")}
                placeholder="Digite seu email"
                style={{ color: "#000000" }}
                className="w-full px-3 py-2 mt-1 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black placeholder-gray-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ color: "#000000" }}
                className="w-full px-3 py-2 mt-1 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black placeholder-gray-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-primary border-input rounded focus:ring-primary"
              />
              <label htmlFor="remember-me" className="block ml-2 text-sm">
                Lembrar-me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary hover:text-primary/80"
              >
                Esqueceu a senha?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || authLoading}
              className="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Use as credenciais padrão para demonstração:</p>
            <p>Email: usuario@exemplo.com</p>
            <p>Senha: senha123</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

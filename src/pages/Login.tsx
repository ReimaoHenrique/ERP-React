import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Logo = () => (
  <a
    href="https://datasynk.com"
    target="_blank"
    rel="noopener noreferrer"
    className="absolute bottom-4 right-4 hover:opacity-50 transition-opacity"
  >
    <svg
      width="40"
      height="30"
      viewBox="0 0 633 477"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-30"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M438.532 66.6987L577.795 63.4213C599.573 62.9105 617.779 79.9789 618.715 101.772L632.028 421.092C632.964 443.183 615.822 461.826 593.746 462.72L274.428 476.043L376.472 114.882C384.341 86.9169 409.523 67.3798 438.532 66.6987Z"
        fill="#155DFC"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M200.841 409.174L45.3718 412.834C28.6977 413.217 14.7885 400.192 14.1079 383.507L0.0284641 45.5441C-0.694648 28.646 12.449 14.3868 29.2932 13.7058L358.012 0L254.096 367.843C247.333 391.807 225.725 408.578 200.841 409.174Z"
        fill="#155DFC"
      />
      <path
        d="M192.376 81.4686L94.2457 188.178C85.3557 197.84 85.9512 212.951 95.6494 221.847L118.406 242.788C128.062 251.684 143.162 251.089 152.052 241.384L229.212 157.446C249.672 135.185 248.226 100.538 225.98 80.0214C216.324 71.168 201.266 71.7639 192.376 81.4686Z"
        fill="#281E28"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M213.176 230.785L232.318 248.407C242.058 257.388 242.696 272.541 233.721 282.331L216.111 301.485C207.136 311.232 191.993 311.871 182.21 302.89L163.069 285.268C153.328 276.287 152.69 261.134 161.665 251.344L179.275 232.19C188.25 222.443 203.436 221.804 213.176 230.785Z"
        fill="#281E28"
      />
      <path
        d="M438.149 399.809L545.765 282.757C552.061 275.946 551.593 265.305 544.787 259.006L511.694 228.529C504.888 222.23 494.254 222.698 487.959 229.508L410.799 313.446C387.702 338.559 389.318 377.676 414.414 400.788C421.262 407.045 431.854 406.62 438.149 399.809Z"
        fill="#281E28"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M427.303 250.11L397.74 222.911C390.849 216.569 390.424 205.885 396.762 198.99L423.942 169.407C430.28 162.512 440.957 162.086 447.848 168.428L477.41 195.627C484.301 201.969 484.726 212.653 478.388 219.548L451.208 249.131C444.87 255.984 434.151 256.409 427.303 250.11Z"
        fill="#281E28"
      />
    </svg>
  </a>
);

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
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-xl shadow-lg relative">
        <Logo />
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

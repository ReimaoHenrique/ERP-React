import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./components/layout/MainLayout";
import { useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";

// Lazy loading dos módulos
const Dashboard = lazy(() => import("./modules/dashboard/Dashboard"));
const Financeiro = lazy(() => import("./modules/financeiro/Financeiro"));
const Vendas = lazy(() => import("./modules/vendas/Vendas"));

// Componente para proteger rotas
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Verificando autenticação...
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redireciona para login, mas mantém a URL original como state para redirecionamento após login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Rotas protegidas */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-full">
                    Carregando módulo...
                  </div>
                }
              >
                <Outlet />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="financeiro/*" element={<Financeiro />} />
        <Route path="vendas/*" element={<Vendas />} />
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Route>
    </Routes>
  );
}

export default App;

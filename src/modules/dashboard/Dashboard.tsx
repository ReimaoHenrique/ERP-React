import { FiHome } from 'react-icons/fi';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <FiHome className="text-primary text-xl" />
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cards de resumo */}
        <div className="bg-card p-4 rounded-lg shadow border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Faturamento Mensal</h3>
          <p className="text-2xl font-bold mt-2">R$ 125.400</p>
          <span className="text-green-500 text-sm">+12% em relação ao mês anterior</span>
        </div>
        
        <div className="bg-card p-4 rounded-lg shadow border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Vendas Realizadas</h3>
          <p className="text-2xl font-bold mt-2">284</p>
          <span className="text-green-500 text-sm">+8% em relação ao mês anterior</span>
        </div>
        
        <div className="bg-card p-4 rounded-lg shadow border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Novos Clientes</h3>
          <p className="text-2xl font-bold mt-2">32</p>
          <span className="text-green-500 text-sm">+15% em relação ao mês anterior</span>
        </div>
        
        <div className="bg-card p-4 rounded-lg shadow border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Itens em Estoque</h3>
          <p className="text-2xl font-bold mt-2">1.250</p>
          <span className="text-red-500 text-sm">-3% em relação ao mês anterior</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg shadow border border-border">
          <h2 className="text-xl font-semibold mb-4">Resumo Financeiro</h2>
          <div className="h-64 flex items-center justify-center bg-accent/30 rounded">
            <p className="text-muted-foreground">Gráfico de Fluxo de Caixa será exibido aqui</p>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow border border-border">
          <h2 className="text-xl font-semibold mb-4">Vendas Recentes</h2>
          <div className="h-64 flex items-center justify-center bg-accent/30 rounded">
            <p className="text-muted-foreground">Gráfico de Vendas será exibido aqui</p>
          </div>
        </div>
      </div>
      
      <div className="bg-card p-6 rounded-lg shadow border border-border">
        <h2 className="text-xl font-semibold mb-4">Atividades Recentes</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-start pb-4 border-b border-border last:border-0">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <span className="text-primary font-medium">{item}</span>
              </div>
              <div>
                <p className="font-medium">Pedido #{1000 + item} foi processado</p>
                <p className="text-sm text-muted-foreground">Cliente: Empresa {item} Ltda.</p>
                <p className="text-xs text-muted-foreground mt-1">Há {item} hora{item !== 1 ? 's' : ''} atrás</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { FiDollarSign } from 'react-icons/fi';

// Importação dos componentes que serão implementados na próxima etapa
const GraficoFluxoCaixa = () => (
  <div className="h-80 flex items-center justify-center bg-accent/30 rounded">
    <p className="text-muted-foreground">Gráfico de Fluxo de Caixa será implementado aqui</p>
  </div>
);

const Financeiro = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <FiDollarSign className="text-primary text-xl" />
        <h1 className="text-2xl font-bold">Financeiro</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-lg shadow border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Receitas (Mês)</h3>
          <p className="text-2xl font-bold mt-2">R$ 85.400</p>
          <span className="text-green-500 text-sm">+8% em relação ao mês anterior</span>
        </div>
        
        <div className="bg-card p-4 rounded-lg shadow border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Despesas (Mês)</h3>
          <p className="text-2xl font-bold mt-2">R$ 42.300</p>
          <span className="text-red-500 text-sm">+5% em relação ao mês anterior</span>
        </div>
        
        <div className="bg-card p-4 rounded-lg shadow border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Saldo</h3>
          <p className="text-2xl font-bold mt-2">R$ 43.100</p>
          <span className="text-green-500 text-sm">+11% em relação ao mês anterior</span>
        </div>
      </div>
      
      <div className="bg-card p-6 rounded-lg shadow border border-border">
        <h2 className="text-xl font-semibold mb-4">Fluxo de Caixa (Últimos 5 meses)</h2>
        <GraficoFluxoCaixa />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg shadow border border-border">
          <h2 className="text-xl font-semibold mb-4">Contas a Pagar</h2>
          <div className="space-y-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex justify-between items-center p-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">Fornecedor {item}</p>
                  <p className="text-sm text-muted-foreground">Vencimento: {item + 10}/06/2025</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">R$ {(item * 1250).toFixed(2)}</p>
                  <span className={`text-xs ${item === 1 ? 'text-red-500' : 'text-muted-foreground'}`}>
                    {item === 1 ? 'Atrasado' : 'Em dia'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow border border-border">
          <h2 className="text-xl font-semibold mb-4">Contas a Receber</h2>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex justify-between items-center p-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">Cliente {item}</p>
                  <p className="text-sm text-muted-foreground">Vencimento: {item + 5}/06/2025</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">R$ {(item * 2350).toFixed(2)}</p>
                  <span className="text-xs text-muted-foreground">Em dia</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financeiro;

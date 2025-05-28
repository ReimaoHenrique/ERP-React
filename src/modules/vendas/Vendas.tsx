import { FiShoppingCart } from 'react-icons/fi';

// Importação dos componentes que serão implementados na próxima etapa
const GraficoVendasDiarias = () => (
  <div className="h-80 flex items-center justify-center bg-accent/30 rounded">
    <p className="text-muted-foreground">Gráfico de Vendas Diárias será implementado aqui</p>
  </div>
);

const Vendas = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <FiShoppingCart className="text-primary text-xl" />
        <h1 className="text-2xl font-bold">Vendas</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-lg shadow border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Vendas Hoje</h3>
          <p className="text-2xl font-bold mt-2">R$ 2.300</p>
          <span className="text-green-500 text-sm">+15% em relação a ontem</span>
        </div>
        
        <div className="bg-card p-4 rounded-lg shadow border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Vendas na Semana</h3>
          <p className="text-2xl font-bold mt-2">R$ 11.900</p>
          <span className="text-green-500 text-sm">+8% em relação à semana anterior</span>
        </div>
        
        <div className="bg-card p-4 rounded-lg shadow border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Ticket Médio</h3>
          <p className="text-2xl font-bold mt-2">R$ 420</p>
          <span className="text-red-500 text-sm">-3% em relação ao mês anterior</span>
        </div>
      </div>
      
      <div className="bg-card p-6 rounded-lg shadow border border-border">
        <h2 className="text-xl font-semibold mb-4">Vendas Diárias (Últimos 7 dias)</h2>
        <GraficoVendasDiarias />
      </div>
      
      <div className="bg-card p-6 rounded-lg shadow border border-border">
        <h2 className="text-xl font-semibold mb-4">Pedidos Recentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-2 text-left">Pedido</th>
                <th className="px-4 py-2 text-left">Cliente</th>
                <th className="px-4 py-2 text-left">Data</th>
                <th className="px-4 py-2 text-left">Valor</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">#{1000 + item}</td>
                  <td className="px-4 py-3">Cliente {item}</td>
                  <td className="px-4 py-3">{26 - item}/05/2025</td>
                  <td className="px-4 py-3">R$ {(item * 350 + 100).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item === 1 ? 'bg-green-100 text-green-800' : 
                      item === 2 ? 'bg-blue-100 text-blue-800' : 
                      item === 3 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item === 1 ? 'Entregue' : 
                       item === 2 ? 'Em trânsito' : 
                       item === 3 ? 'Em processamento' : 
                       'Aguardando pagamento'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Vendas;

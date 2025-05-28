import { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';

// Dados mock diretamente no componente para evitar problemas de importação
const dadosFinanceiro = [
  { mes: "Jan", entrada: 4000, saida: 2500 },
  { mes: "Fev", entrada: 3000, saida: 1800 },
  { mes: "Mar", entrada: 5000, saida: 3200 },
  { mes: "Abr", entrada: 4500, saida: 2800 },
  { mes: "Mai", entrada: 6000, saida: 3500 }
];

const GraficoFluxoCaixa = () => {
  const [data, setData] = useState<typeof dadosFinanceiro>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando uma chamada de API
    setTimeout(() => {
      setData(dadosFinanceiro);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div className="flex items-center justify-center h-80">Carregando dados...</div>;

  return (
    <div className="h-80">
      <ResponsiveBar
        data={data}
        keys={['entrada', 'saida']}
        indexBy="mes"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#4ade80', '#f87171']} // Verde para entradas, vermelho para saídas
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Mês',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Valor (R$)',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        theme={{
          tooltip: {
            container: {
              background: 'var(--card)',
              color: 'var(--card-foreground)',
              fontSize: '12px',
              borderRadius: '4px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            },
          },
          axis: {
            ticks: {
              text: {
                fill: 'var(--muted-foreground)',
              },
            },
            legend: {
              text: {
                fill: 'var(--foreground)',
              },
            },
          },
          legends: {
            text: {
              fill: 'var(--foreground)',
            },
          },
        }}
      />
    </div>
  );
};

export default GraficoFluxoCaixa;

import { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';

// Dados mock diretamente no componente para evitar problemas de importação
const dadosVendas = [
  { data: "2025-05-01", valor: 1200 },
  { data: "2025-05-02", valor: 1500 },
  { data: "2025-05-03", valor: 1100 },
  { data: "2025-05-04", valor: 1800 },
  { data: "2025-05-05", valor: 2100 },
  { data: "2025-05-06", valor: 1900 },
  { data: "2025-05-07", valor: 2300 }
];

const GraficoVendasDiarias = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando uma chamada de API
    setTimeout(() => {
      // Transformando os dados para o formato esperado pelo Nivo Line
      const transformedData = [
        {
          id: 'Vendas Diárias',
          color: 'hsl(210, 70%, 50%)',
          data: dadosVendas.map((item: {data: string, valor: number}) => ({
            x: item.data.split('-').slice(1).join('/'), // Formatando data para MM/DD
            y: item.valor
          }))
        }
      ];
      
      setData(transformedData as any);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div className="flex items-center justify-center h-80">Carregando dados...</div>;

  return (
    <div className="h-80">
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false
        }}
        yFormat=" >-.2f"
        curve="cardinal"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Data',
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Valor (R$)',
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        enableGridX={false}
        colors={{ scheme: 'category10' }}
        lineWidth={3}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
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

export default GraficoVendasDiarias;

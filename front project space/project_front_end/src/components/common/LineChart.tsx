import React from 'react';

interface LineChartData {
  time: string;
  darkWeb: number;
  email: number;
  endpoint: number;
  network: number;
  other: number;
}

interface LineChartProps {
  data: LineChartData[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.flatMap(d => [d.darkWeb, d.email, d.endpoint, d.network, d.other]));
  const chartHeight = 200;
  const chartWidth = 400;
  const padding = 40;

  const createPath = (values: number[], color: string) => {
    const points = values.map((value, index) => {
      const x = padding + (index * (chartWidth - 2 * padding)) / (values.length - 1);
      const y = chartHeight - padding - ((value / maxValue) * (chartHeight - 2 * padding));
      return `${x},${y}`;
    });
    
    return (
      <path
        d={`M ${points.join(' L ')}`}
        fill="none"
        stroke={color}
        strokeWidth="2"
        className="hover:stroke-opacity-80 transition-all"
      />
    );
  };

  const series = [
    { key: 'darkWeb', color: '#DC2626', label: 'Dark Web' },
    { key: 'email', color: '#16A34A', label: 'Email' },
    { key: 'endpoint', color: '#2563EB', label: 'Endpoint' },
    { key: 'network', color: '#EA580C', label: 'Network' },
    { key: 'other', color: '#6B7280', label: 'Other' },
  ];

  return (
    <div className="space-y-4">
      <svg width={chartWidth} height={chartHeight} className="border border-gray-700 rounded">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percent) => {
          const y = chartHeight - padding - ((percent / 100) * (chartHeight - 2 * padding));
          return (
            <line
              key={percent}
              x1={padding}
              y1={y}
              x2={chartWidth - padding}
              y2={y}
              stroke="#374151"
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}
        
        {/* Time axis labels */}
        {data.map((point, index) => {
          const x = padding + (index * (chartWidth - 2 * padding)) / (data.length - 1);
          return (
            <text
              key={index}
              x={x}
              y={chartHeight - 10}
              textAnchor="middle"
              className="text-xs fill-gray-400"
            >
              {point.time}
            </text>
          );
        })}
        
        {/* Lines */}
        {series.map((s) => 
          createPath(data.map(d => d[s.key as keyof LineChartData] as number), s.color)
        )}
      </svg>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {series.map((s) => (
          <div key={s.key} className="flex items-center space-x-2">
            <div className="w-3 h-0.5" style={{ backgroundColor: s.color }} />
            <span className="text-xs text-gray-400">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineChart;
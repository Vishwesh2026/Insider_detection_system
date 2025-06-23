import React from 'react';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: ChartData[];
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  let cumulativeValue = 0;
  const segments = data.map((item) => {
    const percentage = (item.value / total) * 100;
    const startAngle = (cumulativeValue / total) * 360;
    const endAngle = ((cumulativeValue + item.value) / total) * 360;
    
    cumulativeValue += item.value;
    
    const startAngleRad = (startAngle - 90) * (Math.PI / 180);
    const endAngleRad = (endAngle - 90) * (Math.PI / 180);
    
    const largeArcFlag = percentage > 50 ? 1 : 0;
    
    const x1 = 50 + 35 * Math.cos(startAngleRad);
    const y1 = 50 + 35 * Math.sin(startAngleRad);
    const x2 = 50 + 35 * Math.cos(endAngleRad);
    const y2 = 50 + 35 * Math.sin(endAngleRad);
    
    const pathData = `M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    
    return {
      ...item,
      pathData,
      percentage,
    };
  });

  return (
    <div className="flex items-center space-x-8">
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 100 100" className="transform -rotate-90">
          <circle cx="50" cy="50" r="20" fill="transparent" className="stroke-gray-700" strokeWidth="2" />
          {segments.map((segment, index) => (
            <path
              key={index}
              d={segment.pathData}
              fill={segment.color}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          ))}
        </svg>
      </div>
      
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-300">{item.label}</span>
            <span className="text-sm font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
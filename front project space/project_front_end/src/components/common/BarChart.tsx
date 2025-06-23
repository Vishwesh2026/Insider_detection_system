import React from 'react';

interface BarData {
  name?: string;
  month?: string;
  value?: number;
  detections?: number;
  risk?: string;
}

interface BarChartProps {
  data: BarData[];
  type: 'horizontal' | 'vertical';
}

const BarChart: React.FC<BarChartProps> = ({ data, type }) => {
  const maxValue = Math.max(...data.map(d => d.value || d.detections || 0));

  if (type === 'horizontal') {
    return (
      <div className="space-y-4">
        {data.map((item, index) => {
          const percentage = ((item.value || 0) / maxValue) * 100;
          const riskColor = item.risk === 'critical' ? 'bg-red-600' : 
                           item.risk === 'high' ? 'bg-orange-500' : 
                           item.risk === 'medium' ? 'bg-yellow-500' : 'bg-blue-500';
          
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">{item.name}</span>
                <span className="font-medium">{item.value}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${riskColor} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-end space-x-2 h-32">
      {data.map((item, index) => {
        const height = ((item.detections || 0) / maxValue) * 100;
        return (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="w-full bg-gray-700 rounded-t flex items-end justify-center relative group">
              <div 
                className="w-full bg-blue-500 rounded-t transition-all duration-500 hover:bg-blue-400 cursor-pointer flex items-end justify-center"
                style={{ height: `${height}px` }}
              >
                <span className="text-xs text-white mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.detections}
                </span>
              </div>
            </div>
            <span className="text-xs text-gray-400 mt-1">{item.month}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BarChart;
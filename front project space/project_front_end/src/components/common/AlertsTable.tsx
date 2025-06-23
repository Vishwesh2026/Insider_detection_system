import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Alert {
  alert: string;
  escalatedBy: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  time: string;
}

interface AlertsTableProps {
  alerts: Alert[];
}

const AlertsTable: React.FC<AlertsTableProps> = ({ alerts }) => {
  const severityColors = {
    critical: 'bg-red-600 text-red-100',
    high: 'bg-orange-600 text-orange-100',
    medium: 'bg-yellow-600 text-yellow-100',
    low: 'bg-blue-600 text-blue-100',
  };

  return (
    <div className="overflow-hidden">
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-white">{alert.alert}</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Escalated by: {alert.escalatedBy}
                  </p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityColors[alert.severity]}`}>
                  {alert.severity.toUpperCase()}
                </span>
                <p className="text-xs text-gray-400">{alert.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsTable;
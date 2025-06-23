import React, { useState } from 'react';
import { ChevronUp, ChevronDown, AlertTriangle } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  sortable: boolean;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  onRowClick?: (row: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, onRowClick }) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (columnKey: string) => {
    if (!columns.find(col => col.key === columnKey)?.sortable) return;
    
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const getRiskColor = (riskScore: number) => {
    if (riskScore >= 8) return 'text-red-400';
    if (riskScore >= 6) return 'text-orange-400';
    if (riskScore >= 4) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Failed' || status === 'Blocked' || status === 'Denied') return 'text-red-400';
    if (status === 'Success' || status === 'Allowed') return 'text-green-400';
    return 'text-gray-400';
  };

  const formatCellValue = (value: any, columnKey: string) => {
    if (columnKey === 'riskScore' && typeof value === 'number') {
      return (
        <span className={`flex items-center space-x-1 ${getRiskColor(value)}`}>
          {value >= 7 && <AlertTriangle className="h-4 w-4" />}
          <span>{value}</span>
        </span>
      );
    }
    
    if (columnKey === 'authResult' || columnKey === 'connectionStatus' || columnKey === 'accessResult') {
      return <span className={getStatusColor(value)}>{value}</span>;
    }
    
    if (columnKey === 'fileSize' || columnKey === 'fileSizeBefore' || columnKey === 'fileSizeAfter') {
      return value ? formatFileSize(value) : '-';
    }
    
    if (columnKey === 'bytesSent' || columnKey === 'bytesReceived') {
      return value ? formatBytes(value) : '-';
    }
    
    return value || '-';
  };

  const formatFileSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  const formatBytes = (bytes: number) => {
    return formatFileSize(bytes);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-700">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-gray-600' : ''
                }`}
                onClick={() => handleSort(column.key)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.label}</span>
                  {column.sortable && (
                    <div className="flex flex-col">
                      <ChevronUp 
                        className={`h-3 w-3 ${
                          sortColumn === column.key && sortDirection === 'asc' 
                            ? 'text-blue-400' 
                            : 'text-gray-500'
                        }`} 
                      />
                      <ChevronDown 
                        className={`h-3 w-3 -mt-1 ${
                          sortColumn === column.key && sortDirection === 'desc' 
                            ? 'text-blue-400' 
                            : 'text-gray-500'
                        }`} 
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {sortedData.map((row, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-700 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 text-sm text-gray-300">
                  {formatCellValue(row[column.key], column.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {sortedData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data found matching your criteria
        </div>
      )}
    </div>
  );
};

export default DataTable;
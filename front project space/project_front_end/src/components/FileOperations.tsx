import React, { useState } from 'react';
import { Search, Filter, Download, FileText, AlertTriangle, Shield } from 'lucide-react';
import DataTable from './common/DataTable';

const FileOperations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const fileData = [
    {
      timestamp: '2024-01-20 14:30:15 UTC',
      filePath: 'C:\\Users\\john.doe\\Documents\\financial_report_2024.xlsx',
      fileType: '.xlsx',
      operationType: 'Create',
      fileSizeBefore: 0,
      fileSizeAfter: 2048576,
      fileHash: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
      accessResult: 'Allowed',
      sensitivityLabel: 'Confidential',
      user: 'john.doe',
      riskScore: 3
    },
    {
      timestamp: '2024-01-20 14:25:42 UTC',
      filePath: 'C:\\temp\\suspicious_file.exe',
      fileType: '.exe',
      operationType: 'Write',
      fileSizeBefore: 1024000,
      fileSizeAfter: 1536000,
      fileHash: 'def456789012345678901234567890abcdef123456789012345678901234abcd',
      accessResult: 'Allowed',
      sensitivityLabel: 'Unknown',
      user: 'admin',
      riskScore: 9
    },
    {
      timestamp: '2024-01-20 14:20:18 UTC',
      filePath: 'D:\\SharedDrive\\HR\\employee_data.csv',
      fileType: '.csv',
      operationType: 'Read',
      fileSizeBefore: 5120000,
      fileSizeAfter: 5120000,
      fileHash: '123456789012345678901234567890abcdef123456789012345678901234567890',
      accessResult: 'Allowed',
      sensitivityLabel: 'PII',
      user: 'sarah.wilson',
      riskScore: 5
    },
    {
      timestamp: '2024-01-20 14:15:33 UTC',
      filePath: 'C:\\System32\\critical_system_file.dll',
      fileType: '.dll',
      operationType: 'Delete',
      fileSizeBefore: 256000,
      fileSizeAfter: 0,
      fileHash: 'abcdef123456789012345678901234567890123456789012345678901234567890',
      accessResult: 'Denied',
      sensitivityLabel: 'System',
      user: 'unknown',
      riskScore: 10
    },
    {
      timestamp: '2024-01-20 14:10:55 UTC',
      filePath: 'E:\\USB\\backup\\database_export.sql',
      fileType: '.sql',
      operationType: 'Copy',
      fileSizeBefore: 10240000,
      fileSizeAfter: 10240000,
      fileHash: 'fedcba098765432109876543210987654321098765432109876543210987654321',
      accessResult: 'Allowed',
      sensitivityLabel: 'Restricted',
      user: 'mike.johnson',
      riskScore: 7
    },
  ];

  const columns = [
    { key: 'timestamp', label: 'Timestamp', sortable: true },
    { key: 'filePath', label: 'File Path', sortable: false },
    { key: 'fileType', label: 'Type', sortable: true },
    { key: 'operationType', label: 'Operation', sortable: true },
    { key: 'fileSizeBefore', label: 'Size Before', sortable: true },
    { key: 'fileSizeAfter', label: 'Size After', sortable: true },
    { key: 'accessResult', label: 'Access Result', sortable: true },
    { key: 'sensitivityLabel', label: 'Sensitivity', sortable: true },
    { key: 'user', label: 'User', sortable: true },
    { key: 'riskScore', label: 'Risk Score', sortable: true },
  ];

  const filteredData = fileData.filter(file => {
    const matchesSearch = file.filePath.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'high-risk' && file.riskScore >= 7) ||
                         (filterStatus === 'sensitive' && ['Confidential', 'PII', 'Restricted'].includes(file.sensitivityLabel)) ||
                         (filterStatus === 'denied' && file.accessResult === 'Denied') ||
                         (filterStatus === 'executables' && file.fileType === '.exe');
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalOperations: fileData.length,
    deniedAccess: fileData.filter(f => f.accessResult === 'Denied').length,
    sensitiveFiles: fileData.filter(f => ['Confidential', 'PII', 'Restricted'].includes(f.sensitivityLabel)).length,
    highRiskOperations: fileData.filter(f => f.riskScore >= 7).length
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">File Operations</h1>
          <p className="text-gray-400 mt-1">Monitor file system activities and data access patterns</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Download className="h-4 w-4" />
          <span>Export Data</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.totalOperations}</h3>
              <p className="text-sm text-gray-400">Total Operations</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.deniedAccess}</h3>
              <p className="text-sm text-gray-400">Denied Access</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-orange-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.sensitiveFiles}</h3>
              <p className="text-sm text-gray-400">Sensitive Files</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.highRiskOperations}</h3>
              <p className="text-sm text-gray-400">High Risk Operations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search files or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Operations</option>
                <option value="high-risk">High Risk</option>
                <option value="sensitive">Sensitive Files</option>
                <option value="denied">Denied Access</option>
                <option value="executables">Executables</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Showing {filteredData.length} of {fileData.length} operations
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-gray-800 rounded-lg">
        <DataTable 
          data={filteredData} 
          columns={columns}
          onRowClick={(row) => console.log('File operation details:', row)}
        />
      </div>
    </div>
  );
};

export default FileOperations;
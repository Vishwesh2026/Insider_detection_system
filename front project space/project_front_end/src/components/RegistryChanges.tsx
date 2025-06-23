import React, { useState } from 'react';
import { Search, Filter, Download, Settings, AlertTriangle, Shield } from 'lucide-react';
import DataTable from './common/DataTable';

const RegistryChanges: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const registryData = [
    {
      timestamp: '2024-01-20 14:30:15 UTC',
      registryHive: 'HKEY_LOCAL_MACHINE',
      keyPath: 'SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run',
      valueName: 'SecurityUpdater',
      valueData: 'C:\\temp\\updater.exe',
      operationType: 'Create',
      user: 'admin',
      riskScore: 9
    },
    {
      timestamp: '2024-01-20 14:25:42 UTC',
      registryHive: 'HKEY_CURRENT_USER',
      keyPath: 'Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System',
      valueName: 'DisableTaskMgr',
      valueData: '1',
      operationType: 'Modify',
      user: 'john.doe',
      riskScore: 7
    },
    {
      timestamp: '2024-01-20 14:20:18 UTC',
      registryHive: 'HKEY_LOCAL_MACHINE',
      keyPath: 'SYSTEM\\CurrentControlSet\\Services\\Firewall',
      valueName: 'Start',
      valueData: '4',
      operationType: 'Modify',
      user: 'system',
      riskScore: 8
    },
    {
      timestamp: '2024-01-20 14:15:33 UTC',
      registryHive: 'HKEY_CURRENT_USER',
      keyPath: 'Software\\Microsoft\\Office\\16.0\\Outlook\\Security',
      valueName: 'Level',
      valueData: '1',
      operationType: 'Create',
      user: 'sarah.wilson',
      riskScore: 4
    },
    {
      timestamp: '2024-01-20 14:10:55 UTC',
      registryHive: 'HKEY_LOCAL_MACHINE',
      keyPath: 'SOFTWARE\\Policies\\Microsoft\\Windows Defender',
      valueName: 'DisableAntiSpyware',
      valueData: '1',
      operationType: 'Create',
      user: 'unknown',
      riskScore: 10
    },
  ];

  const columns = [
    { key: 'timestamp', label: 'Timestamp', sortable: true },
    { key: 'registryHive', label: 'Registry Hive', sortable: true },
    { key: 'keyPath', label: 'Key Path', sortable: false },
    { key: 'valueName', label: 'Value Name', sortable: true },
    { key: 'valueData', label: 'Value Data', sortable: false },
    { key: 'operationType', label: 'Operation Type', sortable: true },
    { key: 'user', label: 'User', sortable: true },
    { key: 'riskScore', label: 'Risk Score', sortable: true },
  ];

  const filteredData = registryData.filter(registry => {
    const matchesSearch = registry.keyPath.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         registry.valueName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         registry.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'high-risk' && registry.riskScore >= 7) ||
                         (filterStatus === 'system-critical' && registry.keyPath.includes('System')) ||
                         (filterStatus === 'security-related' && (registry.keyPath.includes('Security') || registry.keyPath.includes('Defender')));
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalChanges: registryData.length,
    highRiskChanges: registryData.filter(r => r.riskScore >= 7).length,
    systemCritical: registryData.filter(r => r.keyPath.includes('System')).length,
    securityRelated: registryData.filter(r => r.keyPath.includes('Security') || r.keyPath.includes('Defender')).length
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Registry & Config Changes</h1>
          <p className="text-gray-400 mt-1">Monitor Windows registry modifications and configuration changes</p>
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
            <Settings className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.totalChanges}</h3>
              <p className="text-sm text-gray-400">Total Changes</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.highRiskChanges}</h3>
              <p className="text-sm text-gray-400">High Risk</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Settings className="h-8 w-8 text-orange-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.systemCritical}</h3>
              <p className="text-sm text-gray-400">System Critical</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-yellow-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.securityRelated}</h3>
              <p className="text-sm text-gray-400">Security Related</p>
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
                placeholder="Search registry keys or users..."
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
                <option value="all">All Changes</option>
                <option value="high-risk">High Risk</option>
                <option value="system-critical">System Critical</option>
                <option value="security-related">Security Related</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Showing {filteredData.length} of {registryData.length} changes
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-gray-800 rounded-lg">
        <DataTable 
          data={filteredData} 
          columns={columns}
          onRowClick={(row) => console.log('Registry change details:', row)}
        />
      </div>
    </div>
  );
};

export default RegistryChanges;
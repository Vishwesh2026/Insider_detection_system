import React, { useState } from 'react';
import { Search, Filter, Download, AlertTriangle, Shield, Bug } from 'lucide-react';
import DataTable from './common/DataTable';

const SecurityAlerts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const alertData = [
    {
      timestamp: '2024-01-20 14:30:15 UTC',
      alertId: 'AV-2024-0001',
      signature: 'Trojan.Generic.KD.123456',
      severity: 'Critical',
      involvedFile: 'C:\\temp\\suspicious.exe',
      involvedProcess: 'suspicious.exe (PID: 3456)',
      actionTaken: 'Quarantined',
      user: 'john.doe',
      riskScore: 10
    },
    {
      timestamp: '2024-01-20 14:25:42 UTC',
      alertId: 'FW-2024-0023',
      signature: 'Outbound Connection Block',
      severity: 'High',
      involvedFile: '',
      involvedProcess: 'chrome.exe (PID: 1234)',
      actionTaken: 'Blocked',
      user: 'sarah.wilson',
      riskScore: 7
    },
    {
      timestamp: '2024-01-20 14:20:18 UTC',
      alertId: 'AV-2024-0002',
      signature: 'Potentially Unwanted Program',
      severity: 'Medium',
      involvedFile: 'C:\\Users\\mike\\Downloads\\freeware.exe',
      involvedProcess: 'freeware.exe (PID: 7890)',
      actionTaken: 'Monitored',
      user: 'mike.johnson',
      riskScore: 5
    },
    {
      timestamp: '2024-01-20 14:15:33 UTC',
      alertId: 'IDS-2024-0015',
      signature: 'Suspicious PowerShell Activity',
      severity: 'High',
      involvedFile: 'C:\\temp\\script.ps1',
      involvedProcess: 'powershell.exe (PID: 5678)',
      actionTaken: 'Blocked',
      user: 'admin',
      riskScore: 8
    },
    {
      timestamp: '2024-01-20 14:10:55 UTC',
      alertId: 'DLP-2024-0008',
      signature: 'Sensitive Data Transfer',
      severity: 'High',
      involvedFile: 'E:\\confidential_data.xlsx',
      involvedProcess: 'explorer.exe (PID: 2345)',
      actionTaken: 'Blocked',
      user: 'contractor.ext',
      riskScore: 9
    },
  ];

  const columns = [
    { key: 'timestamp', label: 'Timestamp', sortable: true },
    { key: 'alertId', label: 'Alert ID', sortable: true },
    { key: 'signature', label: 'Signature', sortable: true },
    { key: 'severity', label: 'Severity', sortable: true },
    { key: 'involvedFile', label: 'Involved File', sortable: false },
    { key: 'involvedProcess', label: 'Involved Process', sortable: false },
    { key: 'actionTaken', label: 'Action Taken', sortable: true },
    { key: 'user', label: 'User', sortable: true },
    { key: 'riskScore', label: 'Risk Score', sortable: true },
  ];

  const filteredData = alertData.filter(alert => {
    const matchesSearch = alert.signature.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.involvedFile.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'critical' && alert.severity === 'Critical') ||
                         (filterStatus === 'high' && alert.severity === 'High') ||
                         (filterStatus === 'quarantined' && alert.actionTaken === 'Quarantined') ||
                         (filterStatus === 'blocked' && alert.actionTaken === 'Blocked');
    return matchesSearch && matchesFilter;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-400';
      case 'High': return 'text-orange-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Quarantined': return 'text-red-400';
      case 'Blocked': return 'text-orange-400';
      case 'Monitored': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const stats = {
    totalAlerts: alertData.length,
    criticalAlerts: alertData.filter(a => a.severity === 'Critical').length,
    quarantinedThreats: alertData.filter(a => a.actionTaken === 'Quarantined').length,
    blockedActions: alertData.filter(a => a.actionTaken === 'Blocked').length
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security Alerts & AV</h1>
          <p className="text-gray-400 mt-1">Monitor security alerts, antivirus detections, and threat responses</p>
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
            <AlertTriangle className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.totalAlerts}</h3>
              <p className="text-sm text-gray-400">Total Alerts</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.criticalAlerts}</h3>
              <p className="text-sm text-gray-400">Critical Alerts</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Bug className="h-8 w-8 text-orange-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.quarantinedThreats}</h3>
              <p className="text-sm text-gray-400">Quarantined</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-yellow-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.blockedActions}</h3>
              <p className="text-sm text-gray-400">Blocked Actions</p>
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
                placeholder="Search alerts, files, or users..."
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
                <option value="all">All Alerts</option>
                <option value="critical">Critical</option>
                <option value="high">High Severity</option>
                <option value="quarantined">Quarantined</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Showing {filteredData.length} of {alertData.length} alerts
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-gray-800 rounded-lg">
        <DataTable 
          data={filteredData.map(item => ({
            ...item,
            severity: <span className={getSeverityColor(item.severity)}>{item.severity}</span>,
            actionTaken: <span className={getActionColor(item.actionTaken)}>{item.actionTaken}</span>
          }))} 
          columns={columns}
          onRowClick={(row) => console.log('Security alert details:', row)}
        />
      </div>
    </div>
  );
};

export default SecurityAlerts;
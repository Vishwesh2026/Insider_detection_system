import React, { useState } from 'react';
import { Search, Filter, Download, Network, Globe, Shield } from 'lucide-react';
import DataTable from './common/DataTable';

const NetworkConnections: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const networkData = [
    {
      timestamp: '2024-01-20 14:30:15 UTC',
      sourceIP: '192.168.1.100',
      sourcePort: 12345,
      destIP: '8.8.8.8',
      destPort: 53,
      protocol: 'UDP',
      bytesSent: 128,
      bytesReceived: 256,
      connectionDuration: 0.5,
      dnsQuery: 'google.com',
      connectionStatus: 'Allowed',
      user: 'john.doe',
      riskScore: 1
    },
    {
      timestamp: '2024-01-20 14:25:42 UTC',
      sourceIP: '192.168.1.105',
      sourcePort: 54321,
      destIP: '185.199.108.153',
      destPort: 443,
      protocol: 'TCP',
      bytesSent: 2048,
      bytesReceived: 8192,
      connectionDuration: 300,
      dnsQuery: 'github.com',
      connectionStatus: 'Allowed',
      user: 'sarah.wilson',
      riskScore: 2
    },
    {
      timestamp: '2024-01-20 14:20:18 UTC',
      sourceIP: '192.168.1.110',
      sourcePort: 65432,
      destIP: '192.168.50.200',
      destPort: 3389,
      protocol: 'TCP',
      bytesSent: 512000,
      bytesReceived: 1024000,
      connectionDuration: 1800,
      dnsQuery: 'internal-server.company.com',
      connectionStatus: 'Allowed',
      user: 'admin',
      riskScore: 5
    },
    {
      timestamp: '2024-01-20 14:15:33 UTC',
      sourceIP: '192.168.1.115',
      sourcePort: 12580,
      destIP: '45.32.105.15',
      destPort: 4444,
      protocol: 'TCP',
      bytesSent: 1048576,
      bytesReceived: 0,
      connectionDuration: 0,
      dnsQuery: 'suspicious-domain.tk',
      connectionStatus: 'Blocked',
      user: 'unknown',
      riskScore: 10
    },
    {
      timestamp: '2024-01-20 14:10:55 UTC',
      sourceIP: '192.168.1.120',
      sourcePort: 23456,
      destIP: '151.101.193.140',
      destPort: 80,
      protocol: 'TCP',
      bytesSent: 4096,
      bytesReceived: 102400,
      connectionDuration: 45,
      dnsQuery: 'reddit.com',
      connectionStatus: 'Allowed',
      user: 'mike.johnson',
      riskScore: 3
    },
  ];

  const columns = [
    { key: 'timestamp', label: 'Timestamp', sortable: true },
    { key: 'sourceIP', label: 'Source IP', sortable: true },
    { key: 'sourcePort', label: 'Src Port', sortable: true },
    { key: 'destIP', label: 'Destination IP', sortable: true },
    { key: 'destPort', label: 'Dst Port', sortable: true },
    { key: 'protocol', label: 'Protocol', sortable: true },
    { key: 'bytesSent', label: 'Bytes Sent', sortable: true },
    { key: 'bytesReceived', label: 'Bytes Received', sortable: true },
    { key: 'connectionDuration', label: 'Duration (s)', sortable: true },
    { key: 'dnsQuery', label: 'DNS Query', sortable: false },
    { key: 'connectionStatus', label: 'Status', sortable: true },
    { key: 'user', label: 'User', sortable: true },
    { key: 'riskScore', label: 'Risk Score', sortable: true },
  ];

  const filteredData = networkData.filter(connection => {
    const matchesSearch = connection.destIP.includes(searchTerm) ||
                         connection.dnsQuery.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'blocked' && connection.connectionStatus === 'Blocked') ||
                         (filterStatus === 'high-risk' && connection.riskScore >= 7) ||
                         (filterStatus === 'external' && !connection.destIP.startsWith('192.168')) ||
                         (filterStatus === 'high-volume' && (connection.bytesSent + connection.bytesReceived) > 100000);
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalConnections: networkData.length,
    blockedConnections: networkData.filter(c => c.connectionStatus === 'Blocked').length,
    externalConnections: networkData.filter(c => !c.destIP.startsWith('192.168')).length,
    highRiskConnections: networkData.filter(c => c.riskScore >= 7).length
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Network Connections</h1>
          <p className="text-gray-400 mt-1">Monitor network traffic and connection patterns</p>
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
            <Network className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.totalConnections}</h3>
              <p className="text-sm text-gray-400">Total Connections</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.blockedConnections}</h3>
              <p className="text-sm text-gray-400">Blocked</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Globe className="h-8 w-8 text-orange-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.externalConnections}</h3>
              <p className="text-sm text-gray-400">External</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Network className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.highRiskConnections}</h3>
              <p className="text-sm text-gray-400">High Risk</p>
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
                placeholder="Search IPs, domains, or users..."
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
                <option value="all">All Connections</option>
                <option value="blocked">Blocked</option>
                <option value="high-risk">High Risk</option>
                <option value="external">External</option>
                <option value="high-volume">High Volume</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Showing {filteredData.length} of {networkData.length} connections
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-gray-800 rounded-lg">
        <DataTable 
          data={filteredData} 
          columns={columns}
          onRowClick={(row) => console.log('Network connection details:', row)}
        />
      </div>
    </div>
  );
};

export default NetworkConnections;
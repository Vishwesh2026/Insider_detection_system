import React, { useState } from 'react';
import { Search, Filter, Download, Users, Clock, Shield } from 'lucide-react';
import DataTable from './common/DataTable';

const IdentitySessions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const sessionData = [
    {
      timestamp: '2024-01-20 14:30:15 UTC',
      userId: 'john.doe@company.com',
      sessionId: 'sess_a1b2c3d4e5f6',
      machineName: 'LAPTOP-JD001',
      logonType: 'Interactive',
      authResult: 'Success',
      mfaUsed: 'Yes',
      logonSource: 'Console',
      riskScore: 2,
      location: 'New York, US'
    },
    {
      timestamp: '2024-01-20 14:25:42 UTC',
      userId: 'sarah.wilson@company.com',
      sessionId: 'sess_f6e5d4c3b2a1',
      machineName: 'WS-SW002',
      logonType: 'Remote',
      authResult: 'Success',
      mfaUsed: 'No',
      logonSource: 'RDP',
      riskScore: 7,
      location: 'London, UK'
    },
    {
      timestamp: '2024-01-20 14:20:18 UTC',
      userId: 'mike.johnson@company.com',
      sessionId: 'sess_1a2b3c4d5e6f',
      machineName: 'SRV-MJ003',
      logonType: 'Service',
      authResult: 'Failed',
      mfaUsed: 'N/A',
      logonSource: 'Service',
      riskScore: 9,
      location: 'Unknown'
    },
    {
      timestamp: '2024-01-20 14:15:33 UTC',
      userId: 'admin@company.com',
      sessionId: 'sess_9z8y7x6w5v4u',
      machineName: 'DC-ADMIN01',
      logonType: 'Interactive',
      authResult: 'Success',
      mfaUsed: 'Yes',
      logonSource: 'VPN',
      riskScore: 3,
      location: 'San Francisco, US'
    },
  ];

  const columns = [
    { key: 'timestamp', label: 'Timestamp', sortable: true },
    { key: 'userId', label: 'User ID', sortable: true },
    { key: 'sessionId', label: 'Session ID', sortable: false },
    { key: 'machineName', label: 'Machine Name', sortable: true },
    { key: 'logonType', label: 'Logon Type', sortable: true },
    { key: 'authResult', label: 'Auth Result', sortable: true },
    { key: 'mfaUsed', label: 'MFA Used', sortable: true },
    { key: 'logonSource', label: 'Logon Source', sortable: true },
    { key: 'riskScore', label: 'Risk Score', sortable: true },
    { key: 'location', label: 'Location', sortable: false },
  ];

  const filteredData = sessionData.filter(session => {
    const matchesSearch = session.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.machineName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'failed' && session.authResult === 'Failed') ||
                         (filterStatus === 'high-risk' && session.riskScore >= 7) ||
                         (filterStatus === 'no-mfa' && session.mfaUsed === 'No');
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalSessions: sessionData.length,
    failedLogins: sessionData.filter(s => s.authResult === 'Failed').length,
    highRiskSessions: sessionData.filter(s => s.riskScore >= 7).length,
    mfaCompliance: Math.round((sessionData.filter(s => s.mfaUsed === 'Yes').length / sessionData.length) * 100)
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Identity & Sessions</h1>
          <p className="text-gray-400 mt-1">Monitor user authentication and session activities</p>
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
            <Users className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.totalSessions}</h3>
              <p className="text-sm text-gray-400">Total Sessions</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.failedLogins}</h3>
              <p className="text-sm text-gray-400">Failed Logins</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-orange-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.highRiskSessions}</h3>
              <p className="text-sm text-gray-400">High Risk Sessions</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.mfaCompliance}%</h3>
              <p className="text-sm text-gray-400">MFA Compliance</p>
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
                placeholder="Search users or machines..."
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
                <option value="all">All Sessions</option>
                <option value="failed">Failed Logins</option>
                <option value="high-risk">High Risk</option>
                <option value="no-mfa">No MFA</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Showing {filteredData.length} of {sessionData.length} sessions
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-gray-800 rounded-lg">
        <DataTable 
          data={filteredData} 
          columns={columns}
          onRowClick={(row) => console.log('Session details:', row)}
        />
      </div>
    </div>
  );
};

export default IdentitySessions;
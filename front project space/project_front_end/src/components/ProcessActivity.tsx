import React, { useState } from 'react';
import { Search, Filter, Download, Activity, Cpu, MemoryStick } from 'lucide-react';
import DataTable from './common/DataTable';

const ProcessActivity: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const processData = [
    {
      timestamp: '2024-01-20 14:30:15 UTC',
      processName: 'chrome.exe',
      processPath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      pid: 1234,
      parentPid: 892,
      commandLineArgs: '--new-window https://example.com',
      exitCode: 0,
      imageHash: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
      cpuUsage: 15.2,
      memoryUsage: 256.8,
      riskScore: 2,
      user: 'john.doe'
    },
    {
      timestamp: '2024-01-20 14:25:42 UTC',
      processName: 'powershell.exe',
      processPath: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe',
      pid: 5678,
      parentPid: 4321,
      commandLineArgs: '-ExecutionPolicy Bypass -File C:\\temp\\script.ps1',
      exitCode: 0,
      imageHash: 'def456789012345678901234567890abcdef123456789012345678901234abcd',
      cpuUsage: 5.8,
      memoryUsage: 45.2,
      riskScore: 8,
      user: 'admin'
    },
    {
      timestamp: '2024-01-20 14:20:18 UTC',
      processName: 'notepad.exe',
      processPath: 'C:\\Windows\\System32\\notepad.exe',
      pid: 9012,
      parentPid: 1234,
      commandLineArgs: 'C:\\Users\\sarah\\Documents\\confidential.txt',
      exitCode: 0,
      imageHash: '123456789012345678901234567890abcdef123456789012345678901234567890',
      cpuUsage: 0.1,
      memoryUsage: 12.5,
      riskScore: 6,
      user: 'sarah.wilson'
    },
    {
      timestamp: '2024-01-20 14:15:33 UTC',
      processName: 'suspicious.exe',
      processPath: 'C:\\temp\\suspicious.exe',
      pid: 3456,
      parentPid: 2109,
      commandLineArgs: '--hide --keylog --upload',
      exitCode: -1,
      imageHash: 'unknown',
      cpuUsage: 25.7,
      memoryUsage: 158.9,
      riskScore: 10,
      user: 'unknown'
    },
  ];

  const columns = [
    { key: 'timestamp', label: 'Timestamp', sortable: true },
    { key: 'processName', label: 'Process Name', sortable: true },
    { key: 'processPath', label: 'Process Path', sortable: false },
    { key: 'pid', label: 'PID', sortable: true },
    { key: 'parentPid', label: 'Parent PID', sortable: true },
    { key: 'commandLineArgs', label: 'Command Line', sortable: false },
    { key: 'exitCode', label: 'Exit Code', sortable: true },
    { key: 'cpuUsage', label: 'CPU %', sortable: true },
    { key: 'memoryUsage', label: 'Memory (MB)', sortable: true },
    { key: 'riskScore', label: 'Risk Score', sortable: true },
    { key: 'user', label: 'User', sortable: true },
  ];

  const filteredData = processData.filter(process => {
    const matchesSearch = process.processName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         process.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'high-risk' && process.riskScore >= 7) ||
                         (filterStatus === 'suspicious' && process.processPath.includes('temp')) ||
                         (filterStatus === 'high-cpu' && process.cpuUsage > 10);
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalProcesses: processData.length,
    highRiskProcesses: processData.filter(p => p.riskScore >= 7).length,
    suspiciousProcesses: processData.filter(p => p.processPath.includes('temp')).length,
    avgCpuUsage: Math.round((processData.reduce((sum, p) => sum + p.cpuUsage, 0) / processData.length) * 10) / 10
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Process Activity</h1>
          <p className="text-gray-400 mt-1">Monitor system processes and executable activities</p>
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
            <Activity className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.totalProcesses}</h3>
              <p className="text-sm text-gray-400">Total Processes</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Activity className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.highRiskProcesses}</h3>
              <p className="text-sm text-gray-400">High Risk</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Activity className="h-8 w-8 text-orange-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.suspiciousProcesses}</h3>
              <p className="text-sm text-gray-400">Suspicious</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Cpu className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.avgCpuUsage}%</h3>
              <p className="text-sm text-gray-400">Avg CPU Usage</p>
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
                placeholder="Search processes or users..."
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
                <option value="all">All Processes</option>
                <option value="high-risk">High Risk</option>
                <option value="suspicious">Suspicious</option>
                <option value="high-cpu">High CPU Usage</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Showing {filteredData.length} of {processData.length} processes
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-gray-800 rounded-lg">
        <DataTable 
          data={filteredData} 
          columns={columns}
          onRowClick={(row) => console.log('Process details:', row)}
        />
      </div>
    </div>
  );
};

export default ProcessActivity;
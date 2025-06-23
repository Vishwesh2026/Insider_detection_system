import React, { useState } from 'react';
import { Search, Filter, Download, HardDrive, Usb, AlertTriangle } from 'lucide-react';
import DataTable from './common/DataTable';

const RemovableMedia: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const mediaData = [
    {
      timestamp: '2024-01-20 14:30:15 UTC',
      usbDeviceId: 'VID_0951&PID_1666',
      serialNumber: 'AA04012700008181',
      mountPoint: 'E:\\',
      dataTransferVolume: 2048576,
      fileNamesTransferred: 'financial_report.xlsx, employee_data.csv',
      accessOutcome: 'Allowed',
      user: 'john.doe',
      riskScore: 6
    },
    {
      timestamp: '2024-01-20 14:25:42 UTC',
      usbDeviceId: 'VID_0781&PID_5567',
      serialNumber: 'BB05023800009292',
      mountPoint: 'F:\\',
      dataTransferVolume: 10485760,
      fileNamesTransferred: 'database_backup.sql, source_code.zip',
      accessOutcome: 'Denied',
      user: 'sarah.wilson',
      riskScore: 9
    },
    {
      timestamp: '2024-01-20 14:20:18 UTC',
      usbDeviceId: 'VID_1058&PID_25A3',
      serialNumber: 'WX12A8F56789',
      mountPoint: 'G:\\',
      dataTransferVolume: 512000,
      fileNamesTransferred: 'presentation.pptx',
      accessOutcome: 'Allowed',
      user: 'mike.johnson',
      riskScore: 3
    },
    {
      timestamp: '2024-01-20 14:15:33 UTC',
      usbDeviceId: 'VID_0424&PID_2140',
      serialNumber: 'Unknown',
      mountPoint: 'H:\\',
      dataTransferVolume: 0,
      fileNamesTransferred: 'Access blocked by policy',
      accessOutcome: 'Denied',
      user: 'unknown',
      riskScore: 10
    },
    {
      timestamp: '2024-01-20 14:10:55 UTC',
      usbDeviceId: 'VID_8564&PID_1000',
      serialNumber: 'CC06034900001414',
      mountPoint: 'I:\\',
      dataTransferVolume: 1024000,
      fileNamesTransferred: 'meeting_notes.docx, budget_2024.xlsx',
      accessOutcome: 'Allowed',
      user: 'admin',
      riskScore: 4
    },
  ];

  const columns = [
    { key: 'timestamp', label: 'Timestamp', sortable: true },
    { key: 'usbDeviceId', label: 'USB Device ID', sortable: true },
    { key: 'serialNumber', label: 'Serial Number', sortable: true },
    { key: 'mountPoint', label: 'Mount Point', sortable: true },
    { key: 'dataTransferVolume', label: 'Data Volume', sortable: true },
    { key: 'fileNamesTransferred', label: 'Files Transferred', sortable: false },
    { key: 'accessOutcome', label: 'Access Outcome', sortable: true },
    { key: 'user', label: 'User', sortable: true },
    { key: 'riskScore', label: 'Risk Score', sortable: true },
  ];

  const filteredData = mediaData.filter(media => {
    const matchesSearch = media.usbDeviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         media.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         media.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'denied' && media.accessOutcome === 'Denied') ||
                         (filterStatus === 'high-risk' && media.riskScore >= 7) ||
                         (filterStatus === 'large-transfer' && media.dataTransferVolume > 1000000);
    return matchesSearch && matchesFilter;
  });

  const formatBytes = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  const stats = {
    totalConnections: mediaData.length,
    deniedAccess: mediaData.filter(m => m.accessOutcome === 'Denied').length,
    highRiskConnections: mediaData.filter(m => m.riskScore >= 7).length,
    totalDataTransfer: mediaData.reduce((sum, m) => sum + m.dataTransferVolume, 0)
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Removable Media</h1>
          <p className="text-gray-400 mt-1">Monitor USB and removable device connections and data transfers</p>
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
            <Usb className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.totalConnections}</h3>
              <p className="text-sm text-gray-400">Total Connections</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.deniedAccess}</h3>
              <p className="text-sm text-gray-400">Denied Access</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <HardDrive className="h-8 w-8 text-orange-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.highRiskConnections}</h3>
              <p className="text-sm text-gray-400">High Risk</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <HardDrive className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="text-2xl font-bold">{formatBytes(stats.totalDataTransfer)}</h3>
              <p className="text-sm text-gray-400">Total Data Transfer</p>
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
                placeholder="Search devices or users..."
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
                <option value="denied">Denied Access</option>
                <option value="high-risk">High Risk</option>
                <option value="large-transfer">Large Transfers</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Showing {filteredData.length} of {mediaData.length} connections
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-gray-800 rounded-lg">
        <DataTable 
          data={filteredData.map(item => ({
            ...item,
            dataTransferVolume: formatBytes(item.dataTransferVolume)
          }))} 
          columns={columns}
          onRowClick={(row) => console.log('Removable media details:', row)}
        />
      </div>
    </div>
  );
};

export default RemovableMedia;
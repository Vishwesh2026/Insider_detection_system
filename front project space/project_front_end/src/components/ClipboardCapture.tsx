import React, { useState } from 'react';
import { Search, Filter, Download, Clipboard, Camera, Copy } from 'lucide-react';
import DataTable from './common/DataTable';

const ClipboardCapture: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const captureData = [
    {
      timestamp: '2024-01-20 14:30:15 UTC',
      eventType: 'Clipboard Copy',
      clipboardEvent: 'Copy',
      clipboardContentMeta: 'Text (256 chars)',
      screenCaptureTrigger: '',
      contentPreview: 'Employee salary information for Q4...',
      application: 'Excel',
      user: 'john.doe',
      riskScore: 8
    },
    {
      timestamp: '2024-01-20 14:25:42 UTC',
      eventType: 'Screen Capture',
      clipboardEvent: '',
      clipboardContentMeta: '',
      screenCaptureTrigger: 'PrintScreen',
      contentPreview: 'Desktop screenshot captured',
      application: 'Windows',
      user: 'sarah.wilson',
      riskScore: 6
    },
    {
      timestamp: '2024-01-20 14:20:18 UTC',
      eventType: 'Clipboard Cut',
      clipboardEvent: 'Cut',
      clipboardContentMeta: 'File paths (5 files)',
      screenCaptureTrigger: '',
      contentPreview: 'C:\\Confidential\\*.xlsx',
      application: 'File Explorer',
      user: 'mike.johnson',
      riskScore: 7
    },
    {
      timestamp: '2024-01-20 14:15:33 UTC',
      eventType: 'Screen Recording',
      clipboardEvent: '',
      clipboardContentMeta: '',
      screenCaptureTrigger: 'Screen Recording Software',
      contentPreview: 'Screen recording detected (5 minutes)',
      application: 'OBS Studio',
      user: 'contractor.ext',
      riskScore: 9
    },
    {
      timestamp: '2024-01-20 14:10:55 UTC',
      eventType: 'Clipboard Copy',
      clipboardEvent: 'Copy',
      clipboardContentMeta: 'Image (1920x1080, PNG)',
      screenCaptureTrigger: '',
      contentPreview: 'Dashboard screenshot',
      application: 'Chrome',
      user: 'admin',
      riskScore: 4
    },
  ];

  const columns = [
    { key: 'timestamp', label: 'Timestamp', sortable: true },
    { key: 'eventType', label: 'Event Type', sortable: true },
    { key: 'clipboardEvent', label: 'Clipboard Event', sortable: true },
    { key: 'clipboardContentMeta', label: 'Content Meta', sortable: false },
    { key: 'screenCaptureTrigger', label: 'Capture Trigger', sortable: true },
    { key: 'contentPreview', label: 'Content Preview', sortable: false },
    { key: 'application', label: 'Application', sortable: true },
    { key: 'user', label: 'User', sortable: true },
    { key: 'riskScore', label: 'Risk Score', sortable: true },
  ];

  const filteredData = captureData.filter(capture => {
    const matchesSearch = capture.contentPreview.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         capture.application.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         capture.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'high-risk' && capture.riskScore >= 7) ||
                         (filterStatus === 'clipboard' && capture.eventType.includes('Clipboard')) ||
                         (filterStatus === 'screen-capture' && capture.eventType.includes('Screen')) ||
                         (filterStatus === 'external-users' && capture.user.includes('.ext'));
    return matchesSearch && matchesFilter;
  });

  const getEventTypeIcon = (eventType: string) => {
    if (eventType.includes('Clipboard')) return <Clipboard className="h-4 w-4 text-blue-400" />;
    if (eventType.includes('Screen')) return <Camera className="h-4 w-4 text-orange-400" />;
    return <Copy className="h-4 w-4 text-gray-400" />;
  };

  const stats = {
    totalEvents: captureData.length,
    clipboardEvents: captureData.filter(c => c.eventType.includes('Clipboard')).length,
    screenCaptureEvents: captureData.filter(c => c.eventType.includes('Screen')).length,
    highRiskEvents: captureData.filter(c => c.riskScore >= 7).length
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clipboard & Screen Capture</h1>
          <p className="text-gray-400 mt-1">Monitor clipboard activities and screen capture events</p>
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
            <Copy className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.totalEvents}</h3>
              <p className="text-sm text-gray-400">Total Events</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Clipboard className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.clipboardEvents}</h3>
              <p className="text-sm text-gray-400">Clipboard Events</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Camera className="h-8 w-8 text-orange-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.screenCaptureEvents}</h3>
              <p className="text-sm text-gray-400">Screen Captures</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Copy className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.highRiskEvents}</h3>
              <p className="text-sm text-gray-400">High Risk Events</p>
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
                placeholder="Search content, apps, or users..."
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
                <option value="all">All Events</option>
                <option value="high-risk">High Risk</option>
                <option value="clipboard">Clipboard Events</option>
                <option value="screen-capture">Screen Captures</option>
                <option value="external-users">External Users</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Showing {filteredData.length} of {captureData.length} events
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-gray-800 rounded-lg">
        <DataTable 
          data={filteredData.map(item => ({
            ...item,
            eventType: (
              <div className="flex items-center space-x-2">
                {getEventTypeIcon(item.eventType)}
                <span>{item.eventType}</span>
              </div>
            )
          }))} 
          columns={columns}
          onRowClick={(row) => console.log('Capture event details:', row)}
        />
      </div>
    </div>
  );
};

export default ClipboardCapture;
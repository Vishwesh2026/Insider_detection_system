import React, { useState } from 'react';
import { Search, Filter, Download, Mail, Cloud, Upload, Download as DownloadIcon } from 'lucide-react';
import DataTable from './common/DataTable';

const EmailCloudApps: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const emailCloudData = [
    {
      timestamp: '2024-01-20 14:30:15 UTC',
      applicationName: 'Outlook',
      emailSender: 'john.doe@company.com',
      emailRecipient: 'external@competitor.com',
      emailSubject: 'Q4 Financial Results - Confidential',
      attachmentDetails: 'financial_data.xlsx (2.5MB)',
      uploadVolume: 0,
      downloadVolume: 0,
      cloudActionType: 'Email Send',
      cloudApiCallDetails: 'SMTP Send',
      user: 'john.doe',
      riskScore: 8
    },
    {
      timestamp: '2024-01-20 14:25:42 UTC',
      applicationName: 'OneDrive',
      emailSender: '',
      emailRecipient: '',
      emailSubject: '',
      attachmentDetails: 'Multiple files (15.2MB)',
      uploadVolume: 15728640,
      downloadVolume: 0,
      cloudActionType: 'Upload',
      cloudApiCallDetails: 'Graph API Upload',
      user: 'sarah.wilson',
      riskScore: 6
    },
    {
      timestamp: '2024-01-20 14:20:18 UTC',
      applicationName: 'GitHub',
      emailSender: '',
      emailRecipient: '',
      emailSubject: '',
      attachmentDetails: 'source_code.zip (5.8MB)',
      uploadVolume: 6082560,
      downloadVolume: 0,
      cloudActionType: 'Repository Push',
      cloudApiCallDetails: 'Git Push API',
      user: 'mike.johnson',
      riskScore: 7
    },
    {
      timestamp: '2024-01-20 14:15:33 UTC',
      applicationName: 'Gmail',
      emailSender: 'admin@company.com',
      emailRecipient: 'personal@gmail.com',
      emailSubject: 'System Access Credentials',
      attachmentDetails: 'credentials.txt (1KB)',
      uploadVolume: 0,
      downloadVolume: 0,
      cloudActionType: 'Email Send',
      cloudApiCallDetails: 'Gmail API Send',
      user: 'admin',
      riskScore: 10
    },
    {
      timestamp: '2024-01-20 14:10:55 UTC',
      applicationName: 'SharePoint',
      emailSender: '',
      emailRecipient: '',
      emailSubject: '',
      attachmentDetails: 'project_files.zip (8.9MB)',
      uploadVolume: 0,
      downloadVolume: 9329664,
      cloudActionType: 'Download',
      cloudApiCallDetails: 'SharePoint REST API',
      user: 'contractor.ext',
      riskScore: 5
    },
  ];

  const columns = [
    { key: 'timestamp', label: 'Timestamp', sortable: true },
    { key: 'applicationName', label: 'Application', sortable: true },
    { key: 'emailSender', label: 'Sender', sortable: true },
    { key: 'emailRecipient', label: 'Recipient', sortable: true },
    { key: 'emailSubject', label: 'Subject', sortable: false },
    { key: 'attachmentDetails', label: 'Attachment Details', sortable: false },
    { key: 'uploadVolume', label: 'Upload Volume', sortable: true },
    { key: 'downloadVolume', label: 'Download Volume', sortable: true },
    { key: 'cloudActionType', label: 'Action Type', sortable: true },
    { key: 'user', label: 'User', sortable: true },
    { key: 'riskScore', label: 'Risk Score', sortable: true },
  ];

  const filteredData = emailCloudData.filter(item => {
    const matchesSearch = item.applicationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.emailSender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.emailRecipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'high-risk' && item.riskScore >= 7) ||
                         (filterStatus === 'external-email' && (item.emailRecipient.includes('@') && !item.emailRecipient.includes('company.com'))) ||
                         (filterStatus === 'large-upload' && item.uploadVolume > 5000000) ||
                         (filterStatus === 'external-users' && item.user.includes('.ext'));
    return matchesSearch && matchesFilter;
  });

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '-';
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
    totalActivities: emailCloudData.length,
    highRiskActivities: emailCloudData.filter(i => i.riskScore >= 7).length,
    externalEmails: emailCloudData.filter(i => i.emailRecipient.includes('@') && !i.emailRecipient.includes('company.com')).length,
    totalUploadVolume: emailCloudData.reduce((sum, i) => sum + i.uploadVolume, 0)
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Email & Cloud Apps</h1>
          <p className="text-gray-400 mt-1">Monitor email communications and cloud application activities</p>
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
            <Cloud className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.totalActivities}</h3>
              <p className="text-sm text-gray-400">Total Activities</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Mail className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.highRiskActivities}</h3>
              <p className="text-sm text-gray-400">High Risk</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Mail className="h-8 w-8 text-orange-500" />
            <div>
              <h3 className="text-2xl font-bold">{stats.externalEmails}</h3>
              <p className="text-sm text-gray-400">External Emails</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Upload className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="text-2xl font-bold">{formatBytes(stats.totalUploadVolume)}</h3>
              <p className="text-sm text-gray-400">Total Uploads</p>
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
                placeholder="Search apps, emails, or users..."
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
                <option value="all">All Activities</option>
                <option value="high-risk">High Risk</option>
                <option value="external-email">External Emails</option>
                <option value="large-upload">Large Uploads</option>
                <option value="external-users">External Users</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Showing {filteredData.length} of {emailCloudData.length} activities
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-gray-800 rounded-lg">
        <DataTable 
          data={filteredData.map(item => ({
            ...item,
            uploadVolume: formatBytes(item.uploadVolume),
            downloadVolume: formatBytes(item.downloadVolume)
          }))} 
          columns={columns}
          onRowClick={(row) => console.log('Email/Cloud activity details:', row)}
        />
      </div>
    </div>
  );
};

export default EmailCloudApps;
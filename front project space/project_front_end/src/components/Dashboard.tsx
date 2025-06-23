import React from 'react';
import { AlertTriangle, Shield, Users, HardDrive, Network } from 'lucide-react';
import MetricCard from './common/MetricCard';
import DonutChart from './common/DonutChart';
import LineChart from './common/LineChart';
import BarChart from './common/BarChart';
import AlertsTable from './common/AlertsTable';

const Dashboard: React.FC = () => {
  const detectedAreaData = [
    { label: 'Dark Web', value: 99, color: '#2563EB' },
    { label: 'Email', value: 61, color: '#DC2626' },
    { label: 'Endpoint', value: 57, color: '#EA580C' },
    { label: 'Network', value: 29, color: '#16A34A' },
    { label: 'Other', value: 6, color: '#6B7280' },
  ];

  const tacticsData = [
    { label: 'Collection', value: 39, color: '#2563EB' },
    { label: 'Exfiltration', value: 36, color: '#DC2626' },
    { label: 'Initial Access', value: 38, color: '#EA580C' },
    { label: 'Defence Eva.', value: 24, color: '#EAB308' },
    { label: 'Execution', value: 21, color: '#16A34A' },
    { label: 'Discovery', value: 19, color: '#8B5CF6' },
  ];

  const timeSeriesData = [
    { time: '00:00', darkWeb: 2, email: 1, endpoint: 3, network: 0, other: 1 },
    { time: '04:00', darkWeb: 4, email: 2, endpoint: 5, network: 1, other: 0 },
    { time: '08:00', darkWeb: 8, email: 12, endpoint: 6, network: 3, other: 2 },
    { time: '12:00', darkWeb: 15, email: 8, endpoint: 10, network: 5, other: 1 },
    { time: '16:00', darkWeb: 12, email: 6, endpoint: 8, network: 4, other: 3 },
    { time: '20:00', darkWeb: 6, email: 3, endpoint: 4, network: 2, other: 1 },
  ];

  const topUsersData = [
    { name: 'Rosemary Malone', value: 78, risk: 'high' },
    { name: 'Brad Brooks', value: 230, risk: 'critical' },
    { name: 'Charlie Cassette', value: 100, risk: 'high' },
    { name: 'Clarence Beachum', value: 100, risk: 'high' },
    { name: 'Donald Daniels', value: 50, risk: 'medium' },
  ];

  const malwareData = [
    { month: 'Jan', detections: 45 },
    { month: 'Feb', detections: 52 },
    { month: 'Mar', detections: 78 },
    { month: 'Apr', detections: 65 },
    { month: 'May', detections: 89 },
    { month: 'Jun', detections: 72 },
  ];

  const escalatedAlerts = [
    {
      alert: 'OSINT Impossible Travel',
      escalatedBy: 'zblutro@threesilence.com',
      severity: 'critical',
      time: '2 hours ago'
    },
    {
      alert: 'OSINT Impossible Travel',
      escalatedBy: 'suraj.dang@threesilence.com',
      severity: 'high',
      time: '4 hours ago'
    },
    {
      alert: 'Missing Critical Patches',
      escalatedBy: 'suraj.dang@threesilence.com',
      severity: 'medium',
      time: '6 hours ago'
    },
    {
      alert: 'Dark Web Leaks',
      escalatedBy: 'suraj.dang@threesilence.com',
      severity: 'high',
      time: '8 hours ago'
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Security Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>Last updated: 2 minutes ago</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          title="High Severity Alerts"
          value="151"
          icon={AlertTriangle}
          color="red"
          trend="+12%"
        />
        <MetricCard
          title="Threat Notifications"
          value="7"
          icon={Shield}
          color="orange"
          trend="-3%"
        />
        <MetricCard
          title="Vulnerabilities"
          value="4"
          icon={AlertTriangle}
          color="yellow"
          trend="+1"
        />
        <MetricCard
          title="Devices at Risk"
          value="3"
          icon={HardDrive}
          color="red"
          trend="0%"
        />
        <MetricCard
          title="Users at Risk"
          value="11"
          icon={Users}
          color="red"
          trend="+2"
        />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detected Area Chart */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Detected Area</h3>
          <DonutChart data={detectedAreaData} />
        </div>

        {/* Alerts Over Time */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Alerts Over Time</h3>
          <LineChart data={timeSeriesData} />
        </div>

        {/* Alerts By Tactic */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Alerts By Tactic</h3>
          <DonutChart data={tacticsData} />
        </div>

        {/* Escalated Alerts */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Escalated Alerts</h3>
          <AlertsTable alerts={escalatedAlerts} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Users at Risk */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Top Users at Risk</h3>
          <BarChart data={topUsersData} type="horizontal" />
        </div>

        {/* Malware Detections */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Malware Detections</h3>
          <BarChart data={malwareData} type="vertical" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
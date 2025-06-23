import React from 'react';
import { 
  Shield, 
  Users, 
  Activity, 
  FileText, 
  Network, 
  Settings, 
  HardDrive, 
  Mail, 
  AlertTriangle, 
  Clipboard,
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Security Dashboard', icon: BarChart3 },
    { id: 'identity', label: 'Identity & Sessions', icon: Users },
    { id: 'process', label: 'Process Activity', icon: Activity },
    { id: 'files', label: 'File Operations', icon: FileText },
    { id: 'network', label: 'Network Connections', icon: Network },
    { id: 'registry', label: 'Registry Changes', icon: Settings },
    { id: 'media', label: 'Removable Media', icon: HardDrive },
    { id: 'email', label: 'Email & Cloud Apps', icon: Mail },
    { id: 'security', label: 'Security Alerts', icon: AlertTriangle },
    { id: 'clipboard', label: 'Clipboard & Capture', icon: Clipboard },
  ];

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-blue-500" />
          <div>
            <h1 className="text-xl font-bold">SecureOps</h1>
            <p className="text-sm text-gray-400">Insider Detection</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-700 transition-colors ${
                activeView === item.id ? 'bg-blue-600 border-r-2 border-blue-400' : ''
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
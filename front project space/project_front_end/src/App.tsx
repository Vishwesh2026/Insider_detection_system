import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import IdentitySessions from './components/IdentitySessions';
import ProcessActivity from './components/ProcessActivity';
import FileOperations from './components/FileOperations';
import NetworkConnections from './components/NetworkConnections';
import RegistryChanges from './components/RegistryChanges';
import RemovableMedia from './components/RemovableMedia';
import EmailCloudApps from './components/EmailCloudApps';
import SecurityAlerts from './components/SecurityAlerts';
import ClipboardCapture from './components/ClipboardCapture';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'identity':
        return <IdentitySessions />;
      case 'process':
        return <ProcessActivity />;
      case 'files':
        return <FileOperations />;
      case 'network':
        return <NetworkConnections />;
      case 'registry':
        return <RegistryChanges />;
      case 'media':
        return <RemovableMedia />;
      case 'email':
        return <EmailCloudApps />;
      case 'security':
        return <SecurityAlerts />;
      case 'clipboard':
        return <ClipboardCapture />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-auto">
        {renderActiveView()}
      </main>
    </div>
  );
}

export default App;
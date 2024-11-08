import React from 'react';
import { useAuth } from './contexts/AuthContext';
import { GoogleBtn } from './components/buttons/googleButton/GoogleBtn';
import { UserDashboard } from './components/dashboard/userDashboard/UserDashboard';
import './App.css';
import { SettingsPanel } from './components/panels/settingsPanel/SettingsPanel';
import { SettingsButton } from './components/dashboard/settingsButton/SettingsButton';
import { Header } from './components/dashboard/header/Header';
import FacturiPanel from './components/panels/facturiPanel/FacturiPanel';
import { useActiveTab } from './contexts/ActiveTabContext';
import { DesfasuratoarePanel } from './components/panels/desfasuratoarePanel/DesfasuratoarePanel';
import { DownloadFacturi } from './components/panels/facturiPanel/DownloadFacturi';
import { DownloadDesfasuratoare } from './components/panels/desfasuratoarePanel/DownloadDesfasuratoare';

function App() {
  const { user, loading } = useAuth();
  const { activeTab, setActiveTab } = useActiveTab();

  return (
    <div className='container'>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className='app-container'>
          <Header title={activeTab} />
          <div className='dashboard'>
            {user ? (
              <>
                {activeTab === 'userDashboard' && <UserDashboard />}
                {activeTab === 'settings' && <SettingsPanel />}
                {activeTab === 'userDashboard' && (
                  <SettingsButton onActiveTab={setActiveTab} />
                )}
                {activeTab === 'facturi' && <FacturiPanel />}
                {activeTab === 'desfasuratoare' && <DesfasuratoarePanel />}
                {activeTab === 'downloadFacturi' && <DownloadFacturi />}
                {activeTab === 'downloadDesfasuratoare' && (
                  <DownloadDesfasuratoare />
                )}
              </>
            ) : (
              <div className='googleBtn'>
                <GoogleBtn />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

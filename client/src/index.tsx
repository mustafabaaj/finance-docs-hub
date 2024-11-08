import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ActiveTabProvider } from './contexts/ActiveTabContext';
import { SelectedLabelsProvider } from './contexts/LabelsContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ActiveTabProvider>
        <SelectedLabelsProvider>
          <App />
        </SelectedLabelsProvider>
      </ActiveTabProvider>
    </AuthProvider>
  </React.StrictMode>
);

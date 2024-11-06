import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faList } from '@fortawesome/free-solid-svg-icons';
import Button from '../../buttons/button/Button';
import { useActiveTab } from '../../../contexts/ActiveTabContext';

export function SettingsPanel({ onActiveTab }) {
  const { setActiveTab } = useActiveTab();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <Button onClick={() => setActiveTab('facturi')} style={optionButton}>
        <FontAwesomeIcon icon={faFileInvoice} style={{ marginRight: '10px' }} />
        Facturi
      </Button>
      <Button
        onClick={() => setActiveTab('desfasuratoare')}
        style={optionButton}
      >
        <FontAwesomeIcon icon={faList} style={{ marginRight: '10px' }} />
        Desfasuratoare
      </Button>

      <Button
        style={{ position: 'absolute', bottom: '50px', left: '50px' }}
        onClick={() => onActiveTab('userDashboard')}
      >
        Back
      </Button>
    </div>
  );
}

const optionButton = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px 20px',
  fontSize: '18px',
  border: 'none',
  backgroundColor: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
};

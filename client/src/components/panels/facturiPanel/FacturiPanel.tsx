import React, { useState } from 'react';
import Button from '../../buttons/button/Button';
import { useActiveTab } from '../../../contexts/ActiveTabContext';
import { EmailList } from '../SelectionPanels/EmailList';
import { LabelList } from '../SelectionPanels/LabelList';

export function FacturiPanel() {
  const [form, setForm] = useState('');

  const { setActiveTab } = useActiveTab();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <Button onClick={() => setForm('emails')}>Emails</Button>
        <Button onClick={() => setForm('labels')}>labels</Button>
      </div>
      {form === 'emails' && <EmailList />}
      {form === 'labels' && <LabelList panelId='Facturi' />}
      <Button
        style={{ position: 'absolute', bottom: '50px', left: '50px' }}
        onClick={() => setActiveTab('settings')}
      >
        Back
      </Button>
    </>
  );
}

export default FacturiPanel;

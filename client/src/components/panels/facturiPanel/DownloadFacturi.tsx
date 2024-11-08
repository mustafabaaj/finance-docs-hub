import React, { useState } from 'react';
import { useSelectedLabels } from '../../../contexts/LabelsContext';
import Button from '../../buttons/button/Button';
import { useActiveTab } from '../../../contexts/ActiveTabContext';

export function DownloadFacturi() {
  const { setActiveTab } = useActiveTab();
  const { selectedLabels } = useSelectedLabels();
  console.log(selectedLabels);
  const [emails, setEmails] = useState([
    'email1@example.com',
    'email2@example.com',
  ]);
  const facturiLabels = selectedLabels['Facturi'] || new Set<string>();
  const hasLabels = facturiLabels.size > 0;
  const hasEmails = emails.length > 0;
  const [openSection, setOpenSection] = useState<'labels' | 'emails' | null>(
    null
  );

  const toggleSection = (section: 'labels' | 'emails') => {
    setOpenSection((prevSection) => (prevSection === section ? null : section));
  };

  const handleDownloadLabels = () => {
    console.log('Downloading labels:', selectedLabels);
  };

  const handleDownloadEmails = () => {
    console.log('Downloading emails:', emails);
  };

  return (
    <div className='download-facturi'>
      <h3>Download Facturi</h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '10px',
        }}
      >
        <Button onClick={() => toggleSection('labels')}>
          {openSection === 'labels'
            ? 'Hide Selected Labels'
            : 'Show Selected Labels'}
        </Button>
        <Button onClick={() => toggleSection('emails')}>
          {openSection === 'emails' ? 'Hide Emails' : 'Show Emails'}
        </Button>
      </div>
      <div style={{ marginTop: '50px' }}>
        {openSection === 'labels' && (
          <div>
            {openSection === 'labels' && (
              <div>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {Array.from(facturiLabels).map((label, index) => (
                    <li key={label}>
                      {index + 1}.{label}
                    </li>
                  ))}
                </ul>
                {hasLabels && (
                  <Button
                    onClick={() => console.log('Download with selected labels')}
                    style={{ marginTop: '100px' }}
                  >
                    Descarca cu label
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {openSection === 'emails' && (
          <>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {emails.map((email, index) => (
                <li key={index}>{email}</li>
              ))}
            </ul>
            {hasEmails && (
              <Button
                onClick={() => console.log('Download with selected emails')}
                style={{ marginTop: '100px' }}
              >
                Descarca cu email
              </Button>
            )}
          </>
        )}
      </div>
      <Button
        style={{ position: 'absolute', bottom: '50px', left: '50px' }}
        onClick={() => setActiveTab('userDashboard')}
      >
        Back
      </Button>
    </div>
  );
}

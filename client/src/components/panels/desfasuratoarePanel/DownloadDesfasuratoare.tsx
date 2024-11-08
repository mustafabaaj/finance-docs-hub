import React, { useState } from 'react';
import { useSelectedLabels } from '../../../contexts/LabelsContext';
import Button from '../../buttons/button/Button';
import { useActiveTab } from '../../../contexts/ActiveTabContext';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

interface SuccessState {
  status?: number;
}

export function DownloadDesfasuratoare() {
  const { setActiveTab } = useActiveTab();
  const { selectedLabels } = useSelectedLabels();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<SuccessState | null>(null);
  const [merge, setMerge] = useState(false);

  const [emails, setEmails] = useState([
    'email1@example.com',
    'email2@example.com',
  ]);

  const facturiLabels = selectedLabels['Desfasuratoare'] || new Set<string>();
  const [openSection, setOpenSection] = useState<'labels' | 'emails' | null>(
    null
  );
  const hasLabels = facturiLabels.size > 0;
  const hasEmails = emails.length > 0;

  const toggleSection = (section: 'labels' | 'emails') => {
    setOpenSection((prevSection) => (prevSection === section ? null : section));
  };

  const handleDownloadWithLabels = async () => {
    setLoading(true);
    setSuccess(null);
    setMerge(false);
    try {
      const response = await axios.get(
        'http://localhost:3001/api/documents/label',
        { withCredentials: true }
      );
      console.log(response);
      setSuccess(response);
    } catch (error) {
      setSuccess(error);
      console.error('Error downloading document:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMergeDocuments = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/api/documents/merge',
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        setMerge(true);
      }
    } catch (error) {
      setMerge(false);
      console.error('Error merging documents:', error);
    }
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
                {hasLabels && !loading && success?.status !== 200 && (
                  <Button
                    onClick={handleDownloadWithLabels}
                    style={{ marginTop: '100px' }}
                  >
                    Download using labels
                  </Button>
                )}
                {loading && (
                  <div
                    style={{
                      marginTop: '100px',
                      fontSize: '16px',
                    }}
                  >
                    <ClipLoader color='green' loading={loading} size={50} />
                    <p>Downloading, please wait...</p>
                  </div>
                )}
                {success && (
                  <>
                    <h1
                      style={{
                        color: 'green',
                        fontSize: '24px',
                        textAlign: 'center',
                        marginTop: '50px',
                      }}
                    >
                      Downloading successful
                    </h1>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px',
                      }}
                    >
                      <Button
                        onClick={handleDownloadWithLabels}
                        style={{ marginTop: '100px' }}
                      >
                        Download Again
                      </Button>
                      {merge ? (
                        <h4
                          style={{
                            color: 'green',
                            textAlign: 'center',
                            marginTop: '100px',
                          }}
                        >
                          Merge completed
                        </h4>
                      ) : (
                        <Button
                          onClick={handleMergeDocuments}
                          style={{ marginTop: '100px' }}
                        >
                          Merge Documents
                        </Button>
                      )}
                    </div>
                  </>
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

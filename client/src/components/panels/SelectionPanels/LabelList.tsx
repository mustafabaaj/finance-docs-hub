import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelectedLabels } from '../../../contexts/LabelsContext';

export function LabelList({ panelId }: { panelId: string }) {
  const { selectedLabels, setSelectedLabels, labels, setLabels } =
    useSelectedLabels();
  const [loading, setLoading] = useState(true);

  const response = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3001/api/user/labels', {
        withCredentials: true,
      });
      const filtredLabels = res?.data.labels.filter((label) =>
        (label.name as string).includes(panelId)
      );
      setLabels(filtredLabels);
    } catch (err) {
      console.log('Error fetching labels:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    response();
  }, []);

  const handleCheckboxChange = (label: string) => {
    const currentPanelLabels = selectedLabels[panelId] || new Set<string>();
    const updatedLabels = new Set(currentPanelLabels);
    if (updatedLabels.has(label)) {
      updatedLabels.delete(label);
    } else {
      updatedLabels.add(label);
    }
    setSelectedLabels(panelId, updatedLabels);
  };

  return (
    <div className='label-list'>
      <h3>Select Labels</h3>
      {loading ? (
        <p style={{ marginTop: '20px' }}>Loading labels...</p>
      ) : (
        <div
          className='scrollable-list'
          style={{
            padding: '30px',
            maxHeight: '200px',
            overflowY: 'auto',
            paddingRight: '10px',
          }}
        >
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {labels.map((label) => (
              <li
                key={label.id}
                style={{
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <input
                  type='checkbox'
                  checked={selectedLabels[panelId]?.has(label.name) || false}
                  onChange={() => handleCheckboxChange(label.name)}
                  id={`label-${label.id}`}
                  style={{ marginRight: '10px' }}
                />
                <label
                  htmlFor={`label-${label.id}`}
                  style={{ marginRight: '20px' }}
                >
                  {label.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelectedLabels } from '../../../contexts/SelectedLabelsContext';

export function LabelList() {
  const { selectedLabels, setSelectedLabels, labels, setLabels } =
    useSelectedLabels();

  const response = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/user/labels', {
        withCredentials: true,
      });
      const filtredLabels = res?.data.labels.filter((label) =>
        (label.name as string).includes('Desfasuratoare')
      );
      console.log(res.data.labels);
      setLabels(filtredLabels);
    } catch (err) {
      console.log('Error fetching labels:', err);
    }
  };

  useEffect(() => {
    if (labels.length === 0) response();
  }, [labels.length]);

  const handleCheckboxChange = (label: string) => {
    setSelectedLabels((prevSelectedLabels) => {
      const newSelectedLabels = new Set(prevSelectedLabels);
      if (newSelectedLabels.has(label)) {
        newSelectedLabels.delete(label);
      } else {
        newSelectedLabels.add(label);
      }
      return newSelectedLabels;
    });
  };

  return (
    <div className='label-list'>
      <h3>Select Labels</h3>
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
                checked={selectedLabels.has(label.name)}
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
      <div>
        <button
          onClick={() => {
            console.log('Selected Labels:', Array.from(selectedLabels));
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

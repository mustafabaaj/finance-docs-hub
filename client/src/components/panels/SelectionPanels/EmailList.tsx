import React, { useState } from 'react';
import Button from '../../buttons/button/Button';

export function EmailList() {
  const [emails, setEmails] = useState([
    'email1@example.com',
    'email2@example.com',
  ]);
  const [newEmail, setNewEmail] = useState('');

  const removeEmail = (emailToRemove) => {
    setEmails((prevEmails) =>
      prevEmails.filter((email) => email !== emailToRemove)
    );
  };

  const handleInputChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleAddEmail = (e) => {
    e.preventDefault();
    if (newEmail && !emails.includes(newEmail)) {
      setEmails([...emails, newEmail]);
      setNewEmail('');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: 'black' }}>Email List</h2>
      <ul style={styles.emailList}>
        {emails.map((email, index) => (
          <li key={index} style={styles.emailItem}>
            <span>{email}</span>
            <Button
              onClick={() => removeEmail(email)}
              style={styles.removeButton}
            >
              X
            </Button>
          </li>
        ))}
      </ul>

      <input
        type='email'
        value={newEmail}
        onChange={handleInputChange}
        placeholder='Enter new email'
        style={styles.input}
      />
      <Button onClick={handleAddEmail} style={styles.button}>
        Add Email
      </Button>
    </div>
  );
}
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    maxWidth: '400px',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'white',
  },
  emailList: {
    listStyleType: 'none',
    padding: 0,
    margin: '20px 0',
    maxHeight: '200px',
    overflowY: 'auto',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  emailItem: {
    padding: '10px',
    margin: '5px 0',
    borderRadius: '4px',
    backgroundColor: 'black',
    color: '#fff',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginRight: '10px',
    width: 'calc(100% - 100px)',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 15px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: 'black',
    color: '#fff',
    cursor: 'pointer',
  },
  removeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#d32f2f',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '18px',
  },
};

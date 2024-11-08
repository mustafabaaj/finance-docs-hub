import React from 'react';
import Button from '../../buttons/button/Button';
import styles from './UserDashboard.module.css';
import { useAuth } from '../../../contexts/AuthContext';
import { ProfileCard } from '../../profileCard/ProfileCard';
import { useActiveTab } from '../../../contexts/ActiveTabContext';

export function UserDashboard() {
  const { setActiveTab } = useActiveTab();
  const { logout } = useAuth();
  return (
    <div className={styles.container}>
      <ProfileCard />
      <div className={styles.buttonContainer}>
        <Button
          backgroundColor='white'
          onClick={logout}
          style={{ position: 'absolute', bottom: '50px', right: '50px' }}
        >
          Log Out
        </Button>
        <Button
          backgroundColor='white'
          onClick={() => setActiveTab('downloadFacturi')}
        >
          Descarca Facturi
        </Button>
        <Button
          backgroundColor='white'
          onClick={() => setActiveTab('downloadDesfasuratoare')}
        >
          Descarca Desfasuratoare
        </Button>
      </div>
    </div>
  );
}

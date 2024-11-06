import React from 'react';
import Button from '../../buttons/button/Button';
import styles from './UserDashboard.module.css';
import { useAuth } from '../../../contexts/AuthContext';
import { ProfileCard } from '../../profileCard/ProfileCard';

export function UserDashboard({ onActiveTab }) {
  const { logout } = useAuth();
  return (
    <div className={styles.container}>
      <ProfileCard />
      <div className={styles.buttonContainer}>
        <Button backgroundColor='white' onClick={logout}>
          Log Out
        </Button>
        <Button backgroundColor='white' onClick={() => {}}>
          Descarca Documentele
        </Button>
      </div>
    </div>
  );
}

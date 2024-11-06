import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './ProfileCard.module.css';

export function ProfileCard() {
  const { user } = useAuth();
  return (
    <>
      <img src={user?.image} alt={user?.name} className={styles.profileImage} />
      <h1>Bine ai venit {user?.name}</h1>
    </>
  );
}

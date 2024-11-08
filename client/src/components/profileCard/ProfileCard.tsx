import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './ProfileCard.module.css';

export function ProfileCard() {
  const { user } = useAuth();

  const fallbackImage =
    'https://global.discourse-cdn.com/turtlehead/original/2X/c/c830d1dee245de3c851f0f88b6c57c83c69f3ace.png';
  return (
    <>
      <img
        src={fallbackImage}
        alt={user?.name}
        className={styles.profileImage}
      />
      <h1>Bine ai venit {user?.name}</h1>
    </>
  );
}

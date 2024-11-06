import React from 'react';
import styles from './Header.module.css';

export function Header({ title }) {
  return (
    <header className={styles.header}>
      <h3 className={styles.headerTitle}>{title}</h3>
    </header>
  );
}

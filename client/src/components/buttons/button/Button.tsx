import React from 'react';
import styles from './Button.module.css';

export default function Button({
  children,
  onClick,
  color = 'black',
  backgroundColor = 'white',
  style = {},
}) {
  return (
    <button
      className={styles.button}
      style={{
        backgroundColor,
        color,
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

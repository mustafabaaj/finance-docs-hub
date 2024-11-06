import Button from '../../buttons/button/Button';
import { ReactComponent as SettingsIcon } from '../../../assets/icons/settings.svg';
import React from 'react';

export function SettingsButton({ onActiveTab }) {
  return (
    <Button
      onClick={() => onActiveTab('settings')}
      backgroundColor={'black'}
      style={{ position: 'absolute', bottom: '50px', left: '50px' }}
    >
      <SettingsIcon />
    </Button>
  );
}

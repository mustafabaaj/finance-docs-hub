import React from 'react';
import GoogleButton from 'react-google-button';

export function GoogleBtn() {
  async function handleGetGoogleAuthURL() {
    try {
      const response = await fetch('http://localhost:3001/googleAuth');
      const data = await response.json();
      const url = data.url;
      window.open(url, '_blank');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <GoogleButton
      onClick={() => {
        handleGetGoogleAuthURL();
      }}
    />
  );
}

import React, { createContext, useState, useContext } from 'react';

interface ActiveTabContextType {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const ActiveTabContext = createContext<ActiveTabContextType | undefined>(
  undefined
);

export const ActiveTabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('userDashboard');

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
};

export const useActiveTab = () => {
  const context = useContext(ActiveTabContext);
  if (!context) {
    throw new Error('Error useActiveTab');
  }
  return context;
};

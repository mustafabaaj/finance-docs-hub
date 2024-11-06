import React, { createContext, useState, useContext } from 'react';
type Label = {
  id: string;
  name: string;
};
type SelectedLabelsContextType = {
  selectedLabels: Set<string>;
  setSelectedLabels: React.Dispatch<React.SetStateAction<Set<string>>>;
  labels: Label[];
  setLabels: React.Dispatch<React.SetStateAction<string[]>>;
};

const SelectedLabelsContext = createContext<
  SelectedLabelsContextType | undefined
>(undefined);

export const SelectedLabelsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedLabels, setSelectedLabels] = useState<Set<string>>(new Set());
  const [labels, setLabels] = useState<any[]>([]);

  return (
    <SelectedLabelsContext.Provider
      value={{ selectedLabels, setSelectedLabels, labels, setLabels }}
    >
      {children}
    </SelectedLabelsContext.Provider>
  );
};

export const useSelectedLabels = () => {
  const context = useContext(SelectedLabelsContext);
  if (!context) {
    throw new Error(
      'useSelectedLabels must be used within a SelectedLabelsProvider'
    );
  }
  return context;
};

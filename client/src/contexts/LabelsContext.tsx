import React, { createContext, useState, useContext } from 'react';
type Label = {
  id: string;
  name: string;
};

type PanelLabels = {
  [panelId: string]: Set<string>;
};

type SelectedLabelsContextType = {
  selectedLabels: PanelLabels;
  setSelectedLabels: (panelId: string, labels: Set<string>) => void;
  labels: Label[];
  setLabels: React.Dispatch<React.SetStateAction<Label[]>>;
};

const SelectedLabelsContext = createContext<
  SelectedLabelsContextType | undefined
>(undefined);

export const SelectedLabelsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedLabels, setSelectedLabelsState] = useState<PanelLabels>({});
  const [labels, setLabels] = useState<Label[]>([]);

  const setSelectedLabels = (panelId: string, labels: Set<string>) => {
    setSelectedLabelsState((prevSelectedLabels) => ({
      ...prevSelectedLabels,
      [panelId]: labels,
    }));
  };

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

import React, { createContext, useContext, useState, useCallback } from 'react';

const MainContext = createContext();
export default MainContext;
export function useMainContext() {
  return useContext(MainContext);
}

export function MainProvider({ children }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [contextData, setContextData] = useState({});

  const updateData = (key, value) => {
    setContextData(prevData => ({ ...prevData, [key]: value }));
  }

  const updateMultipleData = (newData) => {
    setContextData(prevData => ({ ...prevData, ...newData }));
  }

  const value = {
    contextData,
    updateData,
    updateMultipleData,
    setIsLoading,
    isLoading
  };

  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  );
}

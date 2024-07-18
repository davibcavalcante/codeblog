import React, { createContext, useState } from 'react';

const AsideContext = createContext();

export const AsideProvider = ({ children }) => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  return (
    <AsideContext.Provider value={{ isAsideOpen, toggleAside }}>
      {children}
    </AsideContext.Provider>
  );
};

export default AsideContext;
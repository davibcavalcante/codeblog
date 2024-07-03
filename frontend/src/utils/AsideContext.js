import React, { createContext, useState } from 'react';

const AsideContext = createContext();

export const AsideProvider = ({ children }) => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  return React.createElement(
    AsideContext.Provider,
    { value: { isAsideOpen, toggleAside } },
    children
  );  
};

export default AsideContext;
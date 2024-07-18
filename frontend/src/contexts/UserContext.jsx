import React, { createContext, useState } from 'react';
import useFetchUser from '../hooks/useFetchUser';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, error, loading, refetchUser } = useFetchUser();

  return (
    <UserContext.Provider value={{ user, error, loading, refetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
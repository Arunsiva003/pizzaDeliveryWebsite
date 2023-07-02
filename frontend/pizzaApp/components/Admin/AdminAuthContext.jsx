import React, { createContext, useState } from 'react';

// Create the context
export const AdminAuthContext = createContext();

// Create a provider component to wrap your app and provide the context value
export const AdminAuthProvider = ({ children }) => {
  const [isadminauth, setisadminauth] = useState(false);

  return (
    <AdminAuthContext.Provider value={{ isadminauth, setisadminauth }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

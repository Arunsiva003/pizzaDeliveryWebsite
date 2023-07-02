import React, { createContext, useState } from 'react';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [name, setName] = useState('');

  const updateName = (name) => {
    console.log("userContext.js")
    setName(name);

    console.log("name",name);
  };

  return (
    <UserContext.Provider value={{ name, updateName }}>
      {children}
    </UserContext.Provider>
  );
};

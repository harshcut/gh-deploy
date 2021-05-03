import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const ContextProvider = ({ children }) => {
  const [context, setContext] = useState(false);

  return (
    <UserContext.Provider value={[context, setContext]}>
      {children}
    </UserContext.Provider>
  );
};

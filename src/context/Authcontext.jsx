import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('details') !== null);
  const [userData, setUserData] = useState(null);

  const login = (userData) => {
    localStorage.setItem('details', JSON.stringify(userData))
    localStorage.setItem('productList', JSON.stringify([]))
    setIsLoggedIn(true);
    setUserData(userData);
  };

  const logout = () => {
    localStorage.removeItem('details');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

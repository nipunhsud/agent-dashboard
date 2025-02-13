import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    console.log('Setting up auth state listener');
    
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('Auth state changed. Current user:', currentUser);
      
      if (currentUser) {
        console.log('User is signed in:', {
          email: currentUser.email,
          uid: currentUser.uid,
          displayName: currentUser.displayName
        });
        
        const idToken = await currentUser.getIdToken();
        console.log('Got ID token:', idToken.substring(0, 20) + '...');
        
        setUser(currentUser);
        setToken(idToken);
      } else {
        console.log('User is signed out');
        setUser(null);
        setToken(null);
      }      
    });

    return () => {
      console.log('Cleaning up auth state listener');
      unsubscribe();
    };
  }, []);

  console.log('AuthContext current state:', { 
    isUserSet: !!user, 
    userEmail: user?.email,
    hasToken: !!token 
  });

  return (
    <AuthContext.Provider value={{ user, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

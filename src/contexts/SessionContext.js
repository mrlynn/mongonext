/**
 * @file Session context provider for authentication state management
 * @module contexts/SessionContext
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

/**
 * Context for accessing session information throughout the app
 * @type {React.Context}
 */
const SessionContext = createContext(null);

/**
 * Custom hook to access the session context
 * @returns {Object} Session context value
 */
export const useSessionContext = () => useContext(SessionContext);

/**
 * Session context provider component
 * Wraps the application to provide session state
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactElement} The provider component
 */
export const SessionProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    } else {
      setUser(null);
    }
  }, [session]);
  
  // Create the context value
  const contextValue = {
    user,
    isAuthenticated: !!user,
    isLoading: status === 'loading',
    isAdmin: user?.role === 'admin',
    isVerified: user?.isVerified,
  };
  
  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
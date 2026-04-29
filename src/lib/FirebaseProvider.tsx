import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  signInAsGuest: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, signInAsGuest: () => {}, signOut: () => {} });

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there's a guest user in localStorage
    const savedUser = localStorage.getItem('jezsmart_guest_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setLoading(false);
    } else {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });
      return unsubscribe;
    }
  }, []);

  const signInAsGuest = () => {
    const guestUser = {
      uid: 'guest_' + Math.random().toString(36).substr(2, 9),
      displayName: 'Guest Citizen',
      email: 'guest@jezsmart.kz',
      photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest',
      isGuest: true
    };
    localStorage.setItem('jezsmart_guest_user', JSON.stringify(guestUser));
    setUser(guestUser);
  };

  const signOut = async () => {
    localStorage.removeItem('jezsmart_guest_user');
    await auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInAsGuest, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Error Handling helper
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  const jsonError = JSON.stringify(errInfo);
  console.error('Firestore Error: ', jsonError);
  throw new Error(jsonError);
}

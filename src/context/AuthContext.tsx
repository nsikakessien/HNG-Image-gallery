import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { User } from "firebase/auth";

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const localStorageUserInformation =
    JSON.parse(localStorage.getItem("currentUser") as string) || null;
  const [currentUser, setCurrentUser] = useState<User | null>(
    localStorageUserInformation
  );
  const [isLoading, setIsLoading] = useState(true); // Set isLoading to true initially

  useEffect(() => {
    // Check if the user is already authenticated when the component mounts
    const user = auth.currentUser;
    if (user) {
      setCurrentUser(user);
    }

    setIsLoading(false); // Set isLoading to false after checking for the current user

    // Listen for changes in authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
    });

    return () => unsubscribe();
  }, []);

  const contextValue: AuthContextType = {
    currentUser,
    isLoading,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

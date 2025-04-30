
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { User, UserRole, AuthState } from '../types/auth';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext<AuthState | undefined>(undefined);

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('stock-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  const login = async (email: string, password: string, role: UserRole): Promise<User> => {
    // In a real app, this would validate against a backend
    // For now, we'll simulate a successful login with a delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation for demo
        if (!email || !password) {
          toast.error("Email and password required");
          reject(new Error("Email and password are required"));
          return;
        }

        const newUser: User = {
          id: uuidv4(),
          email,
          name: email.split('@')[0], // Just use part of email as name for demo
          role
        };

        setUser(newUser);
        localStorage.setItem('stock-user', JSON.stringify(newUser));
        toast.success(`Logged in successfully as ${role}`);
        resolve(newUser);
      }, 500); // Simulate network delay
    });
  };

  const signup = async (name: string, email: string, password: string, role: UserRole): Promise<User> => {
    // In a real app, this would register with a backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation for demo
        if (!name || !email || !password) {
          toast.error("Name, email and password required");
          reject(new Error("Name, email and password are required"));
          return;
        }

        const newUser: User = {
          id: uuidv4(),
          email,
          name,
          role
        };

        setUser(newUser);
        localStorage.setItem('stock-user', JSON.stringify(newUser));
        toast.success(`Account created successfully as ${role}`);
        resolve(newUser);
      }, 500); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stock-user');
    toast.info("Logged out successfully");
  };

  const value: AuthState = {
    user,
    isAuthenticated,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

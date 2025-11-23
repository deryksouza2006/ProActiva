import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import type { User, AuthResponse, LoginFormData, RegisterFormData } from '../types/api';
import { login as apiLogin, register as apiRegister } from '../services/authService';

// 1. Definição do Tipo do Contexto
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
}

// 2. Criação do Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Provedor do Contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  // 🔧 User com proteção contra JSON inválido
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem('proactiva_user');
      if (!storedUser) return null;
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Erro ao carregar usuário do localStorage:", error);
      localStorage.removeItem('proactiva_user');
      return null;
    }
  });

  // 🔧 Token também com proteção
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('proactiva_token');
    } catch (error) {
      console.error("Erro ao carregar token do localStorage:", error);
      localStorage.removeItem('proactiva_token');
      return null;
    }
  });

  const isAuthenticated = useMemo(() => !!user && !!token, [user, token]);

  const saveAuthData = (authData: AuthResponse) => {
    setUser(authData.user);
    setToken(authData.token);
    localStorage.setItem('proactiva_user', JSON.stringify(authData.user));
    localStorage.setItem('proactiva_token', authData.token);
  };

  const login = useCallback(async (credentials: LoginFormData) => {
    const authData = await apiLogin(credentials);
    saveAuthData(authData);
  }, []);

  const register = useCallback(async (data: RegisterFormData) => {
    const authData = await apiRegister(data);
    saveAuthData(authData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('proactiva_user');
    localStorage.removeItem('proactiva_token');
  }, []);

  const contextValue = useMemo(() => ({
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
  }), [user, token, isAuthenticated, login, register, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Hook Customizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

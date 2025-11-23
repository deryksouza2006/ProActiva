import React, { createContext, useContext, useState, useEffect, type ReactNode,  } from 'react';

// 1. Definir o tipo para o contexto
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// 2. Criar o contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Criar o provedor do contexto
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Inicializa o estado lendo do localStorage ou usando a preferência do sistema
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      return true;
    }
    // Verifica a preferência do sistema se não houver tema armazenado
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Efeito para aplicar a classe 'dark' ao <html> e salvar no localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Função para alternar o tema
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Criar um hook customizado para usar o contexto
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

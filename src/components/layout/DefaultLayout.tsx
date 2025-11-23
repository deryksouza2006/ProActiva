import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../Header';
import Footer from '../Footer';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header />
      <main className={`flex-grow container mx-auto px-4 py-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;

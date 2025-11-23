import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DashboardLayout: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Definir quais páginas devem mostrar sidebar mesmo sem autenticação
  const publicPagesWithSidebar = ['/', '/sobre', '/integrantes', '/faq', '/contato'];
  
  // Páginas de autenticação que NÃO devem mostrar sidebar
  const authPagesWithoutSidebar = ['/login', '/cadastro'];
  
  // Lógica para mostrar sidebar:
  // 1. Se está autenticado → SEMPRE mostra sidebar
  // 2. Se NÃO está autenticado → mostra apenas em páginas públicas específicas
  const showSidebar = isAuthenticated || publicPagesWithSidebar.includes(location.pathname);
  
  // Lógica para esconder sidebar completamente em páginas de auth
  const hideSidebarCompletely = !isAuthenticated && authPagesWithoutSidebar.includes(location.pathname);

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} relative`}>
      {/* Sidebar condicional */}
      {!hideSidebarCompletely && showSidebar && (
        <>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          {/* Overlay para telas pequenas */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
              onClick={toggleSidebar}
            />
          )}
        </>
      )}
      
	      {/* Botão de Menu para Telas Pequenas (fora do main) */}
	      {!hideSidebarCompletely && showSidebar && !isSidebarOpen && (
	        <button 
	          onClick={toggleSidebar} 
	          className={`fixed top-4 left-4 z-40 p-2 rounded-full transition-colors md:hidden ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
	        >
	          <Menu className="w-6 h-6" />
	        </button>
	      )}
	      
	      {/* Conteúdo principal com margem condicional */}
		      <div className={`flex-grow transition-all duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} ${
        hideSidebarCompletely 
          ? 'ml-0' 
          : showSidebar && isSidebarOpen 
            ? 'md:ml-64' 
            : showSidebar 
              ? 'md:ml-16' 
              : 'ml-0'
      }`}>
	        <main className={`p-8 pt-16 md:pt-8 min-h-screen ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
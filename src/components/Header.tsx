import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Menu, User } from 'lucide-react';

interface HeaderProps {
  isDashboard?: boolean;
  toggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDashboard = false, toggleSidebar }) => {
  const { isAuthenticated, logout } = useAuth();
  const { isDarkMode } = useTheme();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Integrantes', path: '/integrantes' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <header className={`shadow-md sticky top-0 z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo e Título */}
        <div className="flex items-center">
          {isDashboard && toggleSidebar && (
            <button onClick={toggleSidebar} className={`mr-4 p-2 rounded-full transition-colors md:hidden ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <Menu className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
          )}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-proactiva-purple rounded-lg flex items-center justify-center text-white font-bold text-xl">P</div>
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>ProActiva</span>
          </Link>
        </div>

        {/* Navegação Principal */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link key={item.name} to={item.path} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-proactiva-purple transition-colors`}>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Ações de Usuário */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard/perfil" className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <User className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              </Link>
              <button
                onClick={logout}
                className="flex items-center space-x-1 text-proactiva-red hover:text-red-700 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-proactiva-purple transition-colors hidden sm:inline`}>
                Login
              </Link>
              <Link to="/cadastro" className="btn-primary">
                Cadastro
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

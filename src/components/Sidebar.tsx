import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { LayoutDashboard, Clock, ListChecks, Heart, Smile, Wind, User, LogOut, X, Menu, HelpCircle, Mail, Users, Home, Info, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Links públicos básicos (visíveis para todos nas páginas públicas)
  const publicNavItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Sobre', path: '/sobre', icon: Info },
    { name: 'Integrantes', path: '/integrantes', icon: Users },
    { name: 'FAQ', path: '/faq', icon: HelpCircle },
    { name: 'Contato', path: '/contato', icon: Mail },
  ];

  // Links privados (apenas para usuários autenticados)
  const privateNavItems = [
    { name: 'Timer de Foco', path: '/dashboard/timer', icon: Clock },
    { name: 'Tarefas', path: '/dashboard/tarefas', icon: ListChecks },
    { name: 'Bem-Estar', path: '/dashboard/bem-estar', icon: Heart },
    { name: 'Respiração', path: '/dashboard/respiracao', icon: Wind },
    { name: 'Perfil', path: '/dashboard/perfil', icon: User },
  ];

  // Combinar links baseado no estado de autenticação
  const getNavItems = () => {
    if (isAuthenticated) {
      // Usuário logado: Home redireciona para Dashboard + links privados
      return [
        { name: 'Home', path: '/dashboard', icon: Home }, // Home agora é o Dashboard
        ...publicNavItems.filter(item => item.name !== 'Home'), // Remove o Home original
        ...privateNavItems
      ];
    } else {
      // Usuário não logado: mostra apenas links públicos (SEM login/cadastro na lista)
      return publicNavItems;
    }
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavClick = (path: string) => {
    // Se o usuário está autenticado e clica em "/", redireciona para "/dashboard"
    if (isAuthenticated && path === '/') {
      navigate('/dashboard');
      return;
    }
    navigate(path);
  };

  const baseClasses = "fixed top-0 left-0 h-full shadow-xl transition-transform duration-300 z-30 flex flex-col";
  const openClasses = "w-64 md:w-64";
  const closedClasses = "w-16 md:w-16";

  return (
    <aside className={`${baseClasses} ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} ${isOpen ? openClasses : closedClasses} ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      {/* Header da Sidebar */}
      <div className={`p-4 flex items-center justify-between h-20 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
        <div 
          onClick={() => handleNavClick(isAuthenticated ? '/dashboard' : '/')} 
          className={`flex items-center space-x-2 overflow-hidden cursor-pointer ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-violet-600 flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles w-5 h-5 text-white">
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
              <path d="M20 3v4"></path>
              <path d="M22 5h-4"></path>
              <path d="M4 17v2"></path>
              <path d="M5 18H3"></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-gray-800'}">ProActiva</span>
            <span className={`text-xs whitespace-nowrap ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {isAuthenticated ? 'Assistente Inteligente' : 'Bem-vindo'}
            </span>
          </div>
        </div>
        <button onClick={toggleSidebar} className={`p-1 rounded-full transition-colors md:hidden ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
          {isOpen ? <X className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} /> : <Menu className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />}
        </button>
      </div>

      {/* Navegação */}
      <nav className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden p-3">
        <h3 className={`flex h-8 shrink-0 items-center rounded-md outline-none transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 text-xs font-semibold uppercase tracking-wider px-3 py-3 ${isOpen ? 'block' : 'hidden'} ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>
          {isAuthenticated ? 'Navegação' : 'Menu Principal'}
        </h3>
        
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              onClick={() => handleNavClick(item.path)}
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 cursor-pointer ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-700 to-purple-600 animate-pulse text-white shadow-md' 
                  : `${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-proactiva-purple'}`} />
              <span className={`ml-4 whitespace-nowrap overflow-hidden ${isOpen ? 'block' : 'hidden'}`}>
                {item.name}
              </span>
            </div>
          );
        })}

        {/* Status Rápido apenas para usuários autenticados */}
        {isAuthenticated && (
          <div className={`pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            <h3 className={`text-xs font-semibold uppercase mb-2 ${isOpen ? 'block' : 'hidden'} ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Status Rápido
            </h3>
            <div className={`flex items-center p-3 rounded-lg ${isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600'} ${isOpen ? 'justify-start' : 'justify-center'}`}>
              <ListChecks className="w-5 h-5" />
              <span className={`ml-4 whitespace-nowrap overflow-hidden ${isOpen ? 'block' : 'hidden'}`}>
                Metas Ativas: 0
              </span>
            </div>
          </div>
        )}
      </nav>

      {/* Footer da Sidebar APENAS para usuários autenticados */}
      {isAuthenticated && (
        <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}>
            {/* Botão de Tema Escuro */}
            <button
              onClick={toggleTheme}
              title={isDarkMode ? 'Tema Claro' : 'Tema Escuro'}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {/* Fim Botão de Tema Escuro */}
            {user && (
              <div className={`flex items-center space-x-3 overflow-hidden ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-8 h-8 bg-proactiva-purple rounded-full flex items-center justify-center text-white text-sm">
                  {user.nomeCompleto.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col text-sm">
                  <span className="font-semibold">{user.nomeCompleto}</span>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</span>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              title="Sair"
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-red-900 hover:text-proactiva-red' : 'text-gray-600 hover:bg-red-100 hover:text-proactiva-red'}`}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
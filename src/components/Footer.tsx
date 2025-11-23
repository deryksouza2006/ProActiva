import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();
  return (
    <footer className={`mt-12 ${isDarkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Coluna 1: Sobre ProActiva */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Sobre ProActiva</h4>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Plataforma de produtividade e desenvolvimento profissional contínuo para o futuro do trabalho.
            </p>
          </div>

          {/* Coluna 2: Links */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-proactiva-purple transition-colors`}>Home</Link></li>
              <li><Link to="/sobre" className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-proactiva-purple transition-colors`}>Sobre</Link></li>
              <li><Link to="/integrantes" className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-proactiva-purple transition-colors`}>Integrantes</Link></li>
              <li><Link to="/faq" className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-proactiva-purple transition-colors`}>FAQ</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Contato</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-proactiva-purple transition-colors`}>Fale Conosco</a></li>
              <li><a href="mailto:contato@proactiva.com" className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-proactiva-purple transition-colors`}>Email</a></li>
            </ul>
          </div>

          {/* Coluna 4: Redes Sociais */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Redes Sociais</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-proactiva-purple transition-colors`}>
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-proactiva-purple transition-colors`}>
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Direitos Autorais e Links Legais */}
        <div className={`mt-12 pt-6 border-t ${isDarkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-500'} flex flex-col md:flex-row justify-between items-center text-xs`}>
          <p>© 2025 ProActiva. Todos os direitos reservados.</p>
          <div className="space-x-4 mt-3 md:mt-0">
            <a href="#" className={`${isDarkMode ? 'text-gray-500' : 'text-gray-500'} hover:text-proactiva-purple transition-colors`}>Privacidade</a>
            <a href="#" className={`${isDarkMode ? 'text-gray-500' : 'text-gray-500'} hover:text-proactiva-purple transition-colors`}>Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

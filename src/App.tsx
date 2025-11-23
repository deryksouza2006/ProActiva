import React, { Suspense } from 'react';
import { useTheme } from './contexts/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import Loading from './components/Loading';

const App: React.FC = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <AppRoutes />
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;

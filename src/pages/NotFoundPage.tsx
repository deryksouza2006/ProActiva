import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../components/layout/DefaultLayout';

const NotFoundPage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
        <h2 className="text-3xl font-semibold text-gray-600 mt-4 mb-6">Página Não Encontrada</h2>
        <p className="text-gray-500 mb-8">
          Ops! Parece que você se perdeu. A página que você está procurando não existe.
        </p>
        <Link to="/" className="btn-primary">
          Voltar para a Home
        </Link>
      </div>
    </DefaultLayout>
  );
};

export default NotFoundPage;

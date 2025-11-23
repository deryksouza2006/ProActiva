import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
          Bem-vindo ao <span className="text-proactiva-purple">ProActiva</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Plataforma de produtividade e desenvolvimento profissional contínuo para o futuro do trabalho.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/login" className="btn-secondary px-8 py-3 text-lg">
            Login
          </Link>
          <Link to="/cadastro" className="btn-primary px-8 py-3 text-lg">
            Cadastro
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

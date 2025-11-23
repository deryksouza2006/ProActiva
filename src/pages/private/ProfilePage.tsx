import React from 'react';
import { User, Mail, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent mb-2">
          Meu Perfil <User className="w-6 h-6 text-purple-600 ml-2 inline" />
        </h1>
        <p className="text-lg text-gray-500">Gerencie suas informações pessoais</p>
      </header>

      {/* Cartão Principal do Perfil */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
        <div className="flex items-center space-x-4 border-b pb-6 mb-6">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user?.nomeCompleto?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{user?.nomeCompleto || 'Usuário'}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 mt-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none">
              Usuário
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Email */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-purple-600" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">Email</span>
                <span className="text-gray-800 font-semibold">{user?.email}</span>
              </div>
            </div>
          </div>

          {/* Nome Completo */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-purple-600" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">Nome Completo</span>
                <span className="text-gray-800 font-semibold">{user?.nomeCompleto || 'Usuário'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botão Sair da Conta */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
          <button
            onClick={logout}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair da Conta</span>
          </button>
        </div>
      </div>

      {/* Seções Adicionais */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border text-card-foreground border-none shadow-xl bg-white">
          <div className="flex flex-col space-y-1.5 p-6 border-b border-slate-100">
            <div className="font-semibold tracking-tight text-lg">Sobre o ProActiva</div>
          </div>
          <div className="p-6 pt-6">
            <p className="text-sm text-slate-600 leading-relaxed">O ProActiva é seu assistente inteligente de produtividade e requalificação profissional. Utilizamos IA para ajudá-lo a manter o equilíbrio entre produtividade e bem-estar, enquanto investe no aprendizado contínuo.</p>
          </div>
        </div>
        <div className="rounded-xl border text-card-foreground border-none shadow-xl bg-gradient-to-br from-white to-emerald-50">
          <div className="flex flex-col space-y-1.5 p-6 border-b border-emerald-100">
            <div className="font-semibold tracking-tight text-lg text-emerald-900">Dicas para Melhor Uso</div>
          </div>
          <div className="p-6 pt-6">
            <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
              <li>Faça check-ins diários de bem-estar</li>
              <li>Use o timer de foco regularmente</li>
              <li>Defina metas de aprendizado realistas</li>
              <li>Revise seus insights de IA semanalmente</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
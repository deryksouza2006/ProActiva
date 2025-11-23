import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import type { LoginFormData } from '../../types/api';

// 1. Definição do Schema de Validação com Zod
const loginSchema = z.object({
  email: z.string().email("Formato de e-mail inválido.").min(1, "O e-mail é obrigatório."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setError(null);
    setIsLoading(true);
    try {
      await login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao fazer login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex justify-center items-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-md w-full text-center">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-proactiva-purple rounded-lg flex items-center justify-center text-white font-bold text-2xl mb-2">P</div>
          <h1 className="text-2xl font-bold text-gray-800">ProActiva</h1>
          <p className="text-gray-500">Faça login na sua conta</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Campo Email */}
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="Seu E-mail"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-proactiva-purple focus:border-proactiva-purple"
                {...register('email')}
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-proactiva-red text-left">{errors.email.message}</p>}
          </div>

          {/* Campo Senha */}
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="********"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-proactiva-purple focus:border-proactiva-purple"
                {...register('password')}
              />
            </div>
            {errors.password && <p className="mt-1 text-sm text-proactiva-red text-left">{errors.password.message}</p>}
          </div>

          {error && (
            <div className="bg-red-100 border border-proactiva-red text-proactiva-red p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary w-full py-3 text-lg"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 text-sm space-y-2">
          <p>
            Não tem uma conta?{' '}
            <Link to="/cadastro" className="text-proactiva-purple hover:underline font-semibold">
              Cadastre-se
            </Link>
          </p>
          <p>
            <Link to="#" className="text-gray-500 hover:text-proactiva-purple hover:underline">
              Esqueceu sua senha?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
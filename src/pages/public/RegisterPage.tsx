import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import type { RegisterFormData } from '../../types/api';

// 1. Definição do Schema de Validação com Zod
const registerSchema = z.object({
  nomeCompleto: z.string().min(3, "O nome completo é obrigatório."),
  email: z.string().email("Formato de e-mail inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  confirmPassword: z.string().min(6, "A confirmação de senha é obrigatória."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});

const RegisterPage: React.FC = () => {
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setError(null);
    setIsLoading(true);
    try {
      await authRegister(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao tentar se cadastrar.');
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
          <p className="text-gray-500">Crie sua conta</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Campo Nome Completo */}
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="nomeCompleto"
                type="text"
                placeholder="Seu nome completo"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-proactiva-purple focus:border-proactiva-purple"
                {...register('nomeCompleto')}
              />
            </div>
            {errors.nomeCompleto && <p className="mt-1 text-sm text-proactiva-red text-left">{errors.nomeCompleto.message}</p>}
          </div>

          {/* Campo Email */}
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
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
                placeholder="Senha *"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-proactiva-purple focus:border-proactiva-purple"
                {...register('password')}
              />
            </div>
            {errors.password && <p className="mt-1 text-sm text-proactiva-red text-left">{errors.password.message}</p>}
          </div>

          {/* Campo Confirmar Senha */}
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirmar Senha *"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-proactiva-purple focus:border-proactiva-purple"
                {...register('confirmPassword')}
              />
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-proactiva-red text-left">{errors.confirmPassword.message}</p>}
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
            {isLoading ? 'Criando Conta...' : 'Criar Conta'}
          </button>
        </form>

        <div className="mt-6 text-sm">
          <p>
            Já tem uma conta?{' '}
            <Link to="/login" className="text-proactiva-purple hover:underline font-semibold">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
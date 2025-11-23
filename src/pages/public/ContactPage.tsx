import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ArrowLeft } from 'lucide-react';

// Schema de validação com Zod
const contatoSchema = z.object({
  nome: z.string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z.string()
    .min(1, 'Email é obrigatório')
    .email('Email deve ter um formato válido'),
  telefone: z.string()
    .optional()
    .refine((val) => !val || /^[\(\)\s\-\+\d]+$/.test(val), {
      message: 'Telefone deve conter apenas números, espaços, parênteses e hífens'
    }),
  assunto: z.string()
    .min(1, 'Assunto é obrigatório'),
  mensagem: z.string()
    .min(1, 'Mensagem é obrigatória')
    .min(10, 'Mensagem deve ter pelo menos 10 caracteres')
    .max(1000, 'Mensagem deve ter no máximo 1000 caracteres')
});

type ContatoFormData = z.infer<typeof contatoSchema>;

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContatoFormData>({
    resolver: zodResolver(contatoSchema)
  });

  const onSubmit = async (_data: ContatoFormData) => {
    setIsSubmitting(true);
    
    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Resetar formulário
    reset();
  };

  if (submitSuccess) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center bg-white rounded-xl shadow-lg p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Mensagem Enviada!</h1>
          <p className="text-gray-600 mb-6">
            Obrigado pelo seu contato. Nossa equipe responderá em até 24 horas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to="/" 
              className="bg-proactiva-purple text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
            >
              Voltar ao início
            </Link>
            <button 
              onClick={() => setSubmitSuccess(false)}
              className="border border-proactiva-purple text-proactiva-purple px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors duration-200"
            >
              Enviar nova mensagem
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Cabeçalho */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Entre em Contato</h1>
        <p className="text-xl text-gray-500">
          Tem alguma dúvida ou sugestão? Adoraríamos ouvir você!
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Coluna do Formulário */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Envie sua Mensagem</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                id="nome"
                {...register('nome')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-proactiva-purple focus:border-transparent ${
                  errors.nome ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Seu nome"
              />
              {errors.nome && (
                <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mail *
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-proactiva-purple focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="seu@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <input
                type="tel"
                id="telefone"
                {...register('telefone')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-proactiva-purple focus:border-transparent ${
                  errors.telefone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+55 (11) 99999-9999"
              />
              {errors.telefone && (
                <p className="text-red-500 text-sm mt-1">{errors.telefone.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-2">
                Assunto *
              </label>
              <select
                id="assunto"
                {...register('assunto')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-proactiva-purple focus:border-transparent ${
                  errors.assunto ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione um assunto</option>
                <option value="suporte">Suporte Técnico</option>
                <option value="dúvida">Dúvida sobre o ProActiva</option>
                <option value="sugestao">Sugestão de Melhoria</option>
                <option value="bug">Relatar Problema</option>
                <option value="parceria">Proposta de Parceria</option>
                <option value="outros">Outros</option>
              </select>
              {errors.assunto && (
                <p className="text-red-500 text-sm mt-1">{errors.assunto.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                Mensagem *
              </label>
              <textarea
                id="mensagem"
                {...register('mensagem')}
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-proactiva-purple focus:border-transparent resize-none ${
                  errors.mensagem ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Escreva sua mensagem aqui..."
              />
              {errors.mensagem && (
                <p className="text-red-500 text-sm mt-1">{errors.mensagem.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 ${
                isSubmitting 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Enviar Mensagem</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Coluna de Informações de Contato */}
        <div className="space-y-6">
          {/* Informações de Contato */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Informações de Contato</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-gray-600">contato@proactiva.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Telefone</p>
                  <p className="text-gray-600">+55 (11) 9999-9999</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Endereço</p>
                  <p className="text-gray-600">São Paulo, SP<br />Brasil</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Horário de Atendimento</p>
                  <div className="text-gray-600 space-y-1">
                    <p>Segunda - Sexta: 9h - 18h</p>
                    <p>Sábado: 9h - 13h</p>
                    <p>Domingo: Fechado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
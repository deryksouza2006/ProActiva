import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "O que é o ProActiva?",
    answer: "O ProActiva é uma plataforma inteligente de produtividade e desenvolvimento profissional. Utilizamos inteligência artificial para ajudá-lo a manter o equilíbrio entre produtividade e bem-estar, enquanto investe no aprendizado contínuo e requalificação profissional.",
  },
  {
    question: "Como funciona o sistema de IA?",
    answer: "Nossa IA analisa seus padrões de trabalho, níveis de energia, estresse e produtividade para gerar insights personalizados. Ela identifica riscos de burnout, sugere pausas inteligentes e recomenda recursos de aprendizado alinhados com suas metas e o mercado de trabalho.",
  },
  {
    question: "Meus dados estão seguros?",
    answer: "Sim! Levamos a segurança e privacidade muito a sério. Todos os dados são criptografados e armazenados de forma segura. Nunca compartilhamos suas informações pessoais com terceiros sem seu consentimento explícito. Você tem controle total sobre seus dados.",
  },
  {
    question: "O ProActiva funciona offline?",
    answer: "Algumas funcionalidades básicas, como o timer de foco e exercícios de respiração, funcionam offline. No entanto, para acessar insights de IA, recomendações personalizadas e sincronização de dados entre dispositivos, é necessária conexão com a internet.",
  },
  {
    question: "Como o app me ajuda a evitar burnout?",
    answer: "O ProActiva monitora seus níveis de estresse, energia e horas trabalhadas. Com base nesses dados, a IA identifica padrões de risco e envia alertas proativos sugerindo pausas, exercícios de respiração ou ajustes na sua rotina. O objetivo é promover uma produtividade sustentável e saudável.",
  },
  {
    question: "Posso usar o ProActiva em equipe?",
    answer: "Atualmente, o ProActiva é focado em uso individual. No entanto, estamos desenvolvendo funcionalidades para equipes e organizações, incluindo dashboards para gestores e recursos de bem-estar corporativo.",
  },
  {
    question: "Quais tecnologias foram utilizadas no desenvolvimento?",
    answer: "O Front-End foi desenvolvido utilizando React, Vite e TypeScript, com estilização feita exclusivamente com Tailwind CSS. O Back-End utiliza Java com Quarkus, seguindo as diretrizes da Global Solution.",
  },
  {
    question: "Onde posso encontrar o código-fonte do projeto?",
    answer: "O código-fonte completo do projeto está disponível no repositório do GitHub da equipe. O link será fornecido na seção 'Autores e Créditos' e 'Como Usar' do README.md.",
  },
];

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 shadow-lg">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Perguntas Frequentes ❓
          </h1>
          <p className="text-slate-600 text-lg">
            Encontre respostas para as dúvidas mais comuns sobre o ProActiva
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border-none shadow-lg bg-white hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left p-6 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 pr-4">
                    {item.question}
                  </h3>
                  <div
                    className={`transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  </div>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-0">
                  <div className="pl-4 border-l-4 border-emerald-500">
                    <p className="text-slate-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="rounded-xl border-none shadow-xl bg-gradient-to-br from-white via-emerald-50 to-green-50">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Não encontrou o que procurava?
            </h2>
            <p className="text-slate-600 mb-6">
              Nossa equipe está pronta para ajudá-lo! Entre em contato conosco.
            </p>
            <Link to="/contato">
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-lg font-semibold transition-all shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40">
                Entrar em Contato
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
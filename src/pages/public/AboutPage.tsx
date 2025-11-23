import React from 'react';
import { CheckCircle } from 'lucide-react';

const AboutPage: React.FC = () => {
  const problemPoints = [
    "Ameaça da obsolescência de habilidades devido à rápida transformação tecnológica e a produtividade insustentável que leva ao burnout.",
    "Profissionais precisam se requalificar constantemente.",
    "Falta de equilíbrio entre produtividade e bem-estar.",
    "Dificuldade em gerenciar tempo e metas de aprendizado.",
  ];

  const solutionPoints = [
    "Alertas Inteligentes para pausas e foco",
    "Gerenciamento de metas de reskilling",
    "Análise de padrões de produtividade",
  ];

  const features = [
    { title: "Alertas Inteligentes", description: "Notificações automáticas para pausas e lembretes de aprendizado.", icon: "⚡" },
    { title: "Metas de Reskilling", description: "Defina e acompanhe suas metas de desenvolvimento profissional.", icon: "🎯" },
    { title: "Colaboração", description: "Compartilhe progresso e aprenda com sua equipe.", icon: "🤝" },
    { title: "Análise de Dados", description: "Visualize seus padrões de produtividade e progresso.", icon: "📊" },
  ];

  const technologies = [
    { name: "React 19", role: "Frontend" },
    { name: "Vite", role: "Build Tool" },
    { name: "TypeScript", role: "Linguagem" },
    { name: "TailwindCSS", role: "Estilização" },
    { name: "Java/Quarkus", role: "Backend" },
    { name: "Oracle SQL", role: "Banco de Dados" },
    { name: "Python", role: "Parceiros" },
    { name: "Machine Learning", role: "UX" },
  ];

  const businessModels = [
    {
      title: "B2B (Corporativo)",
      description: "Venda da plataforma como serviço (SaaS) para departamentos de RH e L&D de grandes empresas.",
      benefits: ["Redução de turnover", "Aumento de produtividade", "Desenvolvimento de talentos"],
    },
    {
      title: "B2C (Individual)",
      description: "Acesso individual para profissionais em transição de carreira ou trabalhadores remotos.",
      benefits: ["Gerenciamento autônomo", "Desenvolvimento contínuo", "Bem-estar profissional"],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Sobre o ProActiva</h1>
        <p className="text-xl text-gray-500">
          Plataforma de produtividade e desenvolvimento profissional contínuo para o futuro do trabalho
        </p>
      </header>

      {/* Problema e Solução */}
      <section className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">O Problema</h2>
          <ul className="space-y-3 text-gray-600">
            {problemPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="text-proactiva-red mr-2 mt-1">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nossa Solução</h2>
          <p className="text-gray-600 mb-4">
            O ProActiva resolve esses desafios integrando produtividade e desenvolvimento profissional em uma única plataforma.
          </p>
          <ul className="space-y-3 text-gray-600">
            {solutionPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-proactiva-green mr-2 mt-1" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Características Principais */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Características Principais</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tecnologias Utilizadas */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Tecnologias Utilizadas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 text-center">
          {technologies.map((tech, index) => (
            <div key={index} className="p-4">
              <div className="text-xl font-bold text-proactiva-purple mb-1">{tech.name}</div>
              <p className="text-sm text-gray-500">{tech.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modelo de Negócio */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Modelo de Negócio</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {businessModels.map((model, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-proactiva-purple">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{model.title}</h3>
              <p className="text-gray-600 mb-4">{model.description}</p>
              <ul className="space-y-2 text-sm text-gray-700">
                {model.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-proactiva-green mr-2 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

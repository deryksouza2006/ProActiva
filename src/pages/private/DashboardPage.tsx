import React from 'react';
import { Heart, Clock, ListChecks, CheckCircle, Timer, Target, Coffee, Smile } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  // Dados mockados para o dashboard
  const focusData = {
    minutesDedicated: 0,
    sessionsCompleted: 0,
  };

  const activeGoals = 0;

  const features = [
    { title: "Timer de Foco", description: "Use o Timer Pomodoro para sessões dedicadas de estudo ou trabalho.", icon: Clock, link: "/dashboard/timer" },
    { title: "Metas Pessoais", description: "Defina e acompanhe metas que servem para o seu desenvolvimento.", icon: ListChecks, link: "/dashboard/tarefas" },
    { title: "Check-in de Bem-Estar", description: "Registre como você está se sentindo para monitorar sua saúde mental.", icon: Heart, link: "/dashboard/bem-estar" },
  ];

  return (
    <div className="flex-1 overflow-auto">
        <div className="min-h-screen p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <header className="text-center mb-12">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Bem-vindo ao seu espaço de autocuidado 💚
              </h1>
              <p className="text-lg text-gray-500 mt-2">
                {user?.nomeCompleto ? user.nomeCompleto : 'Usuário'}, este é um lugar para pausar, respirar e cuidar de si mesmo. Aqui, o foco é no seu bem-estar, não na sua performance.
              </p>
            </header>
            
            {/* Seção Por que se cuidar? */}
            <section className="bg-linear-gradient from-white via-rose-50 to-pink-50 p-6 rounded-xl text-card-foreground border-none shadow-xl bg-gradient-to-br from-white via-rose-50 to-pink-50">
              <div className="flex items-center mb-4">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4 ml-2">Por que se cuidar?</h2>
                </div>
              </div>
              <p className="text-gray-600">
                Cuidar de si mesmo não é egoísmo, é necessidade. Em um mundo que exige tanto de nós, reservar momentos para o autocuidado é essencial para manter o equilíbrio emocional, prevenir o esgotamento e viver com mais qualidade.
              </p>
              <p className="text-gray-600 mt-2">
                Pequenas pausas intencionais, momentos de reflexão e atenção às suas necessidades emocionais fazem toda a diferença. Este aplicativo existe para ajudá-lo nesta jornada.
              </p>
            </section>

            {/* Dados de Foco e Metas */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border text-card-foreground border-none shadow-xl bg-gradient-to-br from-white to-blue-50">
                <div className="flex flex-col space-y-1.5 p-6 border-b border-blue-100">
                  <div className="font-semibold leading-none tracking-tight flex items-center gap-2 text-blue-900">
                    <Timer className="w-6 h-6" />
                    <h3 className="font-semibold text-gray-700">Tempo de Foco Hoje</h3>
                  </div>
                </div>
                <div className="p-6 pt-6">
                  <div className="text-center mb-6">
                    <p className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">{focusData.minutesDedicated}</p>
                    <p className="text-slate-600 text-lg">minutos dedicados a você</p>
                    <p className="text-sm text-slate-500 mt-2">{focusData.sessionsCompleted} sessões realizadas</p>
                  </div>
                  <Link to="/dashboard/timer" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-9 px-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 text-white py-6 text-lg">
                    <Clock className="w-4 h-4 mr-2" />
                    Iniciar Sessão de Foco
                  </Link>
                </div>
              </div>

              <div className="rounded-xl border text-card-foreground border-none shadow-xl bg-gradient-to-br from-white to-emerald-50">
                <div className="flex flex-col space-y-1.5 p-6 border-b border-blue-100">
                  <div className="font-semibold leading-none tracking-tight flex items-center gap-2 text-emerald-900">
                    <Target className="w-6 h-6" />
                    <h3 className="font-semibold text-gray-700">Metas Ativas</h3>
                  </div>
                </div>
                <div className="p-6 pt-6">
                  <div className="text-center mb-6">
                    <p className="text-6xl font-bold text-emerald-600 mb-2">{activeGoals}</p>
                    <p className="text-slate-600 text-lg">metas pessoais em andamento</p>
                    <p className="text-sm text-slate-500 mt-2">Você ainda não tem metas ativas.</p>
                    <Link to="/dashboard/tarefas" className="mt-4 inline-flex items-center text-proactiva-green hover:text-emerald-600 transition-colors font-semibold">
                      Ver Todas as Metas
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border text-card-foreground border-none shadow-xl bg-gradient-to-br from-white via-purple-50 to-blue-50">
              <div className="p-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg">
                    <Coffee className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">O poder das pequenas pausas</h3>
                    <p className="text-gray-600">
                      Pausas focadas não são perda de tempo - elas são investimento em você. Estudos mostram que momentos regulares de pausa melhoram o equilíbrio emocional, reduzem o estresse e previnem o burnout. Cada pausa é um ato de gentileza consigo mesmo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Como este app pode te ajudar */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Como este app pode te ajudar</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <Link to={feature.link} key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 block">
                    <feature.icon className="w-8 h-8 text-proactiva-purple mb-3" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Equilíbrio emocional */}
            <section className="rounded-xl border border-none shadow-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                    <Smile className="w-12 h-12 text-white" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-bold mb-3">Equilíbrio emocional começa aqui</h3>
                    <p className="text-white/90 text-lg leading-relaxed">
                      Não existe caminho único para o bem-estar. O importante é começar - um minuto do seu dia, um dia de cada vez. Você merece este cuidado.
                    </p>
                  </div>
                  <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 rounded-md px-8 bg-white text-purple-600 hover:bg-white/90 shadow-xl">
                    <Link to="/dashboard/bem-estar">
                      Fazer Check-in
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
  );
};

export default DashboardPage;
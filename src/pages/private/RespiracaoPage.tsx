import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Play, Pause, RotateCcw, Wind } from 'lucide-react';

const RespiracaoPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState(0); // 0: inspire, 1: hold, 2: expire, 3: hold
  const [count, setCount] = useState(4);
  const intervalRef = useRef<number | null>(null);

  const phases = [
    { name: "Inspire", color: "from-blue-500 to-cyan-500", instruction: "Inspire profundamente pelo nariz" },
    { name: "Segure", color: "from-purple-500 to-violet-500", instruction: "Segure o ar" },
    { name: "Expire", color: "from-rose-500 to-pink-500", instruction: "Expire lentamente pela boca" },
    { name: "Segure", color: "from-amber-500 to-orange-500", instruction: "Segure novamente" }
  ];

  const currentPhase = phases[phase];

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount <= 1) {
            setPhase((prevPhase) => (prevPhase + 1) % 4);
            return 4;
          }
          return prevCount - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase(0);
    setCount(4);
  };

  const getCircleScale = () => {
    if (phase === 0) return 1.5; // Inspire - expande
    if (phase === 2) return 0.8; // Expire - contrai
    return 1.2; // Hold - mantém
  };

  // Função para obter a classe CSS de escala baseada no valor
  const getScaleClass = () => {
    const scale = getCircleScale();
    if (scale === 1.5) return 'scale-150';
    if (scale === 0.8) return 'scale-90';
    return 'scale-120';
  };

  return (
	    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Exercício de Respiração 🧘‍♀️
          </h1>
	          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
            A respiração consciente é uma ferramenta poderosa para reduzir o estresse, 
            melhorar o foco e promover o equilíbrio emocional.
          </p>
        </div>

	        {/* Info Cards */}
	        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
	          <div className={`rounded-xl shadow-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-white to-blue-50'}`}>
	            <div className="flex items-start gap-3">
	              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
	                <Wind className={`w-5 h-5 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} />
	              </div>
	              <div>
	                <h3 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Reduz Estresse</h3>
	                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
	                  Ativa o sistema nervoso parassimpático, promovendo relaxamento
	                </p>
	              </div>
	            </div>
	          </div>
	
	          <div className={`rounded-xl shadow-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-white to-purple-50'}`}>
	            <div className="flex items-start gap-3">
	              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-900' : 'bg-purple-100'}`}>
	                <Wind className={`w-5 h-5 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`} />
	              </div>
	              <div>
	                <h3 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Melhora o Foco</h3>
	                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
	                  Aumenta a oxigenação cerebral e a clareza mental
	                </p>
	              </div>
	            </div>
	          </div>
	
	          <div className={`rounded-xl shadow-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-white to-emerald-50'}`}>
	            <div className="flex items-start gap-3">
	              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900' : 'bg-emerald-100'}`}>
	                <Wind className={`w-5 h-5 ${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'}`} />
	              </div>
	              <div>
	                <h3 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Controle Emocional</h3>
	                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
	                  Ajuda a regular emoções e reduzir a ansiedade
	                </p>
	              </div>
	            </div>
	          </div>
	        </div>

	        {/* Breathing Circle */}
	        <div className={`rounded-xl shadow-2xl overflow-hidden w-full ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-white via-blue-50 to-purple-50'}`}>
	          <div className="p-12 md:p-16">
	            <div className="text-center space-y-8">
	              {/* Animated Circle */}
	              <div className="relative mx-auto w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
                {/* Outer glow */}
                <div 
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${currentPhase.color} opacity-20 blur-3xl ${
                    isActive ? 'animate-pulse' : ''
                  }`}
                />

                {/* Main breathing circle */}
                <div 
                  className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r ${currentPhase.color} shadow-2xl flex items-center justify-center transition-transform duration-4000 ease-in-out ${
                    isActive ? getScaleClass() : 'scale-100'
                  }`}
                >
                  <div className="text-center">
                    <div className="transition-all duration-300">
                      <div className="text-7xl md:text-8xl font-bold text-white mb-4">
                        {count}
                      </div>
                      <div className="text-2xl md:text-3xl font-semibold text-white/90">
                        {currentPhase.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

	              {/* Instruction */}
	              <div className="space-y-4">
	                <p className={`text-xl font-medium transition-opacity duration-300 ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
	                  {currentPhase.instruction}
	                </p>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 pt-4">
                  {!isActive ? (
                    <button
                      onClick={handleStart}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all shadow-lg shadow-blue-500/30"
                    >
                      <Play className="w-5 h-5" />
                      <span>Iniciar Respiração</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handlePause}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
                      >
                        <Pause className="w-5 h-5" />
                        <span>Pausar</span>
                      </button>
                      <button
                        onClick={handleReset}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
                      >
                        <RotateCcw className="w-5 h-5" />
                        <span>Reiniciar</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

	        {/* Instructions */}
	        <div className={`rounded-xl shadow-xl w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
	          <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-slate-100'}`}>
	            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Como Praticar</h2>
	          </div>
	          <div className="p-6">
	            <div className="space-y-4">
	              <div className="flex items-start gap-3">
	                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center">
	                  1
	                </div>
	                <div>
	                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Encontre um lugar tranquilo</h4>
	                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
	                    Sente-se confortavelmente em um local calmo, onde você não será interrompido.
	                  </p>
	                </div>
	              </div>
	
	              <div className="flex items-start gap-3">
	                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-bold flex items-center justify-center">
	                  2
	                </div>
	                <div>
	                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Mantenha uma postura adequada</h4>
	                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
	                    Coluna reta, ombros relaxados, mãos apoiadas confortavelmente.
	                  </p>
	                </div>
	              </div>
	
	              <div className="flex items-start gap-3">
	                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold flex items-center justify-center">
	                  3
	                </div>
	                <div>
	                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Siga o ritmo visual</h4>
	                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
	                    Acompanhe o círculo e as instruções, respirando de forma suave e natural.
	                  </p>
	                </div>
	              </div>
	
	              <div className="flex items-start gap-3">
	                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-100 text-rose-600 font-bold flex items-center justify-center">
	                  4
	                </div>
	                <div>
	                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Pratique regularmente</h4>
	                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
	                    Reserve alguns minutos por dia para este exercício. Quanto mais praticar, maiores os benefícios.
	                  </p>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
      </div>
    </div>
  );
};

export default RespiracaoPage;
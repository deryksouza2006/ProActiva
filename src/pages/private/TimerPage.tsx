import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Play, RotateCcw, Settings, CheckCircle } from 'lucide-react';

import { useTheme } from '../../contexts/ThemeContext';

const TimerPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [duration, setDuration] = useState(25); // Duração em minutos
  const [time, setTime] = useState(duration * 60); // Tempo em segundos
  const [isActive, setIsActive] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [sessionsToday, setSessionsToday] = useState(0);
  const [totalTime, setTotalTime] = useState(0); // Em minutos

  // Efeito para atualizar o tempo quando a duração muda
  useEffect(() => {
    setTime(duration * 60);
  }, [duration]);

  // Efeito para o contador regressivo
  useEffect(() => {
    let interval: number | null = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      setIsActive(false);
      setSessionsToday((prev) => prev + 1);
      setTotalTime((prev) => prev + duration);
      alert('Sessão de Foco Concluída! Hora da Pausa.');
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, duration]);

  // Função para iniciar/pausar o timer
  const toggleTimer = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  // Função para resetar o timer
  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTime(duration * 60);
  }, [duration]);

  // Função para formatar o tempo
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [time]);

  // Função para calcular o progresso
  const progressPercentage = useMemo(() => {
    if (duration === 0) return 0;
    return Math.round(((duration * 60 - time) / (duration * 60)) * 100);
  }, [time, duration]);

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = parseInt(e.target.value);
    if (!isNaN(newDuration) && newDuration > 0) {
      setDuration(newDuration);
      setTime(newDuration * 60);
    }
  };

  const tips = [
    "Use a técnica Pomodoro: 25 minutos de foco + 5 minutos de pausa",
    "Desligue notificações durante as sessões",
    "Tenha água e lanches saudáveis por perto",
    "Faça pausas regulares para alongar",
    "Após 4 sessões, faça uma pausa maior (15-30 minutos)",
  ];

  return (
    <div className={`max-w-4xl mx-auto py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent mb-2">Timer de Foco Inteligente</h1>
        <p className="text-lg text-gray-500">
          Use a técnica Pomodoro para melhorar sua produtividade
        </p>
      </header>

      {/* Timer Principal */}
      <div className={`p-8 rounded-xl shadow-lg mb-8 flex flex-col items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="relative w-64 h-64 flex items-center justify-center mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              className="text-gray-200"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="120"
              cx="130"
              cy="130"
            />
            <circle
              className="text-purple-600 transition-all duration-1000 ease-linear"
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={2 * Math.PI * 120 * (1 - progressPercentage / 100)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="120"
              cx="130"
              cy="130"
            />
          </svg>
          <div className="absolute text-center">
            <p className={`text-5xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{formattedTime}</p>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>de {duration}:00</p>
          </div>
        </div>

        <div className="flex space-x-4">
          <button 
            onClick={toggleTimer} 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
          >
            <Play className="w-5 h-5" />
            <span>{isActive ? 'Pausar' : 'Iniciar'}</span>
          </button>
          <button 
            onClick={resetTimer} 
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Resetar</span>
          </button>
          <button 
            onClick={() => setIsConfigOpen(!isConfigOpen)} 
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Configurar</span>
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-4 flex items-center space-x-1">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span>Pronto para começar</span>
        </p>
      </div>

	      {/* Configurações do Timer */}
	      {isConfigOpen && (
	        <div className={`p-6 rounded-xl shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
	          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Configurações do Timer</h2>
	          <label htmlFor="duration" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
	            Duração da Sessão (minutos)
	          </label>
	          <input
	            id="duration"
	            type="number"
	            value={duration}
	            onChange={handleDurationChange}
	            className={`w-full p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
	            min="1"
	          />
	          <button 
	            onClick={() => setIsConfigOpen(false)} 
	            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold w-full mt-4 transition-colors"
	          >
	            Fechar
	          </button>
	        </div>
	      )}

	      {/* Estatísticas e Dicas */}
	      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
	        <div className={`p-6 rounded-xl shadow-lg text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
	          <p className="text-3xl font-bold text-purple-600">{sessionsToday}</p>
	          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sessões Hoje</p>
	        </div>
	        <div className={`p-6 rounded-xl shadow-lg text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
	          <p className="text-3xl font-bold text-purple-600">{totalTime}m</p>
	          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Tempo Total</p>
	        </div>
	        <div className={`p-6 rounded-xl shadow-lg text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
	          <p className="text-3xl font-bold text-purple-600">{progressPercentage}%</p>
	          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Progresso</p>
	        </div>
	      </div>

	      <div className={`p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-yellow-900/50' : 'bg-yellow-50'}`}>
	        <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>Dicas para Melhor Foco</h2>
	        <ul className={`list-disc list-inside space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start">
	              <CheckCircle className={`w-4 h-4 mr-2 mt-1 flex-shrink-0 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimerPage;
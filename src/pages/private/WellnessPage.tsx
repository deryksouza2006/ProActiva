import React, { useState, useCallback, useMemo } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Heart, AlertTriangle, Moon, Dumbbell, Info } from 'lucide-react';

// 1. Definição do Schema de Validação com Zod
const checkinSchema = z.object({
  stressLevel: z.number().min(1).max(5),
  sleepHours: z.number().min(0).max(24, "Horas de sono inválidas."),
  exercised: z.boolean(),
  notes: z.string().max(500).optional(),
});

type CheckinFormData = z.infer<typeof checkinSchema>;

// Dados mockados para o histórico
interface Checkin {
  id: number;
  date: string;
  stressLevel: number;
  sleepHours: number;
  exercised: boolean;
  notes?: string;
}

const mockHistory: Checkin[] = [
  { id: 1, date: "18/11/2025", stressLevel: 3, sleepHours: 7, exercised: true, notes: "Dia produtivo, consegui completar as metas!" },
];

const WellnessPage: React.FC = () => {
  const [history, setHistory] = useState<Checkin[]>(mockHistory);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CheckinFormData>({
    resolver: zodResolver(checkinSchema),
    defaultValues: {
      stressLevel: 3,
      sleepHours: 7,
      exercised: false,
      notes: '',
    },
  });

  const stressLevel = watch('stressLevel');

  const onSubmit: SubmitHandler<CheckinFormData> = useCallback((data) => {
    const newCheckin: Checkin = {
      id: Date.now(),
      date: new Date().toLocaleDateString('pt-BR'),
      ...data,
    };
    setHistory(prev => [newCheckin, ...prev]);
    // Limpar formulário após envio
    setValue('sleepHours', 7);
    setValue('exercised', false);
    setValue('notes', '');
    alert('Check-in diário registrado com sucesso!');
  }, [setValue]);

  // Dados de resumo (useMemo para otimização)
  const summaryData = useMemo(() => {
    const latestCheckin = history[0];
    if (!latestCheckin) return { stress: { level: 0, text: 'N/A' }, sleep: { hours: 0, text: 'N/A' }, exercise: { days: 0, text: 'N/A' } };

    const stressText = latestCheckin.stressLevel <= 2 ? 'Baixo' : latestCheckin.stressLevel <= 4 ? 'Moderado' : 'Alto';
    const sleepText = latestCheckin.sleepHours >= 7 ? 'Ideal' : 'Abaixo do ideal';
    const exerciseDays = history.filter(c => c.exercised).length;

    return {
      stress: { level: latestCheckin.stressLevel, text: stressText },
      sleep: { hours: latestCheckin.sleepHours, text: sleepText },
      exercise: { days: exerciseDays, text: exerciseDays > 0 ? 'Pode melhorar' : 'Nenhum dia' },
    };
  }, [history]);

  const getStressColor = (level: number) => {
    if (level <= 2) return 'bg-green-100 text-green-800 border-green-500';
    if (level <= 4) return 'bg-yellow-100 text-yellow-800 border-yellow-500';
    return 'bg-red-100 text-red-800 border-red-500';
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
          Bem-Estar Profissional <Heart className="w-6 h-6 text-red-500 ml-2" />
        </h1>
        <p className="text-lg text-gray-500">Monitore sua saúde mental e previna o burnout</p>
      </header>

      {/* Cards de Resumo */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className={`rounded-xl border text-card-foreground border-none shadow-xl bg-gradient-to-br from-white to-rose-50 ${getStressColor(summaryData.stress.level)}`}>
          <div className="flex flex-col space-y-1.5 p-6 border-b border-rose-100">
            <h3 className="font-semibold text-gray-700 mb-2">Estresse Médio</h3>
          </div>
          <div className="p-6 pt-6">
            <p className="text-4xl font-bold text-rose-600 mb-2">{summaryData.stress.level}/5</p>
            <div className="flex items-center text-sm mt-1">
              <AlertTriangle className="w-4 h-4 mr-1" />
              <span>{summaryData.stress.text}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border text-card-foreground border-none shadow-xl bg-gradient-to-br from-white to-blue-50">
          <div className="flex flex-col space-y-1.5 p-6 border-b border-blue-100">
            <h3 className="font-semibold text-gray-700 mb-2">Sono Médio</h3>
          </div>
          <div className="p-6 pt-6">
            <p className="text-4xl font-bold text-blue-600 mb-2">{summaryData.sleep.hours}h</p>
            <div className="flex items-center text-sm mt-1">
              <Moon className="w-4 h-4 mr-1" />
              <span>{summaryData.sleep.text}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border text-card-foreground border-none shadow-xl bg-gradient-to-br from-white to-emerald-50">
          <div className="flex flex-col space-y-1.5 p-6 border-b border-emerald-100">
            <h3 className="font-semibold text-gray-700 mb-2">Dias com Exercício</h3>
          </div>
          <div className="p-6 pt-6">
            <p className="text-4xl font-bold text-emerald-600 mb-2">{summaryData.exercise.days}</p>
            <div className="flex items-center text-sm mt-1">
              <Dumbbell className="w-4 h-4 mr-1" />
              <span>{summaryData.exercise.text}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário de Check-in Diário */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-12 mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Fazer Check-in Diário</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nível de Estresse */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nível de Estresse (1-5)</label>
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setValue('stressLevel', level)}
                  className={`w-10 h-10 rounded-full text-lg font-semibold transition-colors ${stressLevel === level ? 'bg-red-700 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {level}
                </button>
              ))}
            </div>
            {errors.stressLevel && <p className="mt-2 text-sm text-red-600">Selecione um nível de estresse.</p>}
          </div>

          {/* Horas de Sono */}
          <div>
            <label htmlFor="sleepHours" className="block text-sm font-medium text-gray-700">Horas de Sono</label>
            <input
              id="sleepHours"
              type="number"
              step="0.5"
              placeholder="7"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              {...register('sleepHours', { valueAsNumber: true })}
            />
            {errors.sleepHours && <p className="mt-2 text-sm text-red-600">{errors.sleepHours.message}</p>}
          </div>

          {/* Exercício */}
          <div className="flex items-center">
            <input
              id="exercised"
              type="checkbox"
              className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              {...register('exercised')}
            />
            <label htmlFor="exercised" className="ml-2 block text-sm font-medium text-gray-700">Fiz exercício hoje</label>
          </div>

          {/* Notas */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notas (Opcional)</label>
            <textarea
              id="notes"
              rows={3}
              placeholder="Como você se sente hoje?"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              {...register('notes')}
            />
            {errors.notes && <p className="mt-2 text-sm text-red-600">{errors.notes.message}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              + Fazer Check-in Diário
            </button>
          </div>
        </form>
      </div>

      {/* Insights e Histórico */}
      <div className="space-y-8">
        <div className="bg-blue-50 p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center mb-2">
            <Info className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-blue-800">Insights de Bem-Estar</h3>
          </div>
          <p className="text-sm text-blue-700">
            Continue registrando seus check-ins diários para receber insights personalizados sobre seus padrões de bem-estar e recomendações para melhorar sua saúde mental.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Histórico de Check-ins</h2>
          <div className="space-y-4">
            {history.map((checkin) => (
              <div key={checkin.id} className="border-b pb-4">
                <p className="text-sm font-semibold text-gray-500">{checkin.date}</p>
                <p className="text-gray-700 mt-1">
                  Estresse: <span className="font-bold">{checkin.stressLevel}/5</span> | Sono: <span className="font-bold">{checkin.sleepHours}h</span> | Exercício: <span className="font-bold">{checkin.exercised ? 'Sim' : 'Não'}</span>
                </p>
                {checkin.notes && <p className="text-gray-600 italic mt-2">"{checkin.notes}"</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessPage;
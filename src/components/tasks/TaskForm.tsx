import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Task } from '../../types/api';
import { createTask, updateTask } from '../../services/taskService';
import { useAuth } from '../../contexts/AuthContext';

// 1. Definição do Schema de Validação com Zod - usando Date no schema
const taskSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres."),
  description: z.string().min(1, "A descrição é obrigatória."),
  category: z.string().min(1, "A categoria é obrigatória."),
  priority: z.enum(['BAIXA', 'MEDIA', 'ALTA']),
  dueDate: z.date().min(new Date(), "A data de vencimento não pode ser no passado."),
});

// Tipo inferido do schema
type TaskFormInput = z.infer<typeof taskSchema>;

interface TaskFormProps {
  initialData?: Task;
  onSaveSuccess: (task: Task) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSaveSuccess, onCancel }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<TaskFormInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      category: initialData?.category || 'TRABALHO',
      priority: initialData?.priority || 'MEDIA',
      dueDate: initialData?.dueDate ? new Date(initialData.dueDate) : new Date(),
    },
  });

  const onSubmit: SubmitHandler<TaskFormInput> = async (data) => {
    if (!user) {
      setError("Usuário não autenticado.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.group('🎯 [DEBUG] FORMULÁRIO SUBMETIDO');
      console.log('📝 [DEBUG] Dados do formulário:', data);
      console.log('👤 [DEBUG] Usuário logado:', user);
      
      let savedTask: Task;
      if (initialData?.id) {
        // Edição
        console.log('✏️ [DEBUG] Modo: Edição');
        savedTask = await updateTask(initialData.id, {
          title: data.title,
          description: data.description,
          category: data.category,
          priority: data.priority,
          dueDate: data.dueDate.toISOString(), // ← Formato ISO completo
          status: initialData.status
        });
      } else {
        // Criação - CORREÇÃO: Categoria já vem correta do select
        console.log('🆕 [DEBUG] Modo: Criação');
        const taskData = {
          title: data.title,
          description: data.description,
          category: data.category, // ← Já está correta (TRABALHO, PESSOAL, etc.)
          priority: data.priority.toUpperCase(),
          dueDate: data.dueDate.toISOString(), // ← Formato ISO completo
          userId: user.id,
          status: 'EM_ANDAMENTO'
        };
        
        console.log('🚀 [DEBUG] Dados enviados para criação:', taskData);
        savedTask = await createTask(taskData);
      }
      
      console.log('✅ [DEBUG] Tarefa salva com sucesso:', savedTask);
      console.groupEnd();
      
      onSaveSuccess(savedTask);
    } catch (err) {
      console.error('💥 [DEBUG] Erro no formulário:', err);
      setError(err instanceof Error ? err.message : 'Erro ao salvar a tarefa.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Título */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título *</label>
        <input
          id="title"
          type="text"
          placeholder="Ex: Finalizar relatório mensal"
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-proactiva-purple focus:border-proactiva-purple"
          {...register('title')}
        />
        {errors.title && <p className="mt-1 text-sm text-proactiva-red">{errors.title.message}</p>}
      </div>

      {/* Descrição */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          id="description"
          rows={3}
          placeholder="Descreva os detalhes da tarefa..."
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-proactiva-purple focus:border-proactiva-purple"
          {...register('description')}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Categoria - CORRIGIDA */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria *</label>
          <select
            id="category"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-proactiva-purple focus:border-proactiva-purple"
            {...register('category')}
          >
            <option value="TRABALHO">Trabalho</option>
            <option value="EDUCACAO">Estudo</option>
            <option value="PESSOAL">Pessoal</option>
            <option value="SAUDE">Bem-Estar</option>
            <option value="TECNOLOGIA">Tecnologia</option>
            <option value="CERTIFICACAO">Certificação</option>
            <option value="OUTRO">Outro</option>
          </select>
          {errors.category && <p className="mt-1 text-sm text-proactiva-red">{errors.category.message}</p>}
        </div>

        {/* Prioridade */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Prioridade</label>
          <select
            id="priority"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-proactiva-purple focus:border-proactiva-purple"
            {...register('priority')}
          >
            <option value="BAIXA">Baixa</option>
            <option value="MEDIA">Média</option>
            <option value="ALTA">Alta</option>
          </select>
          {errors.priority && <p className="mt-1 text-sm text-proactiva-red">{errors.priority.message}</p>}
        </div>
      </div>

      {/* Data de Vencimento */}
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Data de Vencimento</label>
        <input
          id="dueDate"
          type="date"
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-proactiva-purple focus:border-proactiva-purple"
          {...register('dueDate', { 
            valueAsDate: true,
            setValueAs: (value: string) => value ? new Date(value) : new Date()
          })}
        />
        {errors.dueDate && <p className="mt-1 text-sm text-proactiva-red">{errors.dueDate.message}</p>}
      </div>

      {error && (
        <div className="bg-red-100 border border-proactiva-red text-proactiva-red p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Botões de Ação */}
      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-primary bg-proactiva-green hover:bg-green-600"
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : 'Salvar Tarefa'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
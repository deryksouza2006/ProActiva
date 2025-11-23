import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Plus, CheckCircle } from 'lucide-react';
import TaskList from '../../components/tasks/TaskList';
import TaskForm from '../../components/tasks/TaskForm';
import type { Task } from '../../types/api';
import { getTasksByUserId, completeTask, deleteTask } from '../../services/taskService';
import { useAuth } from '../../contexts/AuthContext';

const TasksPage: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [filter, setFilter] = useState<'all' | 'completed'>('all');

  // Função para buscar as tarefas
  const fetchTasks = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const fetchedTasks = await getTasksByUserId(user.id);
      setTasks(fetchedTasks);
    } catch (err) {
      console.error('Erro ao carregar tarefas:', err);
      setTasks([]);
      setError('Não foi possível carregar as tarefas. Você ainda pode criar novas tarefas.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Efeito para carregar as tarefas ao montar o componente
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Função para lidar com a conclusão de uma tarefa
  const handleComplete = useCallback(async (taskId: number) => {
    try {
      const completedTask = await completeTask(taskId);
      setTasks(prevTasks =>
        prevTasks.map(task => 
          task.id === taskId ? completedTask : task
        )
      );
    } catch (err) {
      console.error('Erro ao concluir tarefa:', err);
      setError(err instanceof Error ? err.message : 'Erro ao concluir a tarefa.');
    }
  }, []);

  // Função para lidar com a exclusão de uma tarefa
  const handleDelete = useCallback(async (taskId: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?\n\n⚠️  Tarefas com histórico não podem ser excluídas, apenas arquivadas.')) {
      try {
        await deleteTask(taskId);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar a tarefa.';
        if (errorMessage.includes('histórico vinculado')) {
          setError(`${errorMessage}\n\n💡 Dica: Marque a tarefa como "Concluída" para arquivá-la em vez de excluir.`);
        } else {
          setError(errorMessage);
        }
      }
    }
  }, []);

  // Função para lidar com a edição de uma tarefa
  const handleEdit = useCallback((task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  }, []);

  // Função para lidar com o sucesso ao salvar/editar
  const handleSaveSuccess = useCallback((savedTask: Task) => {
    setTasks(prevTasks => {
      if (prevTasks.some(task => task.id === savedTask.id)) {
        // Edição
        return prevTasks.map(task => (task.id === savedTask.id ? savedTask : task));
      } else {
        // Criação
        return [savedTask, ...prevTasks];
      }
    });
    setIsFormOpen(false);
    setEditingTask(undefined);
  }, []);

  // Tarefas filtradas
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filter === 'completed') {
        return task.status === 'CONCLUIDO';
      }
      return true; // 'all' mostra todas
    });
  }, [tasks, filter]);

  if (isLoading) {
    return <div className="text-center py-10 text-lg text-gray-500">Carregando tarefas...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-600 flex items-center">
            Gerenciador de Tarefas <CheckCircle className="w-6 h-6 ml-2" />
          </h1>
          <p className="text-gray-500">Organize suas tarefas e seja mais produtivo</p>
        </div>
        <button
          onClick={() => { setEditingTask(undefined); setIsFormOpen(true); }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nova Tarefa</span>
        </button>
      </header>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Aviso</h3>
            <p className="text-yellow-700 whitespace-pre-line">{error}</p>
          </div>
        </div>
      )}

      {isFormOpen && (
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
          <TaskForm
            initialData={editingTask}
            onSaveSuccess={handleSaveSuccess}
            onCancel={() => { setIsFormOpen(false); setEditingTask(undefined); }}
          />
        </div>
      )}

      {tasks.length === 0 && !isFormOpen && !error && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-500 mb-2">Nenhuma tarefa encontrada</h3>
          <p className="text-gray-400 mb-4">Crie sua primeira tarefa para começar!</p>
          <button
            onClick={() => { setEditingTask(undefined); setIsFormOpen(true); }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 mx-auto transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Criar Primeira Tarefa</span>
          </button>
        </div>
      )}

      {tasks.length > 0 && (
        <>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${filter === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Concluídas ({tasks.filter(t => t.status === 'CONCLUIDO').length})
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Todas ({tasks.length})
            </button>
          </div>

          <TaskList
            tasks={filteredTasks}
            onComplete={handleComplete}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </>
      )}
    </div>
  );
};

export default TasksPage;
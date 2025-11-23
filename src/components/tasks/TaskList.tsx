import React from 'react';
import type { Task } from '../../types/api';
import { CheckCircle, Trash2, Edit } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onComplete, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl shadow-lg text-center border border-gray-200">
        <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-xl font-semibold text-gray-600">Nenhuma tarefa encontrada</p>
        <p className="text-gray-500">Crie sua primeira tarefa!</p>
      </div>
    );
  }

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'ALTA':
        return 'bg-red-100 text-red-800';
      case 'MEDIA':
        return 'bg-yellow-100 text-yellow-800';
      case 'BAIXA':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          data-task-id={task.id}
          className={`bg-white p-6 rounded-xl shadow-lg flex justify-between items-center transition-all duration-300 ${task.status === 'CONCLUIDO' ? 'opacity-60 border-l-8 border-proactiva-green' : 'border-l-8 border-proactiva-purple'}`}
        >
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${task.status === 'CONCLUIDO' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            
            {/* ✅ INDICADOR DE TAREFA CONCLUÍDA - CORRIGIDO */}
            {task.status === 'CONCLUIDO' && task.completedAt && (
              <div className="flex items-center text-green-600 text-sm mt-2">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span className="task-status">Concluída em: {new Date(task.completedAt).toLocaleDateString('pt-BR')}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-3 mt-3 text-xs">
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{task.category}</span>
              <span className={getPriorityColor(task.priority) + ' px-2 py-1 rounded-full'}>{task.priority}</span>
              <span className="text-gray-500">Vencimento: {new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>

          <div className="flex space-x-3 ml-4">
            {task.status !== 'CONCLUIDO' && (
              <button
                onClick={() => onComplete(task.id)}
                title="Marcar como Concluída"
                className="p-2 rounded-full text-proactiva-green hover:bg-green-100 transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => onEdit(task)}
              title="Editar Tarefa"
              className="p-2 rounded-full text-proactiva-purple hover:bg-purple-100 transition-colors"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              title="Excluir Tarefa"
              className="p-2 rounded-full text-proactiva-red hover:bg-red-100 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
import { API_BASE_URL, type Task } from '../types/api';

// CORREÇÃO: Adicionar /api na URL
const TASK_URL = `${API_BASE_URL}/api/tasks`;

// Função auxiliar para tratamento de resposta (replicada para evitar dependência circular)
const handleResponse = async (response: Response): Promise<any> => {
  // Tenta ler o corpo da resposta como JSON
  const data = await response.json().catch(() => ({ message: 'Resposta não JSON ou vazia.' }));

  if (!response.ok) {
    // Lança um erro com a mensagem da API ou uma mensagem padrão
    throw new Error(data.message || `Erro na requisição: ${response.status} ${response.statusText}`);
  }
  return data;
};

// Função auxiliar para obter o token de autenticação
const getAuthHeaders = () => {
  const token = localStorage.getItem('proactiva_token');
  if (!token) {
    throw new Error('Usuário não autenticado. Token não encontrado.');
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

/**
 * Busca todas as tarefas de um usuário usando `fetch`.
 * @param userId - ID do usuário.
 * @returns Promessa que resolve para a lista de tarefas.
 */
export const getTasksByUserId = async (userId: number): Promise<Task[]> => {
  try {
    console.log('🔍 [DEBUG] Buscando tarefas para usuário:', userId);
    
    const response = await fetch(`${TASK_URL}/user/${userId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    console.log('📡 [DEBUG] Status da resposta:', response.status);
    
    if (!response.ok) {
      // Se for erro 500, não quebra - retorna array vazio
      if (response.status === 500) {
        console.warn('⚠️ [DEBUG] Backend com problemas, retornando array vazio');
        return [];
      }
      
      const errorText = await response.text();
      console.error('❌ [DEBUG] Erro na resposta:', errorText);
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const tasks = await response.json();
    console.log('✅ [DEBUG] Tarefas recebidas:', tasks);
    return tasks;
    
  } catch (error) {
    console.error('💥 [DEBUG] Erro ao buscar tarefas:', error);
    
    // ⚠️ EM VEZ DE RELANÇAR O ERRO, RETORNA ARRAY VAZIO
    console.log('🔄 [DEBUG] Backend indisponível, retornando array vazio');
    return [];
  }
};

/**
 * Busca todas as tarefas concluídas de um usuário.
 * @param userId - ID do usuário.
 * @returns Promessa que resolve para a lista de tarefas concluídas.
 */
export const getCompletedTasks = async (userId: number): Promise<Task[]> => {
  try {
    console.log('✅ [DEBUG] Buscando tarefas concluídas para usuário:', userId);
    
    const response = await fetch(`${TASK_URL}/user/${userId}/status/CONCLUIDO`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    console.log('📡 [DEBUG] Status da resposta:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [DEBUG] Erro na resposta:', errorText);
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const tasks = await response.json();
    console.log('✅ [DEBUG] Tarefas concluídas recebidas:', tasks);
    return tasks;
    
  } catch (error) {
    console.error('💥 [DEBUG] Erro ao buscar tarefas concluídas:', error);
    throw error;
  }
};

/**
 * Cria uma nova tarefa usando `fetch`.
 * @param taskData - Dados da nova tarefa (já inclui userId).
 * @returns Promessa que resolve para a tarefa criada.
 */
export const createTask = async (taskData: any): Promise<Task> => {
  try {
    console.group('🚀 [DEBUG] INICIANDO CRIAÇÃO DE TAREFA');
    console.log('📦 [DEBUG] Dados recebidos no createTask:', taskData);
    
    // VALIDAÇÃO DETALHADA: Garantir que todos os campos obrigatórios estão presentes
    const requiredFields = ['title', 'description', 'category', 'priority', 'userId', 'status'];
    const missingFields = requiredFields.filter(field => !taskData[field]);
    
    if (missingFields.length > 0) {
      console.error('❌ [DEBUG] Campos obrigatórios faltando:', missingFields);
      throw new Error(`Campos obrigatórios faltando: ${missingFields.join(', ')}`);
    }

    console.log('✅ [DEBUG] Todos os campos obrigatórios presentes');

    // DEBUG: Verificar cada campo individualmente
    console.log('🔍 [DEBUG] Verificação detalhada dos campos:');
    console.log('  - title:', taskData.title, '(tipo:', typeof taskData.title + ')');
    console.log('  - description:', taskData.description, '(tipo:', typeof taskData.description + ')');
    console.log('  - category:', taskData.category, '(tipo:', typeof taskData.category + ')');
    console.log('  - priority:', taskData.priority, '(tipo:', typeof taskData.priority + ')');
    console.log('  - userId:', taskData.userId, '(tipo:', typeof taskData.userId + ')');
    console.log('  - status:', taskData.status, '(tipo:', typeof taskData.status + ')');
    console.log('  - dueDate:', taskData.dueDate, '(tipo:', typeof taskData.dueDate + ')');

    // FORMATAR OS DADOS para o backend
    const formattedData = {
      title: taskData.title,
      description: taskData.description,
      category: taskData.category,
      priority: taskData.priority,
      userId: taskData.userId,
      status: taskData.status,
      dueDate: taskData.dueDate || null
    };

    console.log('📤 [DEBUG] Dados formatados para envio:', formattedData);
    console.log('🌐 [DEBUG] URL da requisição:', TASK_URL);

    // DEBUG: Mostrar o JSON exato que será enviado
    const requestBody = JSON.stringify(formattedData);
    console.log('📝 [DEBUG] JSON sendo enviado:', requestBody);

    // DEBUG: Mostrar headers
    const headers = getAuthHeaders();
    console.log('📨 [DEBUG] Headers da requisição:', headers);

    console.groupEnd();

    const response = await fetch(TASK_URL, {
      method: 'POST',
      headers: headers,
      body: requestBody,
    });

    console.group('📡 [DEBUG] RESPOSTA DO SERVIDOR');
    console.log('📡 [DEBUG] Status da criação:', response.status);
    console.log('📡 [DEBUG] Status text:', response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [DEBUG] Erro completo da resposta:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      
      // Se for erro 400, mostrar a mensagem real do backend
      if (response.status === 400) {
        // Tentar parsear a mensagem de erro do backend
        try {
          const errorData = JSON.parse(errorText);
          console.error('📋 [DEBUG] Erro parseado do backend:', errorData);
          throw new Error(errorData.message || errorData.error || 'Dados inválidos enviados ao servidor.');
        } catch (parseError) {
          console.error('📋 [DEBUG] Erro ao parsear resposta:', parseError);
          console.error('📋 [DEBUG] Erro bruto do backend:', errorText);
          throw new Error(errorText || 'Dados inválidos. Verifique se todos os campos estão preenchidos corretamente.');
        }
      }
      
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const createdTask = await response.json();
    console.log('✅ [DEBUG] Tarefa criada com sucesso:', createdTask);
    console.groupEnd();
    return createdTask;
    
  } catch (error) {
    console.group('💥 [DEBUG] ERRO FINAL');
    console.error('💥 [DEBUG] Erro ao criar tarefa:', error);
    console.groupEnd();
    throw error;
  }
};

/**
 * Atualiza uma tarefa existente usando `fetch`.
 * @param taskId - ID da tarefa a ser atualizada.
 * @param taskData - Dados da tarefa.
 * @returns Promessa que resolve para a tarefa atualizada.
 */
export const updateTask = async (taskId: number, taskData: Partial<Task>): Promise<Task> => {
  try {
    console.log('🔄 [DEBUG] Atualizando tarefa:', taskId, taskData);
    
    const response = await fetch(`${TASK_URL}/${taskId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return await handleResponse(response);
  } catch (error) {
    console.error('💥 [DEBUG] Erro ao atualizar tarefa:', error);
    throw error;
  }
};

/**
 * Marca uma tarefa como concluída usando PATCH no endpoint específico.
 * @param taskId - ID da tarefa a ser concluída.
 * @returns Promessa que resolve para a tarefa concluída.
 */
export const completeTask = async (taskId: number): Promise<Task> => {
  try {
    console.group('✅ [DEBUG] CONCLUINDO TAREFA COM PATCH');
    console.log('🎯 [DEBUG] ID da tarefa:', taskId);
    
    // ✅ AGORA PATCH DEVE FUNCIONAR COM CORS CONFIGURADO
    const url = `${TASK_URL}/${taskId}/complete`;
    console.log('🌐 [DEBUG] URL da requisição:', url);
    
    const headers = getAuthHeaders();
    console.log('📨 [DEBUG] Headers:', headers);

    const response = await fetch(url, {
      method: 'PATCH', // ← AGORA FUNCIONA!
      headers: headers,
      // ✅ PATCH não precisa de body para este endpoint
    });

    console.log('📡 [DEBUG] Status da resposta:', response.status);
    console.log('📡 [DEBUG] Status text:', response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [DEBUG] Erro completo:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const completedTask = await response.json();
    console.log('🎉 [DEBUG] Tarefa concluída com sucesso via PATCH:', completedTask);
    console.groupEnd();
    
    return completedTask;
  } catch (error) {
    console.group('💥 [DEBUG] ERRO AO CONCLUIR TAREFA');
    console.error('💥 [DEBUG] Erro:', error);
    console.groupEnd();
    throw error;
  }
};

/**
 * Deleta uma tarefa com tratamento de erro de constraint.
 * @param taskId - ID da tarefa a ser deletada.
 * @returns Promessa que resolve para true em caso de sucesso.
 */
export const deleteTask = async (taskId: number): Promise<boolean> => {
  try {
    console.group('🗑️ [DEBUG] DELETANDO TAREFA');
    console.log('🎯 [DEBUG] ID da tarefa:', taskId);
    
    const url = `${TASK_URL}/${taskId}`;
    console.log('🌐 [DEBUG] URL da requisição:', url);
    
    const headers = getAuthHeaders();
    console.log('📨 [DEBUG] Headers:', headers);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: headers,
    });

    console.log('📡 [DEBUG] Status da resposta:', response.status);
    console.log('📡 [DEBUG] Status text:', response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [DEBUG] Erro completo:', errorText);
      
      // ✅ VERIFICAR SE É ERRO DE CONSTRAINT
      if (errorText.includes('restrição de integridade') || errorText.includes('constraint') || errorText.includes('ORA-02292')) {
        throw new Error('Não é possível excluir esta tarefa porque ela possui histórico vinculado. Tente arquivá-la em vez de excluir.');
      }
      
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ [DEBUG] Resposta do delete:', result);
    console.groupEnd();
    
    return true;
  } catch (error) {
    console.group('💥 [DEBUG] ERRO AO DELETAR TAREFA');
    console.error('💥 [DEBUG] Erro:', error);
    console.groupEnd();
    throw error;
  }
};
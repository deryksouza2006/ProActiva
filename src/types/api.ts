// Base URL da API, conforme fornecido pelo usuário
export const API_BASE_URL = 'https://proactivaapi.onrender.com';

// Tipos de dados da API

export interface User {
  id: number;
  nomeCompleto: string;
  email: string;
  // password não deve ser incluído aqui para evitar vazamento acidental
}

export interface AuthResponse {
  user: User;
  message: string;
  token: string;
}

export interface Task {
  createdAt: any;
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  priority: 'BAIXA' | 'MEDIA' | 'ALTA';
  status: 'EM_ANDAMENTO' | 'CONCLUIDO'; // CORRIGIDO: Removido PENDENTE
  dueDate: string; // ISO Date string
  completedAt?: string; // Adicionado se o backend retornar
}

export interface ErrorResponse {
  error: string;
  message: string;
  status: 400;
}

// Tipos para os dados de formulário (que podem ser diferentes dos tipos da API)
export interface RegisterFormData {
  nomeCompleto: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  category: string;
  priority: 'BAIXA' | 'MEDIA' | 'ALTA';
  dueDate: Date;
}

export interface Checkin {
  id: number;
  date: string;
  stressLevel: number;
  sleepHours: number;
  exercised: boolean;
  notes: string; // ou notes?: string se pode ser opcional
}
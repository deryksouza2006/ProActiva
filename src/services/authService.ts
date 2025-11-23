import { API_BASE_URL, type LoginFormData, type RegisterFormData, type AuthResponse } from '../types/api';

const AUTH_URL = `${API_BASE_URL}/api/users`;

// Função auxiliar para tratamento de resposta
const handleResponse = async (response: Response): Promise<any> => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `Erro na requisição: ${response.status} ${response.statusText}`);
  }
  return data;
};

export const login = async (credentials: LoginFormData): Promise<AuthResponse> => {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  return handleResponse(response);
};

export const register = async (data: RegisterFormData): Promise<AuthResponse> => {
  const response = await fetch(`${AUTH_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nomeCompleto: data.nomeCompleto,
      email: data.email,
      password: data.password,
    }),
  });

  return handleResponse(response);
};

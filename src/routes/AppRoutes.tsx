import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';

// Páginas (Lazy Loading)
const HomePage = lazy(() => import('../pages/public/HomePage'));
const LoginPage = lazy(() => import('../pages/public/LoginPage'));
const RegisterPage = lazy(() => import('../pages/public/RegisterPage'));
const AboutPage = lazy(() => import('../pages/public/AboutPage'));
const TeamPage = lazy(() => import('../pages/public/TeamPage'));
const FAQPage = lazy(() => import('../pages/public/FAQPage'));
const ContactPage = lazy(() => import('../pages/public/ContactPage'));

// Páginas Privadas (Lazy Loading)
const DashboardPage = lazy(() => import('../pages/private/DashboardPage'));
const TimerPage = lazy(() => import('../pages/private/TimerPage'));
const TasksPage = lazy(() => import('../pages/private/TasksPage'));
const WellnessPage = lazy(() => import('../pages/private/WellnessPage'));
const ProfilePage = lazy(() => import('../pages/private/ProfilePage'));
const RespiracaoPage = lazy(() => import('../pages/private/RespiracaoPage'));

// Páginas de Utilidade
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Componente de loading para Suspense
const LoadingFallback = () => <div className="flex justify-center items-center h-64">Carregando...</div>;

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* TODAS as rotas usam DashboardLayout com comportamento inteligente */}
        <Route element={<DashboardLayout />}>
          
          {/* 🔓 ROTAS PÚBLICAS - SEM ProtectedRoute */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/integrantes" element={<TeamPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contato" element={<ContactPage />} />

          {/* 🔐 ROTAS PRIVADAS - COM ProtectedRoute (apenas essas são protegidas) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/timer" element={<TimerPage />} />
            <Route path="/dashboard/tarefas" element={<TasksPage />} />
            <Route path="/dashboard/bem-estar" element={<WellnessPage />} />
            <Route path="/dashboard/perfil" element={<ProfilePage />} />
            <Route path="/dashboard/respiracao" element={<RespiracaoPage />} />
            <Route path="/dashboard/tarefas/:id" element={<div>Detalhes da Tarefa Dinâmica</div>} />
          </Route>

        </Route>

        {/* Rota de Erro 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Lock,
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Eye,
  Settings,
  LogOut,
  MessageCircle,
  ExternalLink,
  Shield,
  Trash2,
} from 'lucide-react';
import { Appointment, StudioSettings, AppointmentStatus } from '@/types';
import { siteConfig } from '@/config/siteConfig';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  // Dashboard Data
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [settings, setSettings] = useState<StudioSettings | null>(null);
  const [activeTab, setActiveTab] = useState<'agendamentos' | 'disponibilidade'>('agendamentos');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Settings form state
  const [newBlockedDate, setNewBlockedDate] = useState('');
  const [settingsSavedMsg, setSettingsSavedMsg] = useState(false);

  const fetchAdminData = useCallback(async () => {
    try {
      const [aptRes, setRes] = await Promise.all([
        fetch('/api/admin/appointments'),
        fetch('/api/admin/settings'),
      ]);

      if (aptRes.ok && setRes.ok) {
        const aptData = await aptRes.json();
        const setData = await setRes.json();
        setAppointments(aptData.appointments || []);
        setSettings(setData.settings || null);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  // Check existing session on mount
  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoadingAuth(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Senha inválida');
      }

      setIsAuthenticated(true);
      setPasswordInput('');
      fetchAdminData();
    } catch (err: unknown) {
      setAuthError(err instanceof Error ? err.message : 'Falha na autenticação');
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
  };

  const handleUpdateStatus = async (id: string, status: AppointmentStatus) => {
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status } : a))
        );
        if (selectedAppointment && selectedAppointment.id === id) {
          setSelectedAppointment((prev) => (prev ? { ...prev, status } : null));
        }
      }
    } catch (err) {
      alert('Erro ao atualizar status');
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    if (!confirm('Deseja realmente remover este agendamento do histórico?')) return;

    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setAppointments((prev) => prev.filter((a) => a.id !== id));
        setSelectedAppointment(null);
      }
    } catch {
      alert('Erro ao remover agendamento');
    }
  };

  // Block/unblock date
  const handleAddBlockedDate = async () => {
    if (!newBlockedDate || !settings) return;
    if (settings.blockedDates.includes(newBlockedDate)) return;

    const updatedBlocked = [...settings.blockedDates, newBlockedDate];
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blockedDates: updatedBlocked }),
    });

    if (res.ok) {
      setSettings({ ...settings, blockedDates: updatedBlocked });
      setNewBlockedDate('');
      setSettingsSavedMsg(true);
      setTimeout(() => setSettingsSavedMsg(false), 2500);
    }
  };

  const handleRemoveBlockedDate = async (dateStr: string) => {
    if (!settings) return;
    const updatedBlocked = settings.blockedDates.filter((d) => d !== dateStr);
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blockedDates: updatedBlocked }),
    });

    if (res.ok) {
      setSettings({ ...settings, blockedDates: updatedBlocked });
    }
  };

  // WhatsApp reply link generator
  const getWhatsAppReplyLink = (apt: Appointment, type: 'confirm' | 'contact') => {
    const rawNumber = apt.clientWhatsapp.replace(/\D/g, '');
    let text = '';

    if (type === 'confirm') {
      text = `Olá ${apt.clientName}! Aqui é o Edy Alves Tattoo. Vi sua solicitação para o dia ${new Date(apt.date + 'T12:00:00').toLocaleDateString('pt-BR')} às ${apt.timeSlot}. Seu horário está confirmado! Seguem os detalhes para o sinal de reserva e orientações da sessão:`;
    } else {
      text = `Olá ${apt.clientName}! Aqui é o Edy Alves Tattoo sobre sua solicitação no site (${apt.id}). Gostaria de tirar algumas dúvidas sobre a sua ideia de arte:`;
    }

    return `https://wa.me/55${rawNumber}?text=${encodeURIComponent(text)}`;
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = statusFilter === 'todos' || apt.status === statusFilter;
    const matchesSearch =
      apt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.clientWhatsapp.includes(searchQuery) ||
      apt.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // KPI Counters
  const totalCount = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === 'pendente').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmado').length;
  const completedCount = appointments.filter((a) => a.status === 'concluido').length;

  // ─────────────────────────────────────────────────────────────
  // RENDER: LOGIN FORM
  // ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4 pt-28 pb-16">
        <div className="max-w-md w-full bg-[#161616] border border-white/10 p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#E8153B] flex items-center justify-center text-white mx-auto mb-4 font-display font-black text-xl">
              EA
            </div>
            <h1 className="font-display text-2xl font-bold text-white uppercase tracking-wider">
              PAINEL DO TATUADOR
            </h1>
            <p className="text-xs text-[#888] mt-1">
              Acesso restrito para gerenciamento de agendamentos e agenda do Edy Alves.
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-3 bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                Senha de Acesso:
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Digite sua senha de administrador"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-black/60 border border-white/20 text-white text-xs p-3.5 focus:border-[#E8153B] focus:outline-none"
                />
                <Lock className="w-4 h-4 text-[#777] absolute right-3.5 top-3.5" />
              </div>
              <p className="text-[11px] text-[#666] mt-2">
                Senha padrão para testes: <code className="text-[#E8153B]">edyalves2018</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoadingAuth}
              className="btn-primary w-full text-xs py-3.5"
            >
              {isLoadingAuth ? 'VERIFICANDO...' : 'ENTRAR NO PAINEL'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/5 pt-4">
            <Link href="/" className="text-xs text-[#777] hover:text-white">
              ← Voltar para o site público
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER: AUTHENTICATED DASHBOARD
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#CCCCCC] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#E8153B] uppercase block">
              SISTEMA ADMINISTRATIVO
            </span>
            <h1 className="font-display text-3xl font-extrabold text-white uppercase">
              GESTÃO DE AGENDAMENTOS & AGENDA
            </h1>
            <p className="text-xs text-[#888] mt-0.5">
              Edy Alves Tattoo · Ceilândia, Brasília-DF
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="btn-secondary text-xs px-4 py-2 flex items-center gap-1.5"
            >
              <span>Ver Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="btn-secondary text-xs px-4 py-2 text-red-400 hover:text-white flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
          <div className="bg-[#161616] border border-white/10 p-5">
            <span className="text-[10px] uppercase tracking-wider text-[#888] block">
              Total de Solicitações
            </span>
            <span className="font-display text-3xl font-bold text-white block mt-1">
              {totalCount}
            </span>
          </div>

          <div className="bg-[#161616] border border-yellow-500/20 p-5">
            <span className="text-[10px] uppercase tracking-wider text-yellow-400 block">
              Pendentes de Confirmação
            </span>
            <span className="font-display text-3xl font-bold text-yellow-400 block mt-1">
              {pendingCount}
            </span>
          </div>

          <div className="bg-[#161616] border border-green-500/20 p-5">
            <span className="text-[10px] uppercase tracking-wider text-green-400 block">
              Confirmadas
            </span>
            <span className="font-display text-3xl font-bold text-green-400 block mt-1">
              {confirmedCount}
            </span>
          </div>

          <div className="bg-[#161616] border border-blue-500/20 p-5">
            <span className="text-[10px] uppercase tracking-wider text-blue-400 block">
              Sessões Concluídas
            </span>
            <span className="font-display text-3xl font-bold text-blue-400 block mt-1">
              {completedCount}
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/10 mb-8">
          <button
            onClick={() => setActiveTab('agendamentos')}
            className={`font-display text-sm uppercase tracking-wider font-bold py-3 px-6 border-b-2 transition-colors ${
              activeTab === 'agendamentos'
                ? 'border-[#E8153B] text-white'
                : 'border-transparent text-[#777] hover:text-white'
            }`}
          >
            Solicitações de Agendamento ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('disponibilidade')}
            className={`font-display text-sm uppercase tracking-wider font-bold py-3 px-6 border-b-2 transition-colors ${
              activeTab === 'disponibilidade'
                ? 'border-[#E8153B] text-white'
                : 'border-transparent text-[#777] hover:text-white'
            }`}
          >
            Bloqueio de Datas & Horários
          </button>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            TAB 1: LISTAGEM DE AGENDAMENTOS
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'agendamentos' && (
          <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="bg-[#161616] border border-white/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Buscar por cliente, WhatsApp ou ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 text-white text-xs pl-9 pr-3 py-2.5 focus:border-[#E8153B] focus:outline-none"
                />
                <Search className="w-4 h-4 text-[#777] absolute left-3 top-3" />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <Filter className="w-4 h-4 text-[#777] shrink-0" />
                {['todos', 'pendente', 'confirmado', 'concluido', 'cancelado'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`text-[11px] font-display uppercase tracking-wider px-3 py-1.5 border transition-all ${
                      statusFilter === status
                        ? 'border-[#E8153B] bg-[#E8153B] text-white'
                        : 'border-white/10 bg-black/30 text-[#888] hover:text-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-[#161616] border border-white/10 overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-black/60 text-[#888] uppercase tracking-wider font-display border-b border-white/10">
                  <tr>
                    <th className="p-4">Data & Horário</th>
                    <th className="p-4">Cliente</th>
                    <th className="p-4">WhatsApp</th>
                    <th className="p-4">Estilo & Local</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-[#666]">
                        Nenhum agendamento encontrado para este filtro.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((apt) => (
                      <tr
                        key={apt.id}
                        className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                        onClick={() => setSelectedAppointment(apt)}
                      >
                        <td className="p-4 whitespace-nowrap">
                          <span className="font-display font-bold text-white block">
                            {new Date(apt.date + 'T12:00:00').toLocaleDateString('pt-BR')}
                          </span>
                          <span className="text-[#888] text-[11px]">{apt.timeSlot}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-white block">{apt.clientName}</span>
                          <span className="text-[10px] text-[#666]">{apt.id}</span>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <a
                            href={getWhatsAppReplyLink(apt, 'contact')}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[#25D366] hover:underline flex items-center gap-1 font-mono"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{apt.clientWhatsapp}</span>
                          </a>
                        </td>
                        <td className="p-4">
                          <span className="uppercase text-white font-medium block">
                            {apt.style}
                          </span>
                          <span className="text-[#777] text-[11px]">
                            {apt.bodyPart} ({apt.size})
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-block px-2.5 py-1 text-[10px] font-display uppercase tracking-wider font-bold ${
                              apt.status === 'confirmado'
                                ? 'bg-green-950/80 text-green-400 border border-green-500/40'
                                : apt.status === 'pendente'
                                ? 'bg-yellow-950/80 text-yellow-400 border border-yellow-500/40'
                                : apt.status === 'concluido'
                                ? 'bg-blue-950/80 text-blue-400 border border-blue-500/40'
                                : 'bg-red-950/80 text-red-400 border border-red-500/40'
                            }`}
                          >
                            {apt.status}
                          </span>
                        </td>
                        <td className="p-4 text-right whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedAppointment(apt);
                            }}
                            className="p-1.5 text-white/70 hover:text-white mr-1"
                            title="Ver detalhes"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 2: CONFIGURAÇÃO DE DISPONIBILIDADE
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'disponibilidade' && settings && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Blocked Dates Management */}
            <div className="bg-[#161616] border border-white/10 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-1">
                  Bloquear Datas Específicas
                </h3>
                <p className="text-xs text-[#888]">
                  Dias em que você não irá atender (feriados, eventos, convenções de tattoo ou folga).
                </p>
              </div>

              {settingsSavedMsg && (
                <div className="p-3 bg-green-950/60 border border-green-500/40 text-green-300 text-xs">
                  Configurações salvas com sucesso!
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="date"
                  value={newBlockedDate}
                  onChange={(e) => setNewBlockedDate(e.target.value)}
                  className="bg-black/60 border border-white/15 text-white text-xs p-3 focus:border-[#E8153B] focus:outline-none flex-1"
                />
                <button
                  onClick={handleAddBlockedDate}
                  className="btn-primary text-xs px-5 py-3"
                >
                  Bloquear Dia
                </button>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/5">
                <span className="text-xs text-[#888] font-bold uppercase block">
                  Datas Atualmente Bloqueadas:
                </span>
                {settings.blockedDates.length === 0 ? (
                  <p className="text-xs text-[#666]">Nenhuma data bloqueada no momento.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {settings.blockedDates.map((d) => (
                      <div
                        key={d}
                        className="bg-black/60 border border-white/10 px-3 py-1.5 text-xs flex items-center gap-2 text-white"
                      >
                        <span>{new Date(d + 'T12:00:00').toLocaleDateString('pt-BR')}</span>
                        <button
                          onClick={() => handleRemoveBlockedDate(d)}
                          className="text-red-400 hover:text-white"
                          title="Desbloquear"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Operating Hours & PIX Settings */}
            <div className="bg-[#161616] border border-white/10 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-1">
                  Configurações do Estúdio & Sinal
                </h3>
                <p className="text-xs text-[#888]">
                  Chave PIX e valor padrão exibido aos clientes.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-white uppercase mb-1">Chave PIX:</label>
                  <input
                    type="text"
                    readOnly
                    value={settings.pixKey}
                    className="w-full bg-black/60 border border-white/10 text-white p-3 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-white uppercase mb-1">Beneficiário:</label>
                  <input
                    type="text"
                    readOnly
                    value={settings.pixBeneficiary}
                    className="w-full bg-black/60 border border-white/10 text-white p-3"
                  />
                </div>

                <div>
                  <label className="block font-bold text-white uppercase mb-1">Valor do Sinal:</label>
                  <input
                    type="text"
                    readOnly
                    value={settings.depositAmount}
                    className="w-full bg-black/60 border border-white/10 text-white p-3"
                  />
                </div>

                <div className="pt-2 text-[11px] text-[#777]">
                  * Para alterar chave PIX ou horários permanentemente, edite o arquivo <code>src/config/siteConfig.ts</code> ou o arquivo de dados.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODAL: DETALHES COMPLETOS DO AGENDAMENTO
      ───────────────────────────────────────────────────────────── */}
      {selectedAppointment && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedAppointment(null)}
        >
          <div
            className="bg-[#161616] border border-white/15 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#E8153B] uppercase tracking-widest block">
                  CÓDIGO: {selectedAppointment.id}
                </span>
                <h3 className="font-display text-2xl font-bold text-white uppercase">
                  {selectedAppointment.clientName}
                </h3>
                <span className="text-xs text-[#888]">
                  Criado em: {new Date(selectedAppointment.createdAt).toLocaleString('pt-BR')}
                </span>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-[#888] hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2 p-3 bg-black/40 border border-white/5">
              <span className="text-xs text-[#888] mr-2">Alterar Status:</span>
              <button
                onClick={() => handleUpdateStatus(selectedAppointment.id, 'confirmado')}
                className="text-xs px-3 py-1.5 bg-green-950 text-green-300 border border-green-500/40 hover:bg-green-900"
              >
                ✓ Confirmar
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedAppointment.id, 'concluido')}
                className="text-xs px-3 py-1.5 bg-blue-950 text-blue-300 border border-blue-500/40 hover:bg-blue-900"
              >
                ★ Concluído
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedAppointment.id, 'cancelado')}
                className="text-xs px-3 py-1.5 bg-red-950 text-red-300 border border-red-500/40 hover:bg-red-900"
              >
                ✕ Cancelar
              </button>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2 bg-black/30 p-4 border border-white/5">
                <span className="font-bold text-white uppercase block border-b border-white/5 pb-1">
                  Dados do Atendimento
                </span>
                <div>
                  <span className="text-[#777]">Data agendada:</span>{' '}
                  <span className="text-white font-bold">
                    {new Date(selectedAppointment.date + 'T12:00:00').toLocaleDateString('pt-BR')} às {selectedAppointment.timeSlot}
                  </span>
                </div>
                <div>
                  <span className="text-[#777]">Serviço:</span>{' '}
                  <span className="text-white">{selectedAppointment.serviceType}</span>
                </div>
                <div>
                  <span className="text-[#777]">Estilo:</span>{' '}
                  <span className="text-white uppercase font-bold">{selectedAppointment.style}</span>
                </div>
                <div>
                  <span className="text-[#777]">Região do corpo:</span>{' '}
                  <span className="text-white">{selectedAppointment.bodyPart}</span>
                </div>
                <div>
                  <span className="text-[#777]">Tamanho:</span>{' '}
                  <span className="text-white">{selectedAppointment.size} {selectedAppointment.sizeCustomCm ? `(${selectedAppointment.sizeCustomCm})` : ''}</span>
                </div>
              </div>

              <div className="space-y-2 bg-black/30 p-4 border border-white/5">
                <span className="font-bold text-white uppercase block border-b border-white/5 pb-1">
                  Contato do Cliente
                </span>
                <div>
                  <span className="text-[#777]">WhatsApp:</span>{' '}
                  <span className="text-[#25D366] font-mono font-bold">{selectedAppointment.clientWhatsapp}</span>
                </div>
                <div>
                  <span className="text-[#777]">E-mail:</span>{' '}
                  <span className="text-white">{selectedAppointment.clientEmail || 'Não informado'}</span>
                </div>
                <div>
                  <span className="text-[#777]">Nascimento:</span>{' '}
                  <span className="text-white">{new Date(selectedAppointment.birthDate + 'T12:00:00').toLocaleDateString('pt-BR')}</span>
                </div>
                <div>
                  <span className="text-[#777]">LGPD & Termos:</span>{' '}
                  <span className="text-green-400 font-bold">Aceitos ✓</span>
                </div>
              </div>
            </div>

            {/* Idea Description */}
            <div className="bg-black/30 p-4 border border-white/5 text-xs">
              <span className="font-bold text-white uppercase block mb-1">Descrição da Ideia:</span>
              <p className="text-[#CCCCCC] leading-relaxed whitespace-pre-wrap">
                {selectedAppointment.description}
              </p>
            </div>

            {/* Reference Images */}
            {selectedAppointment.referenceImages && selectedAppointment.referenceImages.length > 0 && (
              <div>
                <span className="font-bold text-white uppercase text-xs block mb-2">
                  Imagens de Referência ({selectedAppointment.referenceImages.length}):
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {selectedAppointment.referenceImages.map((img, i) => (
                    <a
                      key={i}
                      href={img}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative aspect-square border border-white/10 hover:border-[#E8153B] overflow-hidden block"
                    >
                      <Image
                        src={img}
                        alt={`Referência ${i + 1}`}
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* WhatsApp Direct Reply CTAs */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={getWhatsAppReplyLink(selectedAppointment, 'confirm')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-display text-xs font-bold uppercase tracking-wider py-3 px-4 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Confirmar Horário no WhatsApp</span>
              </a>

              <a
                href={getWhatsAppReplyLink(selectedAppointment, 'contact')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 btn-secondary text-xs py-3 px-4 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>Conversar no WhatsApp</span>
              </a>

              <button
                onClick={() => handleDeleteAppointment(selectedAppointment.id)}
                className="p-3 text-red-500 hover:text-red-400 border border-red-500/20 hover:border-red-500"
                title="Excluir Agendamento"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

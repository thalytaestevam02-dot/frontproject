'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useThemeStorage } from "../lib/useThemeStorage";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, Bot, LogOut, Sun, Moon,
  Search, Bell, Settings, CheckCircle2, XCircle, Clock, CalendarDays, AlertTriangle, UserCheck
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  textColor?: string;
}

interface SolicitacaoHorario {
  id: number;
  professor: string;
  disciplina: string;
  dataOriginal: string;
  horarioOriginal: string;
  novoHorario: string;
  motivo: string;
  status: 'pendente' | 'validado' | 'recusado';
  tempoAviso: string;
}

// ================= COMPONENTE PRINCIPAL =================
export default function FeedAtividadesPage() {
  const { isDarkMode, toggleTheme } = useThemeStorage();
  const [horaAtual, setHoraAtual] = useState("");
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Estado com as solicitações dos professores
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoHorario[]>([
    {
      id: 1,
      professor: "Prof. Lucio Luzetti",
      disciplina: "Inteligência Artificial Aplicada",
      dataOriginal: "20/08/2026",
      horarioOriginal: "19:30 - 21:10 (Sala 22-B)",
      novoHorario: "20:00 - 21:30 (Remota via Teams)",
      motivo: "Conforto de horário devido a compromisso médico externo.",
      status: "pendente",
      tempoAviso: "Há 15 min"
    },
    {
      id: 2,
      professor: "Prof. Marcos Cárfora",
      disciplina: "Banco de Dados Avançado",
      dataOriginal: "26/08/2026",
      horarioOriginal: "08:00 - 11:40 (Lab 03)",
      novoHorario: "28/08/2026 - 08:00 - 11:40 (Lab 03)",
      motivo: "Participação em congresso acadêmico na data original.",
      status: "pendente",
      tempoAviso: "Há 1 hora"
    },
    {
      id: 3,
      professor: "Profa. Carla Mendes",
      disciplina: "Engenharia de Software II",
      dataOriginal: "22/08/2026",
      horarioOriginal: "19:30 - 21:10 (Sala 14-A)",
      novoHorario: "23/08/2026 - 09:00 - 10:40 (Sala 14-A)",
      motivo: "Ajuste por indisponibilidade de equipamento na sexta à noite.",
      status: "validado",
      tempoAviso: "Ontem"
    }
  ]);

  // Feedback visual temporário de notificação enviada
  const [notificacaoToast, setNotificacaoToast] = useState<string | null>(null);

  // Efeito do Relógio Digital
  useEffect(() => {
    const atualizarHora = () => {
      setHoraAtual(new Date().toLocaleTimeString("pt-BR"));
    };
    atualizarHora();
    const intervalo = setInterval(atualizarHora, 1000);
    return () => clearInterval(intervalo);
  }, []);

  // Função para validar ou recusar a alteração do professor
  const lidarComAcao = (id: number, novoStatus: 'validado' | 'recusado') => {
    setSolicitacoes((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          // Dispara notificação simulada automática
          dispararNotificacao(item.professor, novoStatus, item.disciplina);
          return { ...item, status: novoStatus };
        }
        return item;
      })
    );
  };

  const dispararNotificacao = (professor: string, status: 'validado' | 'recusado', disciplina: string) => {
    const acaoTexto = status === 'validado' ? 'APROVADA e sincronizada no calendário' : 'RECUSADA pelo gestor';
    setNotificacaoToast(`Notificação enviada para ${professor}: Solicitação de ${disciplina} foi ${acaoTexto}.`);
    
    // Oculta o toast após 4 segundos
    setTimeout(() => {
      setNotificacaoToast(null);
    }, 4500);
  };

  return (
    <div className={`${isDarkMode ? 'dark bg-[#0f1115] text-gray-300' : 'bg-gray-300 text-gray-700'} h-screen overflow-hidden font-sans p-6 transition-colors duration-300`}>
      <div className="mx-auto flex h-full max-w-[1400px] gap-6 min-h-0">

        {/* BARRA LATERAL (SIDEBAR) */}
        <aside className="w-64 flex flex-col bg-white dark:bg-[#161b22] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shrink-0 h-full">
          <div className="flex justify-center mb-4">
            <Image
              src="/eniac-logo.png"
              alt="Logo ENIAC"
              width={160}
              height={50}
              className={isDarkMode ? "brightness-0 invert" : ""}
            />
          </div>

          <div className="mb-7 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-[#0047b3] dark:text-[#0c6cfb]">PORTAL DO GESTOR</h1>
            <p className="mt-1 text-[11px] text-gray-500 dark:text-white font-bold uppercase tracking-widest">Ambiente Docente</p>
          </div>

          <nav className="flex-1 space-y-1">
            <NavItem
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              onClick={() => router.push("/gestoria")}
            />
            <NavItem
              icon={<Bot size={18} />}
              label="Gestoria IA"
              onClick={() => router.push("/gestoria_ia")}
            />
            <NavItem
              icon={<CalendarDays size={18} />}
              label="Feed de Atividades"
              active
            />
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800 space-y-4 text-[11px]">
            <div className="flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-gray-500">
              <span>⚠️</span> Avisos Gerais
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">Notas</p>
                <p className="text-gray-400 dark:text-gray-500 leading-tight">Lançamento até o 5º dia útil.</p>
              </div>
              <div>
                <p className="text-base font-semibold text-gray-700 dark:text-gray-300">Substituição</p>
                <p className="text-sm text-gray-400 leading-tight dark:text-gray-500">Aviso com 48h de antecedência.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-1">
              <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors">
                <Settings size={16} /> <span className="text-sm font-medium">Configurações</span>
              </div>
              <div
                onClick={() => router.push("/cadastro")}
                className="flex items-center gap-3 px-3 py-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 rounded-lg cursor-pointer transition-colors"
              >
                <LogOut size={16} /> <span className="text-sm font-medium">Sair</span>
              </div>
            </div>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL (MAIN) */}
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden">

          {/* HEADER FIXO NO TOPO */}
          <header className="flex justify-between items-center mb-6 py-3 px-4 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-800 gap-4 transition-colors duration-300 shrink-0">
            <h2 className="text-xl font-semibold tracking-wide text-gray-800 dark:text-white shrink-0">
              Gestão de Solicitações Docentes
            </h2>

            <div className="flex items-center gap-4 flex-nowrap justify-end py-1">
              <div className="relative w-64 shrink-0">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar solicitações..."
                  className="w-full pl-9 pr-4 py-2 bg-[#e9ecef] dark:bg-[#1c2128] border border-transparent dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:bg-white dark:focus:bg-[#161b22] focus:border-gray-300 dark:focus:border-gray-700 text-gray-700 dark:text-gray-300 transition-all placeholder-gray-400"
                />
              </div>

              <button
                onClick={toggleTheme}
                className="p-2 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
                title="Alternar Tema"
              >
                {isDarkMode ? <Sun size={17} className="text-yellow-500" /> : <Moon size={17} />}
              </button>

              <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-white transition-colors relative shrink-0">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </header>

          {/* FEEDBACK TOAST DE NOTIFICAÇÃO AUTOMÁTICA */}
          {notificacaoToast && (
            <div className="mb-4 flex items-center gap-3 rounded-xl border border-green-500/40 bg-green-500/10 p-4 text-xs font-semibold text-green-700 dark:text-green-300 transition-all animate-bounce">
              <UserCheck size={18} className="text-green-600 dark:text-green-400 shrink-0" />
              <span>{notificacaoToast}</span>
            </div>
          )}

          {/* ÁREA DE CONTEÚDO */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pr-2 pb-6 space-y-6 scrollbar-thin dark:scrollbar-thumb-gray-800 scrollbar-thumb-gray-200">

            <div className="flex justify-between items-center mb-2">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Feed de Atividades & Validação</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Analise os pedidos de alteração de horário enviados pelos professores. A validação atualiza o sistema e notifica o docente na hora.
                </p>
              </div>
              <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white px-4 py-2 rounded-xl font-medium shadow-sm flex items-center gap-2">
                ⏰ {horaAtual || "--:--:--"}
              </div>
            </div>

            {/* LISTAGEM DE SOLICITAÇÕES */}
            <div className="space-y-4">
              {solicitacoes.map((item) => (
                <div 
                  key={item.id}
                  className={`rounded-2xl border p-5 shadow-sm transition-all duration-300 bg-white dark:bg-[#161b22] ${
                    item.status === 'pendente' 
                      ? 'border-orange-300 dark:border-orange-900/50 border-l-4 border-l-orange-500' 
                      : item.status === 'validado'
                      ? 'border-green-200 dark:border-green-900/40 border-l-4 border-l-green-500'
                      : 'border-red-200 dark:border-red-900/40 border-l-4 border-l-red-500'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800 dark:text-white text-base">{item.professor}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">• {item.disciplina}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={13} /> {item.tempoAviso}</span>
                      {item.status === 'pendente' && (
                        <span className="bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                          Pendente de Validação
                        </span>
                      )}
                      {item.status === 'validado' && (
                        <span className="bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle2 size={12} /> Validado & Notificado
                        </span>
                      )}
                      {item.status === 'recusado' && (
                        <span className="bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                          <XCircle size={12} /> Recusado & Notificado
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-800/40 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                    <strong className="text-gray-700 dark:text-gray-300">Motivo:</strong> {item.motivo}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-xs">
                    <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Data/Horário Original</span>
                      <p className="font-semibold text-gray-700 dark:text-gray-300">{item.dataOriginal} - {item.horarioOriginal}</p>
                    </div>
                    <div className="rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/40 dark:bg-blue-950/20 p-3">
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">Nova Proposta Solicitada</span>
                      <p className="font-semibold text-blue-700 dark:text-blue-300">{item.novoHorario}</p>
                    </div>
                  </div>

                  {/* BOTÕES DE AÇÃO DO GESTOR */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    {item.status === 'pendente' ? (
                      <>
                        <button
                          onClick={() => lidarComAcao(item.id, 'recusado')}
                          className="flex items-center gap-1.5 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        >
                          <XCircle size={15} /> Recusar e Notificar
                        </button>
                        <button
                          onClick={() => lidarComAcao(item.id, 'validado')}
                          className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
                        >
                          <CheckCircle2 size={15} /> Validar e Notificar Automaticamente
                        </button>
                      </>
                    ) : (
                      <p className="text-[11px] text-gray-400 italic">
                        Ação finalizada. Notificação enviada por e-mail e push ao docente.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

// ================= SUBCOMPONENTES =================
function NavItem({ icon, label, active = false, onClick, textColor }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 transition-all text-left ${active
        ? 'bg-blue-600 font-semibold text-white shadow-sm'
        : `text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 ${textColor || ''}`
        }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
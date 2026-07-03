'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowDown,
  Bell,
  Bot,
  LayoutDashboard,
  LogOut,
  Moon,
  Search,
  Settings,
  Sun,
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  textColor?: string;
}

// ================= COMPONENTE PRINCIPAL =================
export default function GestoriaPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark bg-[#0f1115] text-gray-300' : 'bg-gray-300 text-gray-700'} h-screen overflow-hidden font-sans p-6 transition-colors duration-300`}>
      <div className="mx-auto flex h-full max-w-[1400px] gap-6 min-h-0">
        
        {/* BARRA LATERAL (SIDEBAR) */}
        <aside className="w-64 flex flex-col bg-white dark:bg-[#161b22] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shrink-0 h-full">
          <div className="flex justify-center mb-4">
            <Image
              src={isDarkMode ? "/eniac-logo-branca.png" : "/eniac-logo.png"}
              alt="Logo ENIAC"
              width={160}
              height={50}
              className="object-contain"
            />
          </div>

          <div className="mb-7 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-[#0047b3] dark:text-[#0c6cfb]">PORTAL DO GESTOR</h1>
            <p className="mt-1 text-[11px] text-gray-500 dark:text-white font-bold uppercase tracking-widest">Ambiente Docente</p>
          </div>
          
          <nav className="flex-1 space-y-1">
            <NavItem icon={<LayoutDashboard size={18}/>} label="Dashboard" active />
            <NavItem 
              icon={<Bot size={18}/>} 
              label="Gestoria IA" 
              onClick={() => router.push("/gestoria_ia")} 
            />
            <NavItem 
              icon={<ArrowDown size={18}/>} 
              label="Fim da página" 
              onClick={scrollToBottom} 
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
              Navegação Gestoria
            </h2>
            
            <div className="flex items-center gap-4 flex-nowrap justify-end py-1">
              {/* Barra de Pesquisa */}
              <div className="relative w-64 shrink-0">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Pesquisar registros..." 
                  className="w-full pl-9 pr-4 py-2 bg-[#e9ecef] dark:bg-[#1c2128] border border-transparent dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:bg-white dark:focus:bg-[#161b22] focus:border-gray-300 dark:focus:border-gray-700 text-gray-700 dark:text-gray-300 transition-all placeholder-gray-400"
                />
              </div>
        
              {/* Alternador de Tema */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
                title="Alternar Tema"
              >
                {isDarkMode ? <Sun size={17} className="text-yellow-500" /> : <Moon size={17} />}
              </button>
        
              {/* Notificações */}
              <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-white transition-colors relative shrink-0">
                <Bell size={18}/>
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </header>

          {/* ÁREA DE CONTEÚDO TOTAL (Rolagem vertical única) */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pr-2 pb-6 space-y-6 scrollbar-thin dark:scrollbar-thumb-gray-800 scrollbar-thumb-gray-200">
            
            {/* Título de Boas-vindas e Data */}
            <div className="flex justify-between items-center mb-2">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard Gestoria</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Visão geral acadêmica
                </p>
              </div>
              <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white px-4 py-2 rounded-xl font-medium shadow-sm flex items-center gap-2">
                📅 {new Date().toLocaleDateString("pt-BR")}
              </div>
            </div>

            {/* CARDS ESTATÍSTICOS */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm flex flex-col">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total de Alunos</p>
                <h2 className="text-4xl font-extrabold text-blue-600 mt-2">12.480</h2>
              </div>

              <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm flex flex-col">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Professores</p>
                <h2 className="text-4xl font-extrabold text-green-600 mt-2">328</h2>
              </div>

              <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm flex flex-col">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Matérias</p>
                <h2 className="text-4xl font-extrabold text-purple-600 mt-2">452</h2>
              </div>
            </section>

            {/* QUADRO DE HORÁRIOS */}
            <section className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm transition-colors duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Quadro de Horários do Dia
                </h2>
                <span className="bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                  Operando Normal
                </span>
              </div>

              <div className="flex flex-col gap-5">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="text-sm text-gray-400">10:00</p>
                  <h3 className="font-bold text-gray-800 dark:text-white">Reunião Gestoria</h3>
                  <p className="text-gray-500 dark:text-gray-400">Ecossistema</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <p className="text-sm text-gray-400">12:15</p>
                  <h3 className="font-bold text-gray-800 dark:text-white">Palestra de Inovação</h3>
                  <p className="text-gray-500 dark:text-gray-400">Auditório</p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <p className="text-sm text-gray-400">18:00</p>
                  <h3 className="font-bold text-gray-800 dark:text-white">Palestra de Marketing</h3>
                  <p className="text-gray-500 dark:text-gray-400">Auditório</p>
                </div>
              </div>
            </section>

            {/* CALENDÁRIO EVENTOS */}
            <section className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm transition-colors duration-300">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    Calendário Eventos
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monitoramento administrative</p>
                </div>
                <button className="px-4 py-2 rounded-xl text-sm border font-medium border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 transition">
                  Histórico Completo
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full table-fixed min-w-[600px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-400 dark:text-gray-500">
                      <th className="pb-4 px-2">Evento</th>
                      <th className="pb-4 px-2">Local</th>
                      <th className="pb-4 px-2">Data</th>
                      <th className="pb-4 px-2">Horário</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-700 dark:text-gray-300">
                    <tr className="border-b border-gray-100 dark:border-gray-750 hover:bg-gray-50 dark:hover:bg-[#1c2128]/30 transition-colors">
                      <td className="py-4 px-2 font-semibold">Corpus Christi</td>
                      <td className="py-4 px-2">Feriado</td>
                      <td className="py-4 px-2">04/06</td>
                      <td className="py-4 px-2"><span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-semibold">00:00 - 23:59</span></td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-750 hover:bg-gray-50 dark:hover:bg-[#1c2128]/30 transition-colors">
                      <td className="py-4 px-2 font-semibold">Feirão do emprego Eniac</td>
                      <td className="py-4 px-2">Eniac</td>
                      <td className="py-4 px-2">11/06 até 12/06</td>
                      <td className="py-4 px-2"><span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-semibold">07:00 - 22:00</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-[#1c2128]/30 transition-colors">
                      <td className="py-4 px-2 font-semibold">Festa Junina do Eniac</td>
                      <td className="py-4 px-2">Eniac</td>
                      <td className="py-4 px-2">24/06</td>
                      <td className="py-4 px-2"><span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-semibold">12:00 - 20:00</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

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
      className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 transition-all text-left ${
        active 
          ? 'bg-blue-600 font-semibold text-white shadow-sm' 
          : `text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 ${textColor || ''}`
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}